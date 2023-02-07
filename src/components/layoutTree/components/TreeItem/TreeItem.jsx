import React, { forwardRef } from 'react';
import classNames from 'classnames';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { Action, Handle, Remove } from './components';
import styles from './TreeItem.module.css';
import { IconButton, Typography } from '@mui/material';
import Button from '../../../button';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

export const TreeItem = forwardRef(
	(
		{
			childCount,
			clone,
			depth,
			disableSelection,
			disableInteraction,
			ghost,
			handleProps,
			indentationWidth,
			indicator,
			collapsed,
			onCollapse,
			onRemove,
			style,
			value,
			wrapperRef,
			isGroup,
			lastGroupChild,
			canDrag,
			canDelete,
			onItemClick,
			canDuplicate,
			duplicateItem,
			...props
		},
		ref
	) => {
		return (
			<li
				className={classNames(
					styles.Wrapper,
					depth === 0 && '!mt-2',
					lastGroupChild && '!mb-2',
					clone && 'select-none',
					ghost && 'opacity-50',
					indicator && styles.indicator,
					disableSelection && 'select-none',
					disableInteraction && 'pointer-events-none'
				)}
				ref={wrapperRef}
				style={{
					'--spacing': `${indentationWidth * depth}px`,
				}}
				{...props}>
				<div
					className={
						'relative flex items-center p-2.5 bg-white rounded-md border border-zinc-200 text-zinc-900 box-border'
					}
					ref={ref}
					style={style}>
					{canDrag && <Handle {...handleProps} />}
					{onCollapse && (
						<Action onClick={onCollapse}>
							<IconButton>
								<ExpandMoreRounded
									className={classNames('transition-transform', collapsed && '-rotate-90')}
								/>
							</IconButton>
						</Action>
					)}

					<Button
						variant="text"
						className="overflow-hidden text-ellipsis whitespace-nowrap !text-zinc-500 !capitalize"
						onClick={onItemClick}>
						{value}
					</Button>
					<div className="grow"></div>
					{canDuplicate && (
						<IconButton variant="text" className="!text-zinc-500" onClick={duplicateItem}>
							<ContentCopyRoundedIcon />
						</IconButton>
					)}
					{!clone && onRemove && canDelete && <Remove onClick={onRemove} />}
					{clone && childCount && childCount > 1 ? (
						<span
							className={
								'absolute flex items-center justify-center w-6 h-6 rounded-[50%] bg-blue-500 font-semibold	text-white text-sm -top-2.5 -right-2.5'
							}>
							{childCount}
						</span>
					) : null}
				</div>
			</li>
		);
	}
);
