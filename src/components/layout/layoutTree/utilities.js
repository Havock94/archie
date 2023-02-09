import { arrayMove } from "@dnd-kit/sortable";
import uuid from "react-uuid";

export const iOS = /iPad|iPhone|iPod/.test(navigator.platform);

function getDragDepth(offset, indentationWidth) {
	return Math.round(offset / indentationWidth);
}

export function getProjection(
	items,
	activeId,
	overId,
	dragOffset,
	indentationWidth
) {
	const overItemIndex = items.findIndex(({ id }) => id === overId);
	const activeItemIndex = items.findIndex(({ id }) => id === activeId);
	const activeItem = items[activeItemIndex];
	const newItems = arrayMove(items, activeItemIndex, overItemIndex);
	const previousItem = newItems[overItemIndex - 1];
	const nextItem = newItems[overItemIndex + 1];
	const dragDepth = getDragDepth(dragOffset, indentationWidth);
	const projectedDepth = activeItem.depth + dragDepth;
	const maxDepth = getMaxDepth({
		previousItem,
	});
	const minDepth = getMinDepth({ nextItem });
	let depth = projectedDepth;

	if (projectedDepth >= maxDepth) {
		depth = maxDepth;
	} else if (projectedDepth < minDepth) {
		depth = minDepth;
	}

	return { depth, maxDepth, minDepth, parentId: getParentId() };

	function getParentId() {
		if (depth === 0 || !previousItem) {
			return null;
		}

		if (depth === previousItem.depth) {
			return previousItem.parentId;
		}

		if (depth > previousItem.depth) {
			return previousItem.id;
		}

		const newParent = newItems
			.slice(0, overItemIndex)
			.reverse()
			.find((item) => item.depth === depth)?.parentId;

		return newParent ?? null;
	}
}

function getMaxDepth({ previousItem }) {
	if (previousItem) {
		return previousItem.depth + 1;
	}

	return 0;
}

function getMinDepth({ nextItem }) {
	if (nextItem) {
		return nextItem.depth;
	}

	return 0;
}

function flatten(items, parentId = null, depth = 0) {
	return items.reduce((acc, item, index) => {
		return [
			...acc,
			{ ...item, parentId, depth, index },
			...flatten(item.children, item.id, depth + 1),
		];
	}, []).filter((item, i, self) => self.map(i => i.id === item.id).indexOf(true) === i);
}

export function flattenTree(items) {
	return flatten(items);
}

export function buildTree(flattenedItems) {
	const root = { id: "root", children: [] };
	const nodes = { [root.id]: root };
	const items = flattenedItems.map((item) => ({ ...item, children: [] }));

	for (const item of items) {
		const { id, children } = item;
		const parentId = item.parentId ?? root.id;
		const parent = nodes[parentId] ?? findItem(items, parentId);

		nodes[id] = { id, children };
		parent.children.push(item);
	}

	return root.children;
}

export function findItem(items, itemId) {
	return items.find(({ id }) => id === itemId);
}

export function findItemDeep(items, itemId) {
	for (const item of items) {
		const { id, children } = item;

		if (id === itemId) {
			return item;
		}

		if (children.length) {
			const child = findItemDeep(children, itemId);

			if (child) {
				return child;
			}
		}
	}

	return undefined;
}

export function removeItem(items, id) {
	return Object.values(items).map((_item) => {
		let item = Object.assign({}, _item);
		if (item.id === id) {
			return null;
		}else if (item.children.length) {
			item.children = removeItem(item.children, id);
		}
		return item;
	}).filter(Boolean);
}
function addItemToParent(items, parentId, newItem){
	return items.map(_i => {
		let item = Object.assign({}, _i);
		if(item.id === parentId){
			item.children = [...item.children, newItem];
			return item;
		}else if(item.children?.length){
			item.children = [...addItemToParent(item.children, parentId, newItem)];
		}
		return item;
	})
};
function setPropertyDeep(items, property, setter, insertIfMissing){
	return items.map(_i => {
		let item = Object.assign({}, _i);

		if(item[property] != null || insertIfMissing){
			item[property] = setter();
		}
		if(item.children?.length){
			item.children = [...setPropertyDeep(item.children, property, setter, insertIfMissing)];
		}
		return item;
	})
}
export function addItem(items, { parentId, ..._newItem }){
	let newItem = setPropertyDeep([{ ..._newItem }], "id", () => uuid(), true)[0];
	
	if(parentId){
		return addItemToParent(items, parentId, newItem);
	}else{
		return [...items, newItem];
	}
}

export function setProperty(items, id, property, setter) {
	return Object.values(items).map((item) => {
		let ret = Object.assign({}, item);
		if (ret.id === id) {
			ret[property] = setter(ret[property]);
		}else if (ret.children.length) {
			ret.children = setProperty(ret.children, id, property, setter);
		}
		return ret;
	})
}


function countChildren(items, count = 0) {
	return items.reduce((acc, { children }) => {
		if (children.length) {
			return countChildren(children, acc + 1);
		}

		return acc + 1;
	}, count);
}

export function getChildCount(items, id) {
	const item = findItemDeep(items, id);

	return item ? countChildren(item.children) : 0;
}

export function removeChildrenOf(items, ids) {
	const excludeParentIds = [...ids];

	return items.filter((item) => {
		if (item.parentId && excludeParentIds.includes(item.parentId)) {
			if (item.children.length) {
				excludeParentIds.push(item.id);
			}
			return false;
		}

		return true;
	});
}
