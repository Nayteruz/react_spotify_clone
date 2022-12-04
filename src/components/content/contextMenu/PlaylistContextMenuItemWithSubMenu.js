import React, {useEffect, useRef, useState} from 'react';
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import PlaylistContextMenu from "./PlaylistContextMenu";

const PlaylistContextMenuItemWithSubMenu = ({
	                                            children: label,
	                                            submenu,
	                                            onMouseEnter: closePreviousSubMenuIfOpen
                                            }) => {

	const closeTimer = useRef(null);
	const [menuState, setMenuState] = useState({
		isOpen: false,
		positionClasses: ''
	});
	const menuItemRef = useRef(null);
	const bgClass = menuState.isOpen ? 'bg-[#3e3e3e]' : 'hover:bg-[#3e3e3e]';

	const getMenuPositionXClass = () => {
		const windowWidth = window.innerWidth;
		const menuItem = menuItemRef.current;
		const menuItemWidth = menuItem.offsetWidth;
		const menuItemRightX = menuItem.getBoundingClientRect().right;
		const shouldMoveLeft = menuItemWidth > windowWidth - menuItemRightX;
		return shouldMoveLeft ? 'right-full' : 'left-full';
	}
	const getMenuPositionYClass = () => {
		const windowHeight = window.innerHeight;
		const menuItem = menuItemRef.current;
		const menuItemHeight = menuItem.offsetHeight * submenu.length;
		const menuItemCordY = menuItem.getBoundingClientRect().bottom;
		const shouldMoveUp = menuItemHeight > windowHeight - menuItemCordY;
		return shouldMoveUp ? 'bottom-0' : 'top-0';
	}

	const getMenuPositionClasses = () => {
		return `${getMenuPositionXClass()} ${getMenuPositionYClass()}`
	}

	const openMenu = () => {
		closePreviousSubMenuIfOpen(startCloseMenuTimer)
		setMenuState({
			isOpen: true,
			positionClasses: getMenuPositionClasses()
		})
	}

	const closeMenu = () => {
		setMenuState({
			isOpen: false,
			positionClasses: ''
		})
	}
	const startCloseMenuTimer = () => {
		closeTimer.current = setTimeout(closeMenu, 100)
	}

	const stopCloseMenuTimer = () => {
		clearTimeout(closeTimer.current);
	}

	useEffect(() => stopCloseMenuTimer());

	return (
		<li
			className='relative'
			onMouseEnter={openMenu}
			ref={menuItemRef}
		>
			<button
				className={`w-full p-3 text-left hover:text-white cursor-default flex justify-between items-center ${bgClass}`}>
				{label} <ChevronRightIcon className="h-4 w-4"/>
			</button>
			{menuState.isOpen && <PlaylistContextMenu
				classes={`absolute ${menuState.positionClasses}`}
				menuItems={submenu}/>}
		</li>
	)

};

export default PlaylistContextMenuItemWithSubMenu;