import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { useSelector } from "react-redux";
import { selectLayoutItems, selectLayoutItemsData } from "../../reducers/layout";
import classNames from "classnames";
import { Typography } from "@mui/material";
import LZString from "lz-string";

export default function LayoutLeft({ urlParams, sharedContext, setSharedContext }) {
	window.LZString = LZString;
	const layoutItems = useSelector(selectLayoutItems);
	const layoutItemsData = useSelector(selectLayoutItemsData);
	const [hoveredElement, setHoveredElement] = useState(null);

	//I must get itemData from the first level because children don't bring data with them
	const getItemData = (item) => (layoutItemsData[item.id] || {});

	const getDisplayElement = (item) => {
		//When restoring a layout there's a delay from the loading and the moment where the redux variable is available.
		//If an empty item arrives here, just ignore it, it will be re-rendered when the redux variable will be set
		if(!item) return <></>;
		const itemData = getItemData(item);
		return (
			<motion.div
				layout
				key={item.id}
				id={item.id}
				className={classNames(
					{ '!overflow-auto': item.id === 'root' },
					`preview-${item.id}`,
					'flex flex-col border-4 border-transparent transition-colors bg-blue-400/20 m-4 p-4 rounded-md shadow-md',
					{"border-blue-400 cursor-pointer": hoveredElement ? hoveredElement === item.id : sharedContext.selectedItemId === item.id},
					Object.values(Object.keys(itemData).filter(k => k.startsWith('flex')).map(k => itemData[k]))
				)}
				onClick={(e) => { e.stopPropagation(); setSharedContext((prev) => ({ ...prev, selectedItemId: item.id}))}}
				onHoverStart={(e) => setHoveredElement(e.target.id) }
				onHoverEnd={(e) => setHoveredElement(e.relatedTarget?.id || e.relatedTarget?.parentElement?.id || null)}
			>
				<Typography
					variant="subtitle2"
					className="max-w-full overflow-hidden text-ellipsis pointer-events-none"
				>
					{item.label}
				</Typography>
				<div className={classNames('flex', Object.values(itemData))}>
					{item.children?.map((c) => getDisplayElement(c))}
				</div>
			</motion.div>
		);
	};
	return (
		<div className="flex flex-col w-full">
			<Typography as="h4" className="mb-6">
				Preview
			</Typography>
			<LayoutGroup>
				<div className="h-full w-full">
					{getDisplayElement(
						layoutItems?.filter((item) => item.id === "root")[0]
					)}
				</div>
			</LayoutGroup>
		</div>
	);
}
