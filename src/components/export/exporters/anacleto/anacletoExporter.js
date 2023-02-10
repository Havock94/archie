import { LinkRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { toast } from 'react-hot-toast';
import { LAYOUT_DEFAULT_CLASSES } from '../../../../reducers/layout';
import Button from '../../../button';

const AnacletoExporter = ({ exportData: { items, data } }) => {
	let anacletoIds = {};

	const getAnacletoId = (_id) => {
		const id = _id.toLowerCase().replace(/\W+/g, '_').replace(/^_|_$/, '');
		let counter = 0;

		while (anacletoIds[id + (counter > 0 ? `_${counter}` : '')]) {
			counter++;
		}
		let ret = id + (counter > 0 ? `_${counter}` : '');
		anacletoIds[ret] = true;
		return ret;
	};

	const getAnacletoNode = (node) => {
		const nodeId = getAnacletoId(node.label);
		return {
			id: nodeId,
			component: 'GridContainer',
			className: Object.values(data[node.id] || LAYOUT_DEFAULT_CLASSES).join(' '),
			components: node.children?.map((c) => getAnacletoNode(c)),
		};
	};

	const anacletoCode = JSON.stringify(
		{
			id: 'my_window',
			windowName: 'My Window',
			component: 'GridContainer',
			components: [getAnacletoNode(items[0])],
		},
		null,
		4
	);
	return (
		<div className="flex flex-col gap-4 items-start w-full h-full">
			<Typography variant="h6">Import the following code into an Anacleto window</Typography>
			<Button
				onClick={() => {
					navigator.clipboard.writeText(anacletoCode);
					toast.success('Copied to clipboard');
				}}
				iconRight={<LinkRounded className="text-white" />}>
				Click here to copy
			</Button>
			<Scrollbars className="h-full">
				<pre className="bg-zinc-50 p-4 m-4 rounded-md overflow-hidden">
					{ anacletoCode }
				</pre>
			</Scrollbars>
		</div>
	);
};
export default AnacletoExporter;
