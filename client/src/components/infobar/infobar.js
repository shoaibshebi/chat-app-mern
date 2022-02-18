import React from 'react';
import './infobar.css';

const InfoBar=({room})=>(
	<div className="infoBar">
		<div className="leftInnerContainer">
			<h3 className="clr">{room}</h3><p></p>
		</div>
	</div>
)

export default InfoBar;