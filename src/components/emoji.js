import React from "react";

const Emoji = ({ label = "", emoji }) => (
	<span
		className="emoji"
		role="img"
		aria-label={ label }
		aria-hidden={ label ? 'false' : 'true'}>
		{ emoji }
	</span>
);
export default Emoji;
