import React, { useEffect, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	FormControl,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { selectLayoutItemsData, setLayoutItemData } from '../../reducers/layout';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export const FLEX_DIRECTIONS = {
	ROW: {
		label: 'Row',
		className: 'flex-row',
	},
	COL: {
		label: 'Column',
		className: 'flex-col',
	},
	ROW_REVERSE: {
		label: 'Row Reverse',
		className: 'flex-row-reverse',
	},
	COL_REVERSE: {
		label: 'Column Reverse',
		className: 'flex-col-reverse',
	},
};
export const ALIGN_ITEMS = {
	FLEX_START: {
		label: 'Start',
		className: 'items-start',
	},
	CENTER: {
		label: 'Center',
		className: 'items-center',
	},
	FLEX_END: {
		label: 'End',
		className: 'items-end',
	},
	STRETCH: {
		label: 'Stretch',
		className: 'items-stretch',
	},
	BASELINE: {
		label: 'Baseline',
		className: 'items-baseline',
	},
};
export const JUSTIFY_CONTENT = {
	FLEX_START: {
		label: 'Start',
		className: 'justify-start',
	},
	CENTER: {
		label: 'Center',
		className: 'justify-center',
	},
	FLEX_END: {
		label: 'End',
		className: 'justify-end',
	},
	SPACE_BETWEEN: {
		label: 'Space between',
		className: 'justify-between',
	},
	SPACE_AROUND: {
		label: 'Space around',
		className: 'justify-around',
	},
	SPACE_EVENLY: {
		label: 'Space evenly',
		className: 'justify-evenly',
	},
};
export const FLEX_WRAP = {
	NO_WRAP: {
		label: 'No Wrap',
		className: 'flex-nowrap',
	},
	WRAP: {
		label: 'Wrap',
		className: 'flex-wrap',
	},
	WRAP_REVERSE: {
		label: 'Wrap Reverse',
		className: 'flex-wrap-reverse',
	},
};
const ContainerEditor = ({ itemId, layoutData }) => {
	const dispatch = useDispatch();

	const updateLayoutData = (property, value) => {
		dispatch(setLayoutItemData({ id: itemId, data: { [property]: value}}));
	}
	
	const proxyHandler = {
		get: function(target, name) {
		  return target.hasOwnProperty(name) ? target[name] : '';
		}
	};
	const layoutDataProxy = new Proxy(layoutData, proxyHandler);
	
	return (
		<>
			<div className="flex flex-col gap-6">
				{/* Flex direction */}
				<div className="grid grid-cols-2">
					<Accordion className="grow shadow-none">
						<AccordionSummary>
							<div className="flex flex-row gap-4 items-center">
								<Typography variant="subtitle2">Flex Direction</Typography>
								<InfoRoundedIcon className="text-zinc-400" />
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="caption">
								Flex direction defines the direction flex items are placed in the flex container.
								Flexbox is a single-direction layout concept, so items are laying out either in
								horizontal rows or vertical columns.
							</Typography>
						</AccordionDetails>
					</Accordion>
					<FormControl fullWidth>
						<Select value={layoutDataProxy.flexDirection} onChange={(e) => updateLayoutData('flexDirection', e.target.value)}>
							{Object.keys(FLEX_DIRECTIONS).map((k) => (
								<MenuItem key={k} value={FLEX_DIRECTIONS[k].className}>
									{FLEX_DIRECTIONS[k].label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				{/* Justify content */}
				<div className="grid grid-cols-2">
					<Accordion className="grow shadow-none">
						<AccordionSummary>
							<div className="flex flex-row gap-4 items-center">
								<Typography variant="subtitle2">Justify Content</Typography>
								<InfoRoundedIcon className="text-zinc-400" />
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="caption">
								Justify content defines the content alignment along the main axis. It helps distribute
								free space and control the alignment of items when they overflow the line.
							</Typography>
						</AccordionDetails>
					</Accordion>
					<FormControl fullWidth>
						<Select value={layoutDataProxy.justifyContent} onChange={(e) => updateLayoutData('justifyContent', e.target.value)}>
							{Object.keys(JUSTIFY_CONTENT).map((k) => (
								<MenuItem key={k} value={JUSTIFY_CONTENT[k].className}>
									{JUSTIFY_CONTENT[k].label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				{/* Align items */}
				<div className="grid grid-cols-2">
					<Accordion className="grow shadow-none">
						<AccordionSummary>
							<div className="flex flex-row gap-4 items-center">
								<Typography variant="subtitle2">Align Items</Typography>
								<InfoRoundedIcon className="text-zinc-400" />
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="caption">
								Align items define the default behavior for how flex items are laid out along the cross
								axis on the current line. Think of it as the justify-content perpendicular to the
								main-axis.
							</Typography>
						</AccordionDetails>
					</Accordion>
					<FormControl fullWidth>
						<Select value={layoutDataProxy.alignItems} onChange={(e) => updateLayoutData('alignItems', e.target.value)}>
							{Object.keys(ALIGN_ITEMS).map((k) => (
								<MenuItem key={k} value={ALIGN_ITEMS[k].className}>
									{ALIGN_ITEMS[k].label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				{/* Flex Wrap */}
				<div className="grid grid-cols-2">
					<Accordion className="grow shadow-none">
						<AccordionSummary>
							<div className="flex flex-row gap-4 items-center">
								<Typography variant="subtitle2">Flex Wrap</Typography>
								<InfoRoundedIcon className="text-zinc-400" />
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="caption">
								Align items define the default behavior for how flex items are laid out along the cross
								axis on the current line. Think of it as the justify-content perpendicular to the
								main-axis.
							</Typography>
						</AccordionDetails>
					</Accordion>
					<FormControl fullWidth>
						<Select value={layoutDataProxy.flexWrap} onChange={(e) => updateLayoutData('flexWrap', e.target.value)}>
							{Object.keys(FLEX_WRAP).map((k) => (
								<MenuItem key={k} value={FLEX_WRAP[k].className}>
									{FLEX_WRAP[k].label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</div>
		</>
	);
};
export default ContainerEditor;
