import React, {useEffect, useLayoutEffect, useState} from 'react';
import PlaylistCover from "./PlaylistCover";
import PlaylistButtonPlay from "./PlaylistButtonPlay";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistDescription from "./PlaylistDescription";
import PlaylistContextMenu from "../contextMenu/PlaylistContextMenu";
import useMenu from "../../../hooks/useContextMenu";

function generateMenuItems(isAlternate = false) {
	return [
		{
			label: 'Add to Your Library'
		},
		{
			label: 'Share',
			submenu: [
				{
					label: isAlternate ? 'Copy Spotify URI' : 'Copy link to playlist',
					classes: 'min-w-[150px]',
				},
				{
					label: 'Embed playlist'
				},
			]
		},
		{
			label: 'About recommendations'
		},
		{
			label: 'Open in Desktop app'
		},
	]
}

const Playlist = ({classes, coverUrl, title, description, toggleScrolling}) => {

	const [menuItems, setMenuItems] = useState(generateMenuItems)
	const menu = useMenu(menuItems);

	useLayoutEffect(() => toggleScrolling(!menu.isOpen))

	useEffect(() => {
		if (!menu.isOpen) return;

		function handleAltKeyDown({key}) {
			if (key === 'Alt') setMenuItems(generateMenuItems(true));
		}

		function handleAltKeyUp({key}) {
			if (key === 'Alt') setMenuItems(generateMenuItems());
		}

		document.addEventListener('keydown', handleAltKeyDown);
		document.addEventListener('keyup', handleAltKeyUp);

		return () => {
			document.removeEventListener('keydown', handleAltKeyDown);
			document.removeEventListener('keyup', handleAltKeyUp);
		}
	})

	const bgClasses = menu.isOpen
		? 'bg-[#272727]'
		: 'bg-[#181818] hover:bg-[#272727]';

	return (
		<a
			href="/User files/React_lessons/react_spotify/public"
			className={`relative p-4 rounded-md  duration-200 group ${bgClasses} ${classes}`}
			onContextMenu={menu.open}
			onClick={(e) => e.preventDefault()}
		>
			<div className="relative">
				<PlaylistCover url={coverUrl}/>
				<PlaylistButtonPlay/>
			</div>
			<PlaylistTitle title={title}/>
			<PlaylistDescription description={description}/>
			{menu.isOpen && <PlaylistContextMenu
				ref={menu.ref}
				menuItems={menu.items}
				classes="fixed divide-divide-[#3e3e3e]"
			/>}
		</a>
	);
};

export default Playlist;