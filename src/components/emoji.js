import classNames from "classnames";
import React from "react";

const Emoji = ({ label = "", emoji, className }) => (
	<span
		className={ classNames("emoji", className) }
		role="img"
		aria-label={ label }
		aria-hidden={ label ? 'false' : 'true'}>
		{ emoji }
	</span>
);
export default Emoji;
