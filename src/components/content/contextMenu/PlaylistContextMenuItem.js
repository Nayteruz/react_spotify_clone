import React from 'react';
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import PlaylistContextMenu from "./PlaylistContextMenu";

const PlaylistContextMenuItem = ({children: label, submenu}) => {

	return (
		<li className={submenu && 'relative'}>
			<button
				className={`w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default ${submenu ? 'flex justify-between items-center' : ''}`}>
				{label} {submenu && <ChevronRightIcon className="h-4 w-4"/>}
			</button>
			{submenu && <PlaylistContextMenu
				classes="absolute top-0 left-full bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default"
				menuItems={submenu}/>}
		</li>
	);
};

export default PlaylistContextMenuItem;