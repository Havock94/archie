import React from "react";
import PropTypes from "prop-types";
import { Button as MuiButton, IconButton as MuiIconButton } from "@mui/material";
import classNames from "classnames";


const Button = ({ variant = 'contained', icon, iconLeft, iconRight, disabled, onClick, size = 'medium', children, className,...props }) => {
	const ButtonComponent = icon ? MuiIconButton : MuiButton;
	const buttonVariantClasses = classNames(variant === 'text' ? 'text-pink-500 hover:text-pink-400 active:text-pink-700' : 'bg-pink-500 hover:bg-pink-400 active:bg-pink-700 text-white');

	const buttonProperties = {
		variant,
		disabled,
		onClick,
		size,
		startIcon: iconLeft,
		endIcon: iconRight
	}

	return (
		<ButtonComponent { ...buttonProperties } {...props} color="secondary"
			className={classNames(className, buttonVariantClasses, "rounded-full px-4 py-2 font-semibold") }
		>
			{ icon || children }
		</ButtonComponent>
	);
};
Button.propTypes = {
	variant: PropTypes.oneOf(['text', 'contained', 'outline']),
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	href: PropTypes.string,
}
export default Button;
