import React from "react";
import { Action } from "../Action";
import ClearRounded from '@mui/icons-material/ClearRounded';
import { IconButton } from "@mui/material";

export function Remove(props) {
	return (
		<Action
			{...props}
			active={{
				fill: "rgba(255, 70, 70, 0.95)",
				background: "rgba(255, 70, 70, 0.1)",
			}}
		>
			<IconButton><ClearRounded className="text-red-700" /></IconButton>
		</Action>
	);
}
