import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 *
 *
 * @param {*} { base = "#00C2F3", accent = "#F1127E", theme = "dark", variant = "full" }
 * @returns
 */
const Logo = ({
	base = "#00C2F3",
	accent = "#F1127E",
	theme = "dark",
	variant = "full",
	size = "medium",
}) => {
	const [_theme, setTheme] = useState(theme);
	const [_size, setSize] = useState({ width: "w-56", height: "h-12" });

	useEffect(() => {
		if (theme && theme !== _theme) {
			setTheme(theme);
		}
	}, [theme, _theme]);

	useEffect(() => {
		switch (size) {
			case "small":
					if (variant === "initial") {
						setSize({ width: "w-6", height: "h-6" });
					} else {
						setSize({ width: "w-26", height: "h-6" });
					}
				break;
			case "medium":
					if (variant === "initial") {
						setSize({ width: "w-12", height: "h-12" });
					} else {
						setSize({ width: "w-56", height: "h-12" });
					}
				break;
			case "large":
					if (variant === "initial") {
						setSize({ width: "w-24", height: "h-24" });
					} else {
						setSize({ width: "w-96", height: "h-24" });
					}
				break;
		}
	}, [variant, size]);

	return (
		<>
			<span className="sr-only">Archie</span>
			<svg viewBox={variant === 'initial' ? "0 0 38.54 40.54" : "0 0 231.16 40.54"}
				className={classNames(
					_size.width,
					_size.height,
					"max-w-full pointer-events-none"
				)}
				style={{ maxHeight: '6rem' }}
			>
				<g id="logo">
					<g id="base" style={{ fill: base }}>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M191.06,20.09a20,20,0,0,0,20.05,20.05v-20Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M165.43,25.93V40.54h15V25.93a14,14,0,0,1-15,0Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M140.21,12.24l.44,0V0H120.6v40.1h10V12.24Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M113.87,34.27,99.7,20.09,85.52,34.27A20,20,0,0,0,113.87,34.27Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M64,24.44H41.49v15.7h39L65.15,24.38A11.12,11.12,0,0,1,64,24.44Z"
						/>
						<polygon points="0 40.14 36.48 40.14 31.57 31.64 4.91 31.64 0 40.14" />
					</g>
					<g id="accent" style={{ fill: accent }}>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M231.16,20.09a20,20,0,0,0-20-20V20.09Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M173,0a14.06,14.06,0,0,0-14.06,14.06h0a14,14,0,0,0,6.54,11.87V7.79h15V25.93A14,14,0,0,0,187,14.06h0A14.07,14.07,0,0,0,173,0Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M140.65,12.26V40.14h14.18V26.86A14.61,14.61,0,0,0,140.65,12.26Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M85.52,5.92,99.7,20.09,113.87,5.92A20,20,0,0,0,85.52,5.92Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M76.19,12.24A12.2,12.2,0,0,0,64,0H41.49L65.15,24.38A12.19,12.19,0,0,0,76.19,12.24Z"
						/>
						<polygon points="18.24 0.04 0 31.64 4.91 31.64 18.24 8.55 31.57 31.64 36.48 31.64 18.24 0.04" />
					</g>
					<g
						id="theme"
						style={{
							fill: _theme === "light" ? "white" : "#000E78",
						}}
					>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M211.11,0a20.05,20.05,0,0,0-20.05,20.05h20.05Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M165.43,7.79V25.93a14,14,0,0,0,15,0V7.79Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M140.21,12.24h-9.58v27.9h10V12.26Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M85.52,34.27,99.7,20.09,85.52,5.92A20,20,0,0,0,85.52,34.27Z"
						/>
						<path
							className={classNames(
								variant === "initial" ? "hidden" : "block"
							)}
							d="M65.15,24.38,41.49,0v24.4H64A11.12,11.12,0,0,0,65.15,24.38Z"
						/>
						<polygon points="4.91 31.64 31.57 31.64 18.24 8.55 4.91 31.64" />
					</g>
				</g>
			</svg>
		</>
	);
};
Logo.propTypes = {
	theme: PropTypes.oneOf(["light", "dark"]),
	variant: PropTypes.oneOf(["full", "initial"]),
	size: PropTypes.oneOf(["small", "medium", "large"]),
};
export default Logo;
