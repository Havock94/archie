import { Drawer, Fab, Typography } from "@mui/material";
import { SortableTree } from "./layoutTree/SortableTree";
import { useEffect, useState } from "react";
import { AddRounded } from "@mui/icons-material";
import classNames from "classnames";
import LayoutEditor from "./layoutEditor/layoutEditor";
import { useDispatch, useSelector } from "react-redux";
import {
	selectLayoutItems,
	setLayoutItemData,
	setLayoutItems,
	setLayoutItemsData,
} from "../../reducers/layout";
import { findItemDeep } from "./layoutTree/utilities";
import LZString from "lz-string";

const LayoutRight = ({ urlParams, sharedContext, setSharedContext }) => {
	const dispatch = useDispatch();
	const _layoutItems = useSelector(selectLayoutItems);
	//If there's the restoreLayout parameter I still initialize it as an empty array, the parameter will be decoded in an effect below
	const [layoutItems, _setLayoutItems] = useState(urlParams.restoreLayout ? [] : _layoutItems);
	const [newItems, setNewItems] = useState(null);
	const [componentLabelFunction, setComponentLabelFunction] = useState(
		() => {}
	);
	const [addItemsFunction, setAddItemsFunction] = useState(null);
	const [editItemPropertyFunction, setEditItemPropertyFunction] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [drawerData, setDrawerData] = useState(null);

	const addItem = () => {
		addItemsFunction({
			label: "New element",
			children: [],
			parentId: "root",
		});
	};

	const onItemRemove = (id) => {
		dispatch(setLayoutItemData({ id, data: null }));	//On item removal, also empty it's style data in Redux
	};

	const handleOutputItems = (items) => {
		dispatch(setLayoutItems(items));	//Update Redux
		if(drawerData?.selectedItemId){	//If the drawer was opened...
			const newDrawerItem = items.filter(i => i.id === drawerData.selectedItemId)[0];	//Find the updated item
			if(!newDrawerItem) setDrawerOpen(false);	//Close the drawer if there's no item data (e.g. item deletion while drawer was open (shouldn't happen but...))
		}
	}

	useEffect(() => {
		if(drawerOpen === false){
			setDrawerData(null);
		}
	}, [drawerOpen]);

	useEffect(() => {
		if(sharedContext.selectedItemId){ //If an element has been selected, open the drawer for the relative element
			const selectedItem = findItemDeep(layoutItems, sharedContext.selectedItemId);/*layoutItems.filter((i) => i.id === sharedContext.selectedItemId)[0];*/
			if(selectedItem){
				setDrawerData((prev) => ({ ...prev, selectedItemId: sharedContext.selectedItemId }));
				setDrawerOpen(true);
			}
		}
	}, [sharedContext]);

	//Remove the selectedId when the drawer closes
	useEffect(() => {
		if(drawerOpen === false){
			setSharedContext((prev) => ({ ...prev, selectedItemId: null }));
		}
	}, [drawerOpen]);

	useEffect(() => {
		if(editItemPropertyFunction){
			//If SortableTree sends back the editProperty function, remap it to allow component name change (will be forwarded to FlexEditor)
			setComponentLabelFunction(() => (itemId, newValue) =>
				editItemPropertyFunction(itemId, 'label', newValue)
			);
		}
	}, [editItemPropertyFunction]);

	//Restore the previous layout session when navigating to /layout/previouslayouttoken
	useEffect(() => {
		if(urlParams.restoreLayout){
			try{
				const restoreLayout = JSON.parse(LZString.decompressFromEncodedURIComponent(urlParams.restoreLayout));
				setNewItems(restoreLayout.items);
				dispatch(setLayoutItemsData(restoreLayout.data));
			}catch(e){}
		}
	}, [urlParams]);

	useEffect(() => {
		_setLayoutItems(_layoutItems); //Update internal LayoutItems
	}, [_layoutItems]);

	return (
		<>
			<div className="relative flex flex-col w-full">
				<Drawer
					className="absolute h-full w-full overflow-hidden"
					open={drawerOpen}
					PaperProps={{
						style: {
							position: "relative",
							border: "none",
						},
					}}
					variant="persistent"
					anchor="right"
				>
					{drawerOpen && (
						<div className="flex flex-col justify-between w-full h-full">
							<div className="w-full overflow-auto">
								{/* Form edit */}
								<LayoutEditor
									setDrawerOpen={setDrawerOpen}
									drawerData={ drawerData }
									setComponentLabel={componentLabelFunction}
								/>
							</div>
						</div>
					)}
				</Drawer>
				<Typography as="h4" className="mb-6">
					Layout tree
				</Typography>
				<div>
					<SortableTree
						defaultItems={layoutItems}
						newItems={newItems}
						setItemsOutput={handleOutputItems}
						setAddItemsFunction={setAddItemsFunction}
						setEditItemPropertyFunction={
							setEditItemPropertyFunction
						}
						onItemClick={(item) => {
							setSharedContext((prev) => ({ ...prev, selectedItemId: item.id}))
						}}
						onItemRemove={onItemRemove}
						collapsible
						indicator
						removable
					/>
				</div>
			</div>
			<Fab
				color="secondary"
				className={classNames(
					drawerOpen ? "hidden" : "block",
					"absolute bottom-4 right-4 bg-pink-500 hover:bg-pink-400 active:bg-pink-700"
				)}
				aria-label="add"
				onClick={addItem}
			>
				<AddRounded className="text-white" />
			</Fab>
		</>
	);
};
export default LayoutRight;
