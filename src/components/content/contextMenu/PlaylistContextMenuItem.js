import React, {useEffect, useRef, useState} from 'react';
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import PlaylistContextMenu from "./PlaylistContextMenu";

const PlaylistContextMenuItem = ({children: label, submenu}) => {

	let closeTimer = null;
	const [menuState, setMenuState] = useState({
		isOpen: false,
		positionClasses: ''
	});
	const menuItemRef = useRef(null);

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
		if (closeTimer) {
			stopCloseMenuTimer();
			return;
		}
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
		closeTimer = setTimeout(closeMenu, 100)
	}

	const stopCloseMenuTimer = () => {
		clearTimeout(closeTimer);
	}

	useEffect(() => stopCloseMenuTimer());

	if (submenu) {
		return (
			<li
				className='relative'
				onMouseEnter={openMenu}
				onMouseLeave={startCloseMenuTimer}
				ref={menuItemRef}
			>
				<button
					className={`w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default flex justify-between items-center ${menuState.isOpen ? 'text-white bg-[#1a1a1a]' : ''}`}>
					{label} <ChevronRightIcon className="h-4 w-4"/>
				</button>
				{menuState.isOpen && <PlaylistContextMenu
					classes={`bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default absolute ${menuState.positionClasses}`}
					menuItems={submenu}/>}
			</li>
		)
	}


	return (
		<li>
			<button
				className="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default">
				{label}
			</button>
		</li>
	);
};

export default PlaylistContextMenuItem;