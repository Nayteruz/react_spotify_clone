import React, {useRef, useState, useLayoutEffect, useEffect} from 'react';
import PlaylistCover from "./PlaylistCover";
import PlaylistButtonPlay from "./PlaylistButtonPlay";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistDescription from "./PlaylistDescription";
import PlaylistContextMenu from "../contextMenu/PlaylistContextMenu";

const clickPosition = {x: null, y: null};
const menuItems = [
	{
		label: 'Add to Your Library'
	},
	{
		label: 'Share',
		submenu: [
			{label: 'Copy link to playlist'},
			{label: 'Embed playlist'},
		]
	},
	{
		label: 'About recommendations'
	},
	{
		label: 'Open in Desktop app'
	},
]

const Playlist = ({classes, coverUrl, title, description, toggleScrolling}) => {

	const contextMenuRef = useRef(null);
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const openContextMenu = (e) => {
		e.preventDefault();

		clickPosition.x = e.clientX;
		clickPosition.y = e.clientY;

		setIsContextMenuOpen(true);
	}
	const closeContextMenu = () => {
		setIsContextMenuOpen(false)
	}
	const bgClasses = isContextMenuOpen ? 'bg-[#272727]' : 'bg-[#181818] hover:bg-[#272727]';

	const updateContextMenuVerticalPosition = () => {
		const menuHeight = contextMenuRef.current.offsetHeight;
		let shouldMoveUp = menuHeight > window.innerHeight - clickPosition.y;

		contextMenuRef.current.style.top = shouldMoveUp
			? `${clickPosition.y - menuHeight}px`
			: `${clickPosition.y}px`
	}
	const updateContextMenuHorizontalPosition = () => {
		const menuWidth = contextMenuRef.current.offsetWidth;
		let shouldMoveLeft = menuWidth > window.innerWidth - clickPosition.x;

		contextMenuRef.current.style.left = shouldMoveLeft
			? `${clickPosition.x - menuWidth}px`
			: `${clickPosition.x}px`
	}


	const updateContextMenuPosition = () => {
		updateContextMenuVerticalPosition()
		updateContextMenuHorizontalPosition()
	}

	useLayoutEffect(() => {
		toggleScrolling(!isContextMenuOpen)
		if (isContextMenuOpen) {
			updateContextMenuPosition()
		}
	})

	useEffect(() => {
		if (!isContextMenuOpen) return;

		function handleClickAway(e) {
			if (!contextMenuRef.current.contains(e.target)) {
				closeContextMenu();
			}
		}

		function handleEsc(e) {
			if (e.keyCode === 27) {
				closeContextMenu();
			}
		}

		document.addEventListener('mousedown', handleClickAway)
		document.addEventListener('keydown', handleEsc)
		return () => {
			document.removeEventListener('mousedown', handleClickAway)
			document.removeEventListener('keydown', handleEsc)
		}
	})

	return (<a
		href="/User files/React_lessons/react_spotify/public"
		className={`relative p-4 rounded-md  duration-200 group ${bgClasses} ${classes}`}
		onContextMenu={openContextMenu}
		onClick={(e) => e.preventDefault()}
	>
		<div className="relative">
			<PlaylistCover url={coverUrl}/>
			<PlaylistButtonPlay/>
		</div>
		<PlaylistTitle title={title}/>
		<PlaylistDescription description={description}/>
		{isContextMenuOpen && <PlaylistContextMenu
			ref={contextMenuRef}
			menuItems={menuItems}
			classes={`fixed bg-[#282828] text-[#eaeaea] text-sm divide-divide-[#3e3e3e] p-1 rounded shadow-xl cursor-default whitespace-nowrap z-10`}
		/>}
	</a>);
};

export default Playlist;