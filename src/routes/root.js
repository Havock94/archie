import { Fragment, React, useEffect, useState } from "react";
import classNames from "classnames";
import Logo from "../components/logo";
import { Link, useLoaderData } from "react-router-dom";
import { IconButton, Slide } from "@mui/material";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";

export default function Root({ component, leftComponent, rightComponent, toolbar = Fragment }) {
	const urlParams = useLoaderData();	//Get URL Params from the loader function
	const OutletComponent = component;
	const LeftComponent = leftComponent;
	const RightComponent = rightComponent;
	const ToolbarComponent = toolbar;
	const [maximizeLeft, setMaximizeLeft] = useState(false);
	const [maximizeRight, setMaximizeRight] = useState(false);
	const [sharedContext, setSharedContext] = useState({});
	
	useEffect(() => {
		document.documentElement.classList.add("h-screen");
		document.body.classList.add("h-screen", "bg-zinc-100");
	}, []);
	return (
		<div className="min-h-full">
			<nav className="bg-blue-500 pb-24">
				<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
					<div className="relative flex items-center justify-center py-5">
						{/* Logo */}
						<div className="flex-shrink lg:static">
							<Link to="/">
								<Logo variant="initial" theme="light" />
							</Link>
						</div>
					</div>
				</div>
				<header className="flex flex-row items-center justify-between px-6 lg:px-16">
					<ToolbarComponent />
				</header>
			</nav>
			<main className="flex flex-row items-start justify-around -mt-24 pb-8">
				<div className="max-w-3xl lg:max-w-full grow px-6">
					<div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
						<Slide
							direction="right"
							in={!maximizeRight}
							mountOnEnter
							unmountOnExit
						>
							<div
								className={classNames(
									{
										"!col-span-4": maximizeLeft || OutletComponent,
									},
									"grid col-span-2 grid-cols-1 gap-4"
								)}
							>
								<section aria-labelledby="section-1-title">
									<div className="relative overflow-hidden rounded-lg bg-white shadow">
										<IconButton
											className={classNames({ hidden: OutletComponent }, "absolute top-3 right-3 z-10")}
											onClick={() =>
												setMaximizeLeft((prev) => !prev)
											}
										>
											{!maximizeLeft && (
												<FullscreenRoundedIcon />
											)}
											{maximizeLeft && (
												<FullscreenExitRoundedIcon />
											)}
										</IconButton>
										<div className="relative flex items-stretch p-6 min-h-[75vh]">
											{ OutletComponent && <OutletComponent urlParams={ urlParams } /> }
											{ !OutletComponent && LeftComponent && <LeftComponent urlParams={ urlParams } sharedContext={sharedContext} setSharedContext={setSharedContext} /> }
										</div>
									</div>
								</section>
							</div>
						</Slide>
						<Slide
							direction="left"
							in={!maximizeLeft}
							mountOnEnter
							unmountOnExit
						>
							<div
								className={classNames(
									OutletComponent ? "hidden" : "grid col-span-2 grid-cols-1 gap-4",
									{ "!col-span-4": maximizeRight }
								)}
							>
								<section aria-labelledby="section-2-title">
									<div className="relative overflow-hidden rounded-lg bg-white shadow">
										<IconButton
											className="absolute top-3 right-3 z-[9999]"
											onClick={() =>
												setMaximizeRight(
													(prev) => !prev
												)
											}
										>
											{!maximizeRight && (
												<FullscreenRoundedIcon />
											)}
											{maximizeRight && (
												<FullscreenExitRoundedIcon />
											)}
										</IconButton>
										<div className="relative flex items-stretch p-6 min-h-[75vh]">
											{RightComponent && (
												<RightComponent urlParams={ urlParams } sharedContext={sharedContext} setSharedContext={setSharedContext} />
											)}
										</div>
									</div>
								</section>
							</div>
						</Slide>
					</div>
				</div>
			</main>
			<footer>
				<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
					<div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
						<span className="block sm:inline">
							&copy; 2023 Archie
						</span>{" "}
						<span className="block sm:inline">
							All rights reserved.
						</span>
					</div>
				</div>
			</footer>
		</div>
	);
}
