import React from 'react';
import PlaylistCover from "./PlaylistCover";
import PlaylistButtonPlay from "./PlaylistButtonPlay";
import PlaylistTitle from "./PlaylistTitle";
import PlaylistDescription from "./PlaylistDescription";
import PlaylistContextMenu from "../contextMenu/PlaylistContextMenu";

const Playlist = () => {

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

	return (
		<a href="/User files/React_lessons/react_spotify/public"
		   className="relative p-4 rounded-md bg-[#181818] hover:bg-[#272727] duration-200 group"
		>
			<div className="relative">
				<PlaylistCover/>
				<PlaylistButtonPlay/>
			</div>
			<PlaylistTitle>
				Playlist title
			</PlaylistTitle>
			<PlaylistDescription>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, odit.
			</PlaylistDescription>
			<PlaylistContextMenu
				menuItems={menuItems}
				classes={"absolute top-9 left-9 bg-[#282828] text-[#eaeaea] text-sm divide-divide-[#3e3e3e] p-1 rounded shadow-xl cursor-default whitespace-nowrap z-10 hidden group-hover:block"}
			/>
		</a>
	);
};

export default Playlist;