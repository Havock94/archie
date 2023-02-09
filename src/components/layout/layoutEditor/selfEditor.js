import React, { Fragment, useEffect, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	FormControl,
	FormControlLabel,
	FormGroup,
	MenuItem,
	Select,
	Switch,
	Typography,
} from '@mui/material';

import { useDispatch, } from 'react-redux';
import {  setLayoutItemData } from '../../../reducers/layout';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export const FLEX_GROW = {
	1: {
		label: 'Grow',
		className: 'grow',
	},
	0: {
		label: "Don't grow",
		className: 'grow-0',
	},
};
export const FLEX_BASIS = {
	'basis-auto': {
		label: 'Auto',
		className: 'basis-auto',
	},
	'basis-full': {
		label: 'Full',
		helper: '100%',
		className: 'basis-full',
	},
	'helper-columns': {
		label: 'Columns',
	},
	'basis-1/12': {
		label: '1/12',
		helper: '8.333333%',
		className: 'basis-1/12',
	},
	'basis-2/12': {
		label: '2/12',
		helper: '16.666667%',
		className: 'basis-2/12',
	},
	'basis-3/12': {
		label: '3/12',
		helper: '25%',
		className: 'basis-3/12',
	},
	'basis-4/12': {
		label: '4/12',
		helper: '33.333333%',
		className: 'basis-4/12',
	},
	'basis-5/12': {
		label: '5/12',
		helper: '41.666667%',
		className: 'basis-5/12',
	},
	'basis-6/12': {
		label: '6/12',
		helper: '50%',
		className: 'basis-6/12',
	},
	'basis-7/12': {
		label: '7/12',
		helper: '58.333333%',
		className: 'basis-7/12',
	},
	'basis-8/12': {
		label: '8/12',
		helper: '66.666667%',
		className: 'basis-8/12',
	},
	'basis-9/12': {
		label: '9/12',
		helper: '75%',
		className: 'basis-9/12',
	},
	'basis-10/12': {
		label: '10/12',
		helper: '83.333333%',
		className: 'basis-10/12',
	},
	'basis-11/12': {
		label: '11/12',
		helper: '91.666667%',
		className: 'basis-11/12',
	},
	'helper-pixels': {
		label: 'Pixels',
	},
	'basis-0': {
		label: '0px',
		className: 'basis-0',
	},
	'basis-px': {
		label: '1px',
		className: 'basis-px',
	},
	'helper-rem': {
		label: 'REM',
	},
	'basis-0.5': {
		label: '0.5',
		helper: '0.125rem',
		className: 'basis-0.5',
	},
	'basis-1': {
		label: '1',
		helper: '0.25rem',
		className: 'basis-1',
	},
	'basis-1.5': {
		label: '1.5',
		helper: '0.375rem',
		className: 'basis-1.5',
	},
	'basis-2': {
		label: '2',
		helper: '0.5rem',
		className: 'basis-2',
	},
	'basis-2.5': {
		label: '2.5',
		helper: '0.625rem',
		className: 'basis-2.5',
	},
	'basis-3': {
		label: '3',
		helper: '0.75rem',
		className: 'basis-3',
	},
	'basis-3.5': {
		label: '3.5',
		helper: '0.875rem',
		className: 'basis-3.5',
	},
	'basis-4': {
		label: '4',
		helper: '1rem',
		className: 'basis-4',
	},
	'basis-5': {
		label: '5',
		helper: '1.25rem',
		className: 'basis-5',
	},
	'basis-6': {
		label: '6',
		helper: '1.5rem',
		className: 'basis-6',
	},
	'basis-7': {
		label: '7',
		helper: '1.75rem',
		className: 'basis-7',
	},
	'basis-8': {
		label: '8',
		helper: '2rem',
		className: 'basis-8',
	},
	'basis-9': {
		label: '9',
		helper: '2.25rem',
		className: 'basis-9',
	},
	'basis-10': {
		label: '10',
		helper: '2.5rem',
		className: 'basis-10',
	},
	'basis-11': {
		label: '11',
		helper: '2.75rem',
		className: 'basis-11',
	},
	'basis-12': {
		label: '12',
		helper: '3rem',
		className: 'basis-12',
	},
	'basis-14': {
		label: '14',
		helper: '3.5rem',
		className: 'basis-14',
	},
	'basis-16': {
		label: '16',
		helper: '4rem',
		className: 'basis-16',
	},
	'basis-20': {
		label: '20',
		helper: '5rem',
		className: 'basis-20',
	},
	'basis-24': {
		label: '24',
		helper: '6rem',
		className: 'basis-24',
	},
	'basis-28': {
		label: '28',
		helper: '7rem',
		className: 'basis-28',
	},
	'basis-32': {
		label: '32',
		helper: '8rem',
		className: 'basis-32',
	},
	'basis-36': {
		label: '36',
		helper: '9rem',
		className: 'basis-36',
	},
	'basis-40': {
		label: '40',
		helper: '10rem',
		className: 'basis-40',
	},
	'basis-44': {
		label: '44',
		helper: '11rem',
		className: 'basis-44',
	},
	'basis-48': {
		label: '48',
		helper: '12rem',
		className: 'basis-48',
	},
	'basis-52': {
		label: '52',
		helper: '13rem',
		className: 'basis-52',
	},
	'basis-56': {
		label: '56',
		helper: '14rem',
		className: 'basis-56',
	},
	'basis-60': {
		label: '60',
		helper: '15rem',
		className: 'basis-60',
	},
	'basis-64': {
		label: '64',
		helper: '16rem',
		className: 'basis-64',
	},
	'basis-72': {
		label: '72',
		helper: '18rem',
		className: 'basis-72',
	},
	'basis-80': {
		label: '80',
		helper: '20rem',
		className: 'basis-80',
	},
	'basis-96': {
		label: '96',
		helper: '24rem',
		className: 'basis-96',
	},
};
const SelfEditor = ({ itemId, layoutData }) => {
	const dispatch = useDispatch();
	const updateLayoutData = (property, value) => {
		dispatch(setLayoutItemData({ id: itemId, data: { [property]: value } }));
	};

	const proxyHandler = {
		get: function (target, name) {
			return target.hasOwnProperty(name) ? target[name] : '';
		},
	};
	const layoutDataProxy = new Proxy(layoutData, proxyHandler);

	return (
		<>
			<div className="flex flex-col gap-6">
				{/* Flex basis */}
				<div className="grid grid-cols-2">
					<Accordion className="grow shadow-none">
						<AccordionSummary>
							<div className="flex flex-row gap-4 items-center">
								<Typography variant="subtitle2">Flex Basis</Typography>
								<InfoRoundedIcon className="text-zinc-400" />
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="caption">
								This defines the default size of an element before the remaining space is distributed.
								It can be a length (e.g. 20%, 5rem, etc...) or the keyword <pre>auto</pre>
							</Typography>
						</AccordionDetails>
					</Accordion>
					<FormControl fullWidth>
						<Select
							value={layoutDataProxy.flexBasis}
							onChange={(e) => updateLayoutData('flexBasis', e.target.value)}>
							{Object.keys(FLEX_BASIS).map((k) => (
								<MenuItem
									key={k}
									value={FLEX_BASIS[k].className || null}
									disabled={!FLEX_BASIS[k].className}>
									{k.startsWith('helper-') ? (
										<Typography variant="subtitle2" className="mt-6">
											{FLEX_BASIS[k].label}
										</Typography>
									) : (
										<div className="flex flex-row grow justify-between">
											<Typography>{FLEX_BASIS[k].label}</Typography>
											<Typography variant="caption" className="text-zinc-500">
												{FLEX_BASIS[k].helper || ''}
											</Typography>
										</div>
									)}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				{/* Flex grow */}
				<div className="grid grid-cols-2">
					<Accordion className="grow shadow-none">
						<AccordionSummary>
							<div className="flex flex-row gap-4 items-center">
								<Typography variant="subtitle2">Flex Grow</Typography>
								<InfoRoundedIcon className="text-zinc-400" />
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="caption">
								Flex grow defines the ability for a flex item to grow so that it occupies any remaining
								free space.
							</Typography>
						</AccordionDetails>
					</Accordion>
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									checked={layoutDataProxy.flexGrow === FLEX_GROW[1].className}
									onChange={(e) =>
										updateLayoutData('flexGrow', FLEX_GROW[e.target.checked ? 1 : 0].className)
									}
								/>
							}
							label={
								layoutDataProxy.flexGrow
									? layoutDataProxy.flexGrow === FLEX_GROW[1].className
										? FLEX_GROW[1].label
										: FLEX_GROW[0].label
									: ''
							}
						/>
					</FormGroup>
				</div>
			</div>
		</>
	);
};
export default SelfEditor;
