import React from "react";
import Logo from "../components/logo";
import Button from "../components/button";
import { Typography } from "@mui/material";
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';

export default function Home(){
	return <div className="flex flex-col w-full items-center justify-evenly">
		<Typography variant="h2">Welcome to</Typography>
		<Logo size='large'/>
		<Button href="/layout" iconRight={ <ChevronRightRounded /> }>Start building</Button>
	</div>
}