import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Link, Typography } from '@mui/material';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import Button from '../../button';
import LZString from 'lz-string';
import { toast } from 'react-hot-toast';
import Scrollbars from 'react-custom-scrollbars';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import Emoji from '../../emoji';
import { selectLayoutItems, selectLayoutItemsData } from '../../../reducers/layout';
import { useSelector } from 'react-redux';
import { useReward } from 'react-rewards';
import { CloseRounded } from '@mui/icons-material';

const shareCongratsTitles = [
	<>Share this <span className="font-bold text-pink-500">awesome</span> layout! <Emoji emoji="🤩" /></>,
	<><span className="font-bold text-pink-500">OMG!</span> This is better than what I expected! <Emoji emoji="😱" /></>,
	<>You must have a degree in <span className="font-bold text-pink-500">UI!</span> <Emoji emoji="😎" /></>,
	<>You must have copied this, you can't be <span className="font-bold text-pink-500">that</span> good! <Emoji emoji="🤔" /></>,
	<>It took a lot, but this is <span className="font-bold text-pink-500">hot!</span> <Emoji emoji="🔥" /></>,
	<>I don't want to be the <span className="font-bold text-pink-500">developer</span> who has to write this! <Emoji emoji="🥵" /></>,
	<><span className="font-bold text-pink-500">Good job!</span> You can relax now <Emoji emoji="☕" /></>,
	<>Your app will <span className="font-bold text-pink-500">rock</span> for sure! <Emoji emoji="🚀" /></>,
	<>Look at that <span className="font-bold text-pink-500">responsiveness!</span> <Emoji emoji="😍" /></>,
	<><span className="font-bold text-pink-500">That's nice!</span> Did I really do that? <Emoji emoji="🙀" /></>,
	<>You deserve this, <span className="font-bold text-pink-500">high five!</span> <Emoji emoji="🖐🏼" /></>,
]

const ShareModal = ({ open, close }) => {
	const { reward } = useReward('share-reward', 'confetti', { elementCount: 150, lifetime: 500, spread: 120 });
	const layoutItems = useSelector(selectLayoutItems);
	const layoutItemsData = useSelector(selectLayoutItemsData);
	const location = window.location;
	const [congratsQuote, setCongratsQuote] = useState(null);
	const [shareLink, setShareLink] = useState('');

	useEffect(() => {
		setShareLink(
			`${location.protocol}//${location.host}/archie/layout/${LZString.compressToEncodedURIComponent(
				JSON.stringify({ items: layoutItems, data: layoutItemsData })
			)}`
		);
	}, [layoutItems, layoutItemsData]);

	useEffect(() => {
		if(open && !congratsQuote){
			setCongratsQuote(shareCongratsTitles[Math.floor(Math.random() * shareCongratsTitles.length)]);
			setTimeout(reward, 500);
		}else if(!open){
			setCongratsQuote(null);
		}
	}, [open]);

	return (
		<Dialog open={ open } onClose={close} maxWidth="lg">
			<DialogTitle className="flex flex-row justify-center py-12 px-18 lg:py-16 lg:px-28">
				<IconButton onClick={close} className='absolute top-4 right-4'>
					<CloseRounded />
				</IconButton>
				<div id="share-reward" className="absolute mx-auto"></div>
				<div className="text-3xl lg:text-5xl text-center">{ congratsQuote }</div>
			</DialogTitle>
			<DialogContent className="pb-16">
				<div className="flex flex-col w-2/3 mx-auto items-center gap-6 text-center">
					<Typography className="flex flex-col whitespace-normal lg:whitespace-nowrap">
						<span>Send this link to your colleagues to show them your amazing design skills,</span>
						<span>
							or save it so that you can edit the layout in the future.
						</span>
					</Typography>
					<Button
						onClick={() => {
							navigator.clipboard.writeText(shareLink);
							toast.success('Copied to clipboard');
						}}
						iconRight={<LinkRoundedIcon className="text-white" />}>
						Click here to copy
					</Button>
					or drag this bookmark to your browser Bookmark Bar
					<Link href={shareLink} className="no-underline">
						<Typography variant="button" className="flex flex-row justify-center text-pink-500 gap-2">
							My Archie Layout
							<BookmarkAddRoundedIcon />
						</Typography>
					</Link>
					or manually copy the link
					<div className="w-full h-36 p-4 rounded-md bg-zinc-100">
						<Scrollbars className="overflow-auto break-all whitespace-normal font-mono" autoHide>
							{shareLink}
						</Scrollbars>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default ShareModal;
