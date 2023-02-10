import React, { useEffect, useState } from 'react';
import { AddCircleRounded, ChevronRightRounded, InfoRounded, ShareRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import LZString from 'lz-string';
import { useSelector } from 'react-redux';
import { selectLayoutItems, selectLayoutItemsData } from '../../../reducers/layout';
import Button from '../../button';
import ShareModal from './shareModal';

const LayoutToolbar = () => {
	const [shareDialogOpen, setShareDialogOpen] = useState(false);
	const layoutItems = useSelector(selectLayoutItems);
	const layoutItemsData = useSelector(selectLayoutItemsData);
	const location = window.location;
	const [exportLink, setExportLink] = useState('');

	useEffect(() => {
		setExportLink(
			LZString.compressToEncodedURIComponent(JSON.stringify({ items: layoutItems, data: layoutItemsData }))
		);
	}, [layoutItems, layoutItemsData]);

	return (
		<>
			<Accordion className="grow shadow-none bg-transparent border-none rounded-md">
				<AccordionSummary>
					<div className="flex flex-col">
						<Typography
							variant="h5"
							className="flex flex-row gap-2 items-center leading-tight tracking-tight text-white">
							Layout <InfoRounded className="w-4 h-4" />
						</Typography>
						<Typography variant="subtitle2" className="leading-tight tracking-tight text-white py-4">
							This section will help you build the layout and insert contents in your app
						</Typography>
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<Typography variant="caption" className="text-white">
						<ul>
							<li>
								Add contents to your app by clicking the <AddCircleRounded /> button in the right
								section.
							</li>
							<li>
								Reorder, duplicate or delete content using the <b>Layout Tree</b>.
							</li>
							<li>
								Click on a tree node name or click an element in the <b>Preview</b> panel to edit its
								properties.
							</li>
							<li>
								When you're satisfied with your layout, use the <b>Share</b> button to show the layout
								to your colleagues, or to save it for future edits.
							</li>
						</ul>
					</Typography>
				</AccordionDetails>
			</Accordion>

			{/* Share button */}
			<Button
				variant="text"
				className="!text-white"
				iconRight={<ShareRounded className="hidden md:block text-white" />}
				onClick={() => {
					setShareDialogOpen(true);
				}}>
				Share
			</Button>
			<ShareModal open={shareDialogOpen} close={() => setShareDialogOpen(false)} />

			{/* Export button */}
			<Button
				variant="text"
				className="!text-white"
				iconRight={<ChevronRightRounded className="hidden md:block text-white" />}
				href={'/export/' + exportLink}>
				Export
			</Button>
		</>
	);
};
export default LayoutToolbar;
