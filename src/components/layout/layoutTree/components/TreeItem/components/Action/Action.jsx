import React, { forwardRef } from "react";

export const Action = forwardRef(
	({ active, className, cursor, style, ...props }, ref) => {
		return (
			<div
				ref={ref}
				{...props}
				tabIndex={0}
				style={{
					...style,
					cursor,
					"--fill": active?.fill,
					"--background": active?.background,
				}}
			/>
		);
	}
);
