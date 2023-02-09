import React, { forwardRef } from "react";
import DragIndicatorRounded from '@mui/icons-material/DragIndicatorRounded';import { Action } from "../Action";
import { IconButton } from "@mui/material";

export const Handle = forwardRef((props, ref) => {
	return (
		<Action
			ref={ref}
			cursor="grab"
			data-cypress="draggable-handle"
			{...props}
		>
			<IconButton><DragIndicatorRounded className="text-zinc-500" /></IconButton>
		</Action>
	);
});
