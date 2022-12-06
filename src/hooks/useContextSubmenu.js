import {useEffect, useRef, useState} from "react";

function useContextSubmenu(items, closePreviousIfOpen, ref) {

	const closeTimer = useRef(null);
	const [state, setState] = useState({
		isOpen: false,
		positionClasses: ''
	});

	const open = () => {
		closePreviousIfOpen(startCloseTimer)
		setState({
			isOpen: true,
			positionClasses: getMenuPositionClasses()
		})
	}

	const close = () => {
		setState({
			isOpen: false,
			positionClasses: ''
		})
	}
	const startCloseTimer = () => {
		closeTimer.current = setTimeout(close, 100)
	}

	const stopCloseTimer = () => {
		clearTimeout(closeTimer.current);
	}

	useEffect(() => stopCloseTimer());

	const getMenuPositionClasses = () => {
		return `${getPositionXClass()} ${getPositionYClass()}`
	}

	const getPositionXClass = () => {
		const windowWidth = window.innerWidth;
		const item = ref.current;
		const itemWidth = item.offsetWidth;
		const itemRightX = item.getBoundingClientRect().right;
		const shouldMoveLeft = itemWidth > windowWidth - itemRightX;
		return shouldMoveLeft ? 'right-full' : 'left-full';
	}
	const getPositionYClass = () => {
		const windowHeight = window.innerHeight;
		const item = ref.current;
		const itemHeight = item.offsetHeight * items.length;
		const itemCordY = item.getBoundingClientRect().bottom;
		const shouldMoveUp = itemHeight > windowHeight - itemCordY;
		return shouldMoveUp ? 'bottom-0' : 'top-0';
	}

	return {
		open,
		items,
		...state
	}
}

export default useContextSubmenu;