import classNames from 'classnames';
import React from 'react';

const AnacletoLogo = ({ color = '#3B82F6', className}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 220.18 140.95"
			className={classNames(className, 'max-w-full pointer-events-none')}
			style={{ transitionProperty: 'width' }}>
			<g style={{ fill: 'transparent', stroke: color, strokeMiterlimit: 10, strokeWidth: 20 }}>
				<circle cx="43.19" cy="64.06" r="33.19" />
				<circle cx="141.79" cy="64.06" r="33.19" />
				<path d="M92.49,107.6A66.65,66.65,0,0,0,108.6,64.06" />
				<path d="M141.79,30.86c16.63,0,33.21-7.66,44.91-17.7A66.9,66.9,0,1,1,76.39,64.06" />
			</g>
		</svg>
	);
};
export default AnacletoLogo;
