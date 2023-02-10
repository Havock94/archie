import { ChevronRightRounded, HtmlRounded } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import classNames from 'classnames';
import LZString from 'lz-string';
import React, { useEffect, useState } from 'react';
import Emoji from '../emoji';
import AnacletoLogo from './exporters/anacleto/anacletoLogo';
import { AnacletoExporter, HTMLExporter } from './exporters/exporters';
import { LayoutGroup, motion } from 'framer-motion';

const Export = ({ urlParams }) => {
	const [exportData, setExportData] = useState({});
	const [selectedExporter, setSelectedExporter] = useState('');
	const [hoverExporter, setHoverExporter] = useState('');

	//Get exportData from parameter
	useEffect(() => {
		if (urlParams.exportData) {
			try {
				const _data = JSON.parse(LZString.decompressFromEncodedURIComponent(urlParams.exportData));
				setExportData(_data);
			} catch (e) {
				setExportData(null);
			}
		} else {
			setExportData(null);
		}
	}, [urlParams]);

	const exporters = {
		anacleto: {
			name: 'Anacleto Builder',
			logo: (
				<AnacletoLogo
					className={classNames(selectedExporter === 'anacleto' ? 'w-1/2' : 'w-1/3')}
					color={selectedExporter === 'anacleto' || hoverExporter === 'anacleto' ? 'white' : '#27272A'}
				/>
			),
			component: <AnacletoExporter exportData={exportData} />,
		},
		html: {
			name: 'HTML + TailwindCSS',
			logo: <HtmlRounded className={classNames(selectedExporter === 'html' ? 'text-6xl' : 'text-5xl')} />,
			component: <HTMLExporter exportData={exportData} />,
		},
	};
	return (
		<>
			{exportData === null && <NoDataErrorComponent />}
			{exportData && Object.keys(exportData).length && (
				<div className="flex flex-col h-full w-full justify-between gap-12">
					<Typography variant="h6">
						Select the export target
					</Typography>
					<div className="flex flex-row gap-6 flex-wrap">
						<LayoutGroup>
							{Object.keys(exporters).map((key) => (
								<Button
									component={motion.div}
									key={key}
									className={classNames(
										selectedExporter === key
											? '!bg-blue-500 !text-white'
											: 'text-zinc-800 hover:bg-blue-300 hover:!text-white',
										'group w-1/4 md:w-1/12 h-28 p-3 rounded-md overflow-hidden'
									)}
									onMouseEnter={() => setHoverExporter(key)}
									onMouseLeave={() => setHoverExporter('')}
									onClick={() => setSelectedExporter(key)}>
									<motion.div layout className="flex flex-col justify-between gap-4 items-center text-xs font-medium">
										{exporters[key].logo}
										<span className={classNames({ 'font-bold': selectedExporter === key }, 'text-center')}>
											{exporters[key].name}
										</span>
									</motion.div>
								</Button>
							))}
						</LayoutGroup>
					</div>
					<div className="h-[50vh] grow py-6">{exporters[selectedExporter]?.component}</div>
				</div>
			)}
		</>
	);
};

const NoDataErrorComponent = () => {
	return (
		<div className="flex flex-col gap-6">
			<Typography variant="h2" className="font-bold tracking-tight text-zinc-800">
				<span className="text-pink-600">Ooops!</span> This is embarassing <Emoji emoji="🙈" />
			</Typography>
			<Typography className="text-zinc-800 font-bold">
				It looks like the URL you used doesn't contain a valid layout. <br />I cannot export anything, but I can
				give you a cookie if it makes you feel better. <Emoji emoji="🍪" className="text-3xl" />
			</Typography>
		</div>
	);
};
export default Export;
