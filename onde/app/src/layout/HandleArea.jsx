import React from 'react';
import Format from '../../../../lib/utils/Format';
import MouseMenu from '../../../../lib/MouseMenu';
import Wrapper from '../../../../lib/utils/Wrapper';
import TitleLike from '../../../../lib/struct/TitleLike';

let HandleArea = React.createClass({
	render(){
		let styles = {
			position: 'absolute',
			right: 0,
			top: 0,
			height: '100%',
			width: 'calc( 100% - 320px )'
		};
		let after = {clear: 'both'};
		Object.assign(styles, Format.NoUserSelect);
		return (
			<div className="handleArea" style={styles}>
				<MouseMenu title="Title" titlePosition="center">
					<div>this is a panel</div>
				</MouseMenu>
				<TitleLike leftElement=""></TitleLike>
			</div>
		);
	}
});

export default HandleArea;