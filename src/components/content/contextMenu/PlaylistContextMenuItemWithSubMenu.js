import React, {useRef} from 'react';
import useSubmenu from "../../../hooks/useContextSubmenu";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import PlaylistContextMenu from "./PlaylistContextMenu";

const PlaylistContextMenuItemWithSubMenu = ({
        children: label,
        submenuItems,
        onMouseEnter: closePreviousIfOpen
    }) => {
	const ref = useRef(null);
	const submenu = useSubmenu(submenuItems, closePreviousIfOpen, ref);

	const bgClass = submenu.isOpen ? 'bg-[#3e3e3e]' : 'hover:bg-[#3e3e3e]';

	return (
		<li
			className='relative'
			onMouseEnter={submenu.open}
			ref={ref}
		>
			<button
				className={`w-full p-3 text-left hover:text-white cursor-default flex justify-between items-center ${bgClass}`}>
				{label} <ChevronRightIcon className="h-4 w-4"/>
			</button>
			{submenu.isOpen && <PlaylistContextMenu
				classes={`absolute ${submenu.positionClasses}`}
				menuItems={submenu.items}/>}
		</li>
	)

};

export default PlaylistContextMenuItemWithSubMenu;