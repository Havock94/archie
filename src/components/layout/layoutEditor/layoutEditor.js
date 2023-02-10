import { ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ContainerEditor from './containerEditor';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import TextField from '../../textfield';
import SelfEditor from './selfEditor';
import { useDispatch, useSelector } from 'react-redux';
import { LAYOUT_DEFAULT_CLASSES, selectLayoutItems, selectLayoutItemsData, setLayoutItemData } from '../../../reducers/layout';
import classNames from 'classnames';
import { findItemDeep } from '../layoutTree/utilities';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

const LayoutEditor = ({ drawerData, setComponentLabel, setDrawerOpen, ...props }) => {
	const dispatch = useDispatch();
	const layoutItems = useSelector(selectLayoutItems);
	const getLayoutItem = () => findItemDeep(layoutItems, drawerData.selectedItemId);
	const _data = useSelector(selectLayoutItemsData);
	const [layoutData, setLayoutData] = useState({});
	const [originalItemLabel, setOriginalItemLabel] = useState(getLayoutItem().label);
	const [componentLabel, _setComponentLabel] = useState('');
	const [isEditingName, setIsEditingName] = useState(false);
	const [expandedPanel, setExpandedPanel] = useState(0);

	const sections = [
		{
			label: 'Container Properties',
			component: <ContainerEditor itemId={drawerData.selectedItemId} layoutData={layoutData} {...props} />,
		},
		{
			label: 'Self Properties',
			component: <SelfEditor itemId={drawerData.selectedItemId} layoutData={layoutData} {...props} />,
		},
	];

	const handleComponentNameChange = (event) => {
		//Internal component name change (input change)
		_setComponentLabel(event.target.value);
	};

	const saveComponentName = () => {
		//Save clicked -> Send new component name to the tree
		if (originalItemLabel !== componentLabel) {
			setComponentLabel(drawerData.selectedItemId, componentLabel);
			setOriginalItemLabel(componentLabel);
		}
	};

	const rippleRef = useRef(null);
	const containerRef = useRef(null);
	const triggerRipple = () => {
		const container = containerRef.current;
		const rect = container.getBoundingClientRect();

		rippleRef.current.start(
			{
				clientX: rect.left + rect.width / 2,
				clientY: rect.top + rect.height / 2,
			},
			// when center is true, the ripple doesn't travel to the border of the container
			{ center: false }
		);

		setTimeout(() => rippleRef.current.stop({}), 320);
	};

	const _setLayoutData = () => {
		if(_data[drawerData.selectedItemId]){
			setLayoutData(_data[drawerData.selectedItemId]);
			setOriginalItemLabel(getLayoutItem().label);
			_setComponentLabel(getLayoutItem().label);
		}else{
			dispatch(setLayoutItemData({ id: drawerData.selectedItemId, data: LAYOUT_DEFAULT_CLASSES}));
		}
	}

	useEffect(() => {
		if(!isEditingName) triggerRipple();
	}, [componentLabel]);
	
	//On selectedItem change
	useEffect(() => {
		if (drawerData.selectedItemId) {
			//Update the local variables
			_setLayoutData();
		}
	}, [drawerData.selectedItemId]);

	useEffect(() => {
		_setLayoutData();
	}, [_data]);

	return (
		<>
			{/* Node name */}
			<div className={classNames('relative flex flex-row items-start gap-6 p-4 rounded-md w-fit', { 'mt-4': isEditingName })} ref={containerRef}>
				<IconButton
					onClick={() => {
						setDrawerOpen(false);
					}}>
					<CloseRoundedIcon />
				</IconButton>
				<TouchRipple
					classes={{ child: '!bg-blue-500' }}
					ref={rippleRef}
					center
				/>
				<div className="flex flex-row items-start">
					{!isEditingName && (
						<Typography variant="h6" className="mr-2 py-1" onClick={() => setIsEditingName(true)}>
							{originalItemLabel}
						</Typography>
					)}
					{isEditingName && (
						<TextField
							size="small"
							className="mr-2"
							label="Component Name"
							value={componentLabel}
							error={componentLabel.length === 0}
							helperText={componentLabel.length === 0 ? 'Name mandatory' : ''}
							onChange={handleComponentNameChange}
							inputRef={(input) => input && input.focus()}
							onKeyDown={e => e.keyCode === 13 ? (saveComponentName() || setIsEditingName(false)) : ''}
						/>
					)}
					{!isEditingName && (
						<div className='mt-1'>
							<IconButton onClick={() => setIsEditingName(true)}>
								<EditRoundedIcon className="w-4 h-4" />
							</IconButton>
						</div>
					)}
					{isEditingName && (
						<>
							<IconButton
								onClick={() => {
									if(componentLabel){
										saveComponentName();
										setIsEditingName(false);
									}
								}}>
								<CheckRoundedIcon className="text-green-500" />
							</IconButton>
							<IconButton
								onClick={() => {
									_setComponentLabel(originalItemLabel);
									setIsEditingName(false);
								}}>
								<ClearRoundedIcon />
							</IconButton>
						</>
					)}
				</div>
			</div>
			{sections.map((section, i) => (
				<Accordion
					className="shadow-none mt-0 unstyled"
					key={i}
					expanded={expandedPanel === i}
					onChange={() => setExpandedPanel(expandedPanel === i ? null : i)}>
					<AccordionSummary expandIcon={<ExpandMoreRounded />}>
						<Typography variant="button">{section.label}</Typography>
					</AccordionSummary>
					<AccordionDetails>{section.component}</AccordionDetails>
				</Accordion>
			))}
		</>
	);
};
export default LayoutEditor;
