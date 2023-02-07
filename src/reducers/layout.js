import { createSlice } from "@reduxjs/toolkit";
import { ALIGN_ITEMS, FLEX_DIRECTIONS, FLEX_WRAP, JUSTIFY_CONTENT } from "../components/layoutEditor/containerEditor";
import { FLEX_BASIS, FLEX_GROW } from "../components/layoutEditor/selfEditor";
function flat(array) {
	var result = [];
	array.map((a) => {
		result.push(a);
		if (Array.isArray(a.children)) {
			result = result.concat(flat(a.children));
		}
	});
	return result;
}
const layoutItems = [
	{
		id: "root",
		label: "Main Container",
		canDrag: false,
		canDelete: false,
		canDuplicate: false,
		children: [
			{
				id: "header",
				label: "Header",
				children: [
					{
						id: "header-logo",
						label: "Logo",
						children: [],
					},
					{
						id: "header-menu",
						label: "Menu",
						children: [],
					},
				],
			},
			{
				id: "main",
				label: "Main",
				children: [
					{
						id: "title1",
						label: "Title1",
						children: [],
					},
					{
						id: "content1",
						label: "Content1",
						children: [],
					},
					{
						id: "title2",
						label: "Title2",
						children: [],
					},
					{
						id: "content2",
						label: "Content2",
						children: [],
					},
				],
			},
			{
				id: "footer",
				label: "Footer",
				children: [
					{
						id: "logo-footer",
						label: "Logo",
						children: [],
					},
					{
						id: "about-us",
						label: "About Us",
						children: [],
					},
				],
			},
		],
	},
];
export const LAYOUT_DEFAULT_CLASSES = {
	alignItems: ALIGN_ITEMS.FLEX_START.className,
	display: "flex",
	flexBasis: FLEX_BASIS["basis-auto"].className,
	flexDirection: FLEX_DIRECTIONS.ROW.className,
	flexGrow: FLEX_GROW[0].className,
	flexWrap: FLEX_WRAP.WRAP.className,
	justifyContent: JUSTIFY_CONTENT.FLEX_START.className,
	overflow: "overflow-hidden",
	position: "relative",
};
const initialState = {
	layoutItems,
	itemsData: {
		...Object.fromEntries(
			flat(layoutItems).map((a) => [[a.id], { ...LAYOUT_DEFAULT_CLASSES }])
		),
		root: {
			...LAYOUT_DEFAULT_CLASSES,
			flexDirection: FLEX_DIRECTIONS.COL.className,
			alignItems: ALIGN_ITEMS.STRETCH.className
		},
		"header-menu": {
			...LAYOUT_DEFAULT_CLASSES,
			flexGrow: FLEX_GROW[1].className
		}
	},
};

const layoutSlice = createSlice({
	name: "layout",
	initialState,
	reducers: {
		setLayoutItems: (state = null, items) => {
			state.layoutItems = items.payload;
		},
		setLayoutItem: (state = null, item) => {
			let layoutItems = [...state.layoutItems];
			const itemIndex = layoutItems
				.map((i) => i.id === item.payload.id)
				.indexOf(true);
			layoutItems.splice(itemIndex, 1, item.payload);

			return {
				...state,
				layoutItems: layoutItems,
			};
		},
		setLayoutItemData: (state = null, { payload }) => {
			if(payload.data == null){
				state.itemsData = {
					...state.itemsData,
					[payload.id]: {},
				};
			}else{
				state.itemsData = {
					...state.itemsData,
					[payload.id]: {
						...state.itemsData[payload.id],
						...payload.data,
					},
				};
			}
		},
	},
});

export const selectLayoutItems = (state) => state.layout.layoutItems;
export const selectLayoutItem = (state, id) =>
	state.layout.layoutItems.filter((i) => i.id === id)[0];
export const selectLayoutItemsData = (state) => state.layout.itemsData;

export const { setLayoutItems, setLayoutItem, setLayoutItemData } =
	layoutSlice.actions;
export default layoutSlice.reducer;
