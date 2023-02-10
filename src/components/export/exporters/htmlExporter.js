import { Typography } from '@mui/material';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import parserHtml from "prettier/parser-html";
import prettier from "prettier/standalone";
import Button from '../../button';
import { toast } from 'react-hot-toast';
import { LinkRounded } from '@mui/icons-material';
import { LAYOUT_DEFAULT_CLASSES } from '../../../reducers/layout';

const HTMLExporter = ({ exportData: { items, data } }) => {
	let htmlIds = {};
	const prettierConfig = {
		parser: 'html',
		plugins: [parserHtml],
		arrowParens: "always",
		bracketSameLine: false,
		bracketSpacing: true,
		htmlWhitespaceSensitivity: "css",
		proseWrap: "preserve",
		quoteProps: "as-needed",
		tabWidth: 4,
		useTabs: true,
	}

	const getHTMLId = (_id) => {
		const id = _id.toLowerCase().replace(/\W+/g, '_').replace(/^_|_$/, '');
		let counter = 0;

		while (htmlIds[id + (counter > 0 ? `_${counter}` : '')]) {
			counter++;
		}
		let ret = id + (counter > 0 ? `_${counter}` : '');
		htmlIds[ret] = true;
		return ret;
	};

	const getHTMLNode = (node) => {
		const nodeId = getHTMLId(node.label);

		return `<div id="${nodeId}" className="${Object.values(data[node.id] || LAYOUT_DEFAULT_CLASSES).join(' ')}">
			${node.label}
			${node.children?.map((c) => getHTMLNode(c)).join('\n')}
		</div>`;
	};

	const htmlCode = prettier.format(getHTMLNode(items[0]), prettierConfig);
	return (
		<div className="flex flex-col items-start gap-4 w-full h-full">
			<Typography variant="h6">Copy the following code into your HTML file</Typography>
			<Button
				onClick={() => {
					navigator.clipboard.writeText(htmlCode);
					toast.success('Copied to clipboard');
				}}
				iconRight={<LinkRounded className="text-white" />}>
				Click here to copy
			</Button>
			<Scrollbars className="h-full">
				<pre className="bg-zinc-50 p-4 m-4 rounded-md overflow-hidden">
					{ htmlCode }
				</pre>
			</Scrollbars>
		</div>
	);
};
export default HTMLExporter;
