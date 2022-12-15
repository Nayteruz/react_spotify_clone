import {useEffect, useRef, useState} from "react";
import usePosition from "./useContextMenuPosition";
import useClickAway from "./useClickAway";

function useContextMenu(items) {
	const ref = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const move = usePosition(ref, isOpen);

	useClickAway(ref, close, () => isOpen);

	useEffect(() => {
		if (!isOpen) return;

		function handleClickAway({target}) {
			if (!ref.current.contains(target)) close();
		}

		function handleEsc({key}) {
			if (key === 'Escape') close();
		}

		document.addEventListener('mousedown', handleClickAway)
		document.addEventListener('keydown', handleEsc)
		return () => {
			document.removeEventListener('mousedown', handleClickAway)
			document.removeEventListener('keydown', handleEsc)
		}
	})

	function open(e){
		e.preventDefault();
		move(e.clientX, e.clientY);
		setIsOpen(true);
	}

	function close() {
		setIsOpen(false)
	}

	return {
		open,
		close,
		isOpen,
		ref,
		items
	}
}

export default useContextMenu;