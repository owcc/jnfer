import React from 'react';
import Format from '../../../../lib/utils/Format';

let PanelLeft = React.createClass({
	render(){
		let styles = {
			padding: Format.Px12,
			position: 'absolute',
			left: 0,
			top: 0,
			width: 320
		};
		Object.assign(styles, Format.NoUserSelect);
		return (
			<div className="panelLeft" style={styles}></div>
		);
	}
});

export default PanelLeft;
