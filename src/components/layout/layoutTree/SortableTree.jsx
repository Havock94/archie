import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
	MeasuringStrategy,
	defaultDropAnimation,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
	buildTree,
	flattenTree,
	getProjection,
	getChildCount,
	removeItem,
	addItem,
	removeChildrenOf,
	setProperty,
} from "./utilities";
import { sortableTreeKeyboardCoordinates } from "./keyboardCoordinates";
import { CSS } from "@dnd-kit/utilities";
import { SortableTreeItem } from "./components";
import uuid from "react-uuid";
const measuring = {
	droppable: {
		strategy: MeasuringStrategy.Always,
	},
};

const dropAnimationConfig = {
	keyframes({ transform }) {
		return [
			{
				opacity: 1,
				transform: CSS.Transform.toString(transform.initial),
			},
			{
				opacity: 0,
				transform: CSS.Transform.toString({
					...transform.final,
					x: transform.final.x + 5,
					y: transform.final.y + 5,
				}),
			},
		];
	},
	easing: "ease-out",
	sideEffects({ active }) {
		active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: defaultDropAnimation.duration,
			easing: defaultDropAnimation.easing,
		});
	},
};

export function SortableTree({
	collapsible,
	defaultItems = [],
	newItems,	//Used to force a reload of the tree items
	indicator = false,
	indentationWidth = 50,
	removable,
	setItemsOutput = () => {},
	setAddItemsFunction = () => {},
	setEditItemPropertyFunction = () => {},
	onItemClick = () => {},
	onItemRemove = () => {},
}) {
	const [items, setItems] = useState(defaultItems);
	const [activeId, setActiveId] = useState(null);
	const [overId, setOverId] = useState(null);
	const [offsetLeft, setOffsetLeft] = useState(0);
	const [currentPosition, setCurrentPosition] = useState(null);

	const flattenedItems = useMemo(() => {
		const flattenedTree = flattenTree(items);
		const collapsedItems = flattenedTree.reduce(
			(acc, { children, collapsed, id }) =>
				collapsed && children.length ? [...acc, id] : acc,
			[]
		);

		return removeChildrenOf(
			flattenedTree,
			activeId ? [activeId, ...collapsedItems] : collapsedItems
		);
	}, [activeId, items]);

	const insertItem = (newItem) => {
		setItems((items) => {
			const newItems = addItem(items, newItem);
			return newItems;
		});
	};

	useEffect(() => {
		if(newItems != null){
			setItems(newItems);
		}
	}, [newItems]);
	
	useEffect(() => {
		setAddItemsFunction(() => insertItem);
		setEditItemPropertyFunction(
			() => (id, property, newValue) =>
				setItems((items) =>
					setProperty(items, id, property, () => newValue)
				)
		);
	}, []);

	const projected =
		activeId && overId
			? getProjection(
					flattenedItems,
					activeId,
					overId,
					offsetLeft,
					indentationWidth
			  )
			: null;
	const sensorContext = useRef({
		items: flattenedItems,
		offset: offsetLeft,
	});
	const [coordinateGetter] = useState(() =>
		sortableTreeKeyboardCoordinates(
			sensorContext,
			indicator,
			indentationWidth
		)
	);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter,
		})
	);

	const sortedIds = useMemo(
		() => flattenedItems.map(({ id }) => id),
		[flattenedItems]
	);
	const activeItem = activeId
		? flattenedItems.find(({ id }) => id === activeId)
		: null;

	useEffect(() => {
		sensorContext.current = {
			items: flattenedItems,
			offset: offsetLeft,
		};
		setItemsOutput(flattenedItems);
	}, [flattenedItems, offsetLeft]);

	const announcements = {
		onDragStart({ active }) {
			return `Picked up ${active.id}.`;
		},
		onDragMove({ active, over }) {
			return getMovementAnnouncement("onDragMove", active.id, over?.id);
		},
		onDragOver({ active, over }) {
			return getMovementAnnouncement("onDragOver", active.id, over?.id);
		},
		onDragEnd({ active, over }) {
			return getMovementAnnouncement("onDragEnd", active.id, over?.id);
		},
		onDragCancel({ active }) {
			return `Moving was cancelled. ${active.id} was dropped in its original position.`;
		},
	};
	return (
		<DndContext
			accessibility={{ announcements }}
			sensors={sensors}
			collisionDetection={closestCenter}
			measuring={measuring}
			onDragStart={handleDragStart}
			onDragMove={handleDragMove}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
		>
			<SortableContext
				items={sortedIds}
				strategy={verticalListSortingStrategy}
			>
				{flattenedItems.map(
					(
						{
							id,
							label,
							children,
							collapsed,
							depth,
							canDrag = true,
							canDelete = true,
							canDuplicate = true,
						},
						index
					) => (
						<SortableTreeItem
							key={id}
							id={id}
							value={label}
							depth={
								id === activeId && projected
									? projected.depth
									: depth
							}
							canDrag={canDrag}
							canDelete={canDelete}
							canDuplicate={canDuplicate}
							indentationWidth={indentationWidth}
							indicator={indicator}
							isGroup={children.length > 0}
							lastGroupChild={
								flattenedItems[index + 1]
									? (id === activeId && projected
											? projected.depth
											: depth) >
									  (flattenedItems[index + 1].id ===
											activeId &&
									  flattenedItems[index + 1].projected
											? projected.depth
											: flattenedItems[index + 1].depth)
									: true
							}
							collapsed={Boolean(collapsed && children.length)}
							onCollapse={
								collapsible && children.length
									? () => handleCollapse(id)
									: undefined
							}
							onRemove={
								removable ? () => handleRemove(id) : undefined
							}
							onItemClick={() =>
								onItemClick(flattenedItems[index])
							}
							duplicateItem={() => {
								insertItem({ ...flattenedItems[index], id: uuid(), label: flattenedItems[index].label + " Copy"})
							}}
						/>
					)
				)}
				{createPortal(
					<DragOverlay
						dropAnimation={dropAnimationConfig}
						modifiers={indicator ? [adjustTranslate] : undefined}
					>
						{activeId && activeItem ? (
							<SortableTreeItem
								id={activeId}
								depth={activeItem.depth}
								clone
								childCount={getChildCount(items, activeId) + 1}
								value={activeItem.label}
								indentationWidth={indentationWidth}
							/>
						) : null}
					</DragOverlay>,
					document.body
				)}
			</SortableContext>
		</DndContext>
	);

	function handleDragStart({ active: { id: activeId } }) {
		setActiveId(activeId);
		setOverId(activeId);

		const activeItem = flattenedItems.find(({ id }) => id === activeId);

		if (activeItem) {
			setCurrentPosition({
				parentId: activeItem.parentId,
				overId: activeId,
			});
		}

		document.body.style.setProperty("cursor", "grabbing");
	}

	function handleDragMove({ delta }) {
		setOffsetLeft(delta.x);
	}

	function handleDragOver({ over }) {
		setOverId(over?.id ?? null);
	}

	function handleDragEnd({ active, over }) {
		resetState();
		if (projected && over) {
			const { depth, parentId } = projected;
			const clonedItems = JSON.parse(JSON.stringify(flattenTree(items)));
			const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
			const activeIndex = clonedItems.findIndex(
				({ id }) => id === active.id
			);
			const activeTreeItem = clonedItems[activeIndex];

			clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

			const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
			const newItems = buildTree(sortedItems);

			setItems(newItems);
		}
	}

	function handleDragCancel() {
		resetState();
	}

	function resetState() {
		setOverId(null);
		setActiveId(null);
		setOffsetLeft(0);
		setCurrentPosition(null);

		document.body.style.setProperty("cursor", "");
	}

	function handleRemove(id) {
		setItems((items) => removeItem(items, id));
		onItemRemove(id);
	}

	function handleCollapse(id) {
		setItems((items) => {
			return setProperty(items, id, "collapsed", (value) => {
				return !value;
			});
		});
	}

	function getMovementAnnouncement(eventName, activeId, overId) {
		if (overId && projected) {
			if (eventName !== "onDragEnd") {
				if (
					currentPosition &&
					projected.parentId === currentPosition.parentId &&
					overId === currentPosition.overId
				) {
					return;
				} else {
					setCurrentPosition({
						parentId: projected.parentId,
						overId,
					});
				}
			}

			const clonedItems = JSON.parse(JSON.stringify(flattenTree(items)));
			const overIndex = clonedItems.findIndex(({ id }) => id === overId);
			const activeIndex = clonedItems.findIndex(
				({ id }) => id === activeId
			);
			const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

			const previousItem = sortedItems[overIndex - 1];

			let announcement;
			const movedVerb = eventName === "onDragEnd" ? "dropped" : "moved";
			const nestedVerb = eventName === "onDragEnd" ? "dropped" : "nested";

			if (!previousItem) {
				const nextItem = sortedItems[overIndex + 1];
				announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`;
			} else {
				if (projected.depth > previousItem.depth) {
					announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
				} else {
					let previousSibling = previousItem;
					while (
						previousSibling &&
						projected.depth < previousSibling.depth
					) {
						const parentId = previousSibling.parentId;
						previousSibling = sortedItems.find(
							({ id }) => id === parentId
						);
					}

					if (previousSibling) {
						announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
					}
				}
			}

			return announcement;
		}

		return;
	}
}

const adjustTranslate = ({ transform }) => {
	return {
		...transform,
		y: transform.y - 25,
	};
};
