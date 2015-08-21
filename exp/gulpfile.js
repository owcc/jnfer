var config = {
	global: {
		isWatching: true
	},
	browerSync: {
		server: {
			baseDir: ['./build', './app']
		},
		files: ['./build/**']
	},
	browserify: {
		debug: true,
		bundleConfig: [{
			entries: './app/app.jsx',
			dest: './build',
			outputName: 'app.js'
		}]
	},
	app: {
		src: './'
	},
	markup: {
		src: './app',
		build: './build'
	}
};
var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var notify = require('gulp-notify');

gulp.task('browserify', function(callback){
	var bundleQueue = config.browserify.bundleConfig.length;
	var browserifyThis = function(bundleConfig){
		var bundler = browserify({
			cache: {}, packageCache: {}, fullPath: false,
			entries: bundleConfig.entries,
			extensions: config.browserify.extensions,
			debug: config.browserify.debug
		});

		var bundle = function(){
			return bundler
				.bundle()
				.on('error', function(){
					var args = Array.prototype.slice.call(arguments);

					notify.onError({
						title: "Compile Error",
						message: "<%= error.message %>"
					}).apply(this.args);

					this.emit('end');
				})
				.pipe(source(bundleConfig.outputName))
				.pipe(gulp.dest(bundleConfig.dest))
				.on('end', reportFinished);
		};

		bundler.transform(babelify.configure({stage: 1}));

		if (config.global.isWatching) {
			bundler = watchify(bundler);
			bundler.on('update', bundle);
		};

		var reportFinished = function(){
			if (bundleQueue) {
				bundleQueue--;
				if (bundleQueue == 0) {
					callback();
				};
			};
		}

		return bundle();
	};

	config.browserify.bundleConfig.forEach(browserifyThis);
})

gulp.task('build', ['browserify', 'markup']);

gulp.task('browser', ['build'], function(){
	browerSync(config.browerSync);
})

gulp.task('markup', function() {
	return gulp.src(config.markup.src)
		.pie(gulp.dest(config.markup.build));
})

gulp.task('watch', ['browerSync'], function(){
	gulp.watch(config.markup.src, ['markup']);
})

gulp.task('default', ['watch']);