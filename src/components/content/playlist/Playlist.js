import React, {useLayoutEffect, useState} from 'react';
import useMenu from "../../../hooks/useContextMenu";
import PlaylistCover from "./PlaylistCover";
import PlaylistButtonPlay from "./PlaylistButtonPlay";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistDescription from "./PlaylistDescription";
import PlaylistContextMenu from "../contextMenu/PlaylistContextMenu";
import useEvent from "../../../hooks/useEvent";

const Playlist = ({classes, coverUrl, title, description, toggleScrolling, showToast, openModal}) => {

	const [menuItems, setMenuItems] = useState(generateMenuItems)
	const menu = useMenu(menuItems);

	useLayoutEffect(() => toggleScrolling(!menu.isOpen))

	function generateMenuItems(isAlternate = false) {
		return [
			{
				label: 'Add to Your Library',
				action: () => {
					menu.close();
					document.querySelector('nav a:nth-child(4)').click();
				}
			},
			{
				label: 'Share',
				submenu: [
					{
						label: isAlternate ? 'Copy Spotify URI' : 'Copy link to playlist',
						classes: 'min-w-[150px]',
						action: () => {
							navigator.clipboard.writeText(title).then(() => {
								menu.close();
								showToast('Link copied to clipboard');
							})
						},
					},
					{
						label: 'Embed playlist'
					},
				]
			},
			{
				label: 'About recommendations',
				action: () => {
					menu.close();
					openModal();
				},
			},
			{
				label: 'Open in Desktop app'
			},
		]
	}

	useEvent('keydown', handleAltKeydown, () => menu?.isOpen)
	useEvent('keyup', handleAltKeyup, () => menu?.isOpen)

	function handleAltKeydown({key}) {
		if (key === 'Alt') setMenuItems(generateMenuItems(true));
	}

	function handleAltKeyup({key}) {
		if (key === 'Alt') setMenuItems(generateMenuItems());
	}

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