import React from 'react';
import { ChevronLeftRounded, InfoRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Button from '../../button';

const ExportToolbar = () => {
	const location = useLocation();
	return (
		<>
			<Accordion className="grow shadow-none bg-transparent border-none rounded-md">
				<AccordionSummary>
					<div className="flex flex-col">
						<Typography
							variant="h5"
							className="flex flex-row gap-2 items-center leading-tight tracking-tight text-white">
							Export <InfoRounded className="w-4 h-4" />
						</Typography>
						<Typography variant="subtitle2" className="leading-tight tracking-tight text-white py-4">
							This section will let you export the layout you built into actual code
						</Typography>
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<Typography variant="caption" className="text-white">
						Export your code to different targets, like Anacleto Builder, HTML + TailwindCSS, React + MUI (Soon&#8482;) and more!
					</Typography>
				</AccordionDetails>
			</Accordion>

			{/* Layout button */}
			<Button
				href={"/layout/" + location.pathname.split("/").slice(-1) }
				variant="text"
				className="!text-white"
				iconLeft={<ChevronLeftRounded className="hidden md:block text-white" />}
				>
				Edit Layout
			</Button>
		</>
	);
};
export default ExportToolbar;
