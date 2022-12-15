import {debounce, MIN_DESKTOP_WIDTH} from "../utils/utils";
import {useEffect, useRef, useState} from "react";

function isCurrentWindowWidthSmall() {
	return window.innerWidth < MIN_DESKTOP_WIDTH;
}

function isCurrentWindowWidthBig() {
	return window.innerWidth >= MIN_DESKTOP_WIDTH;
}

function usePopoverPosition(ref, screenChangeCallBack) {

	const [isSmallScreen, setIsSmallScreen] = useState(isCurrentWindowWidthSmall);
	const [target, setTarget] = useState('');
	const changeWidthTimer = useRef();

	useEffect(() => {
		function handleResize() {
			if (!screenHasBecameSmall() && !screenHasBecameBig()) return;
			screenChangeCallBack();
			clearTimeout(changeWidthTimer.current);
			changeWidthTimer.current = setTimeout(
				() => setIsSmallScreen(isCurrentWindowWidthSmall),
				300
			)

		}

		const debounceResize = debounce.bind(null, handleResize, 300);

		window.addEventListener('resize', debounceResize)

		return () => window.removeEventListener('resize', debounceResize)

	})

	const move = (target, offset) => {

		offset = offset || calculateTargetOffset(target)

		ref.current.style.top = `${offset.top}px`;
		ref.current.style.left = `${offset.left}px`;

		setTarget(target);
	}

	const calculateTargetOffset = (target) => {
		const {top, left, right, height} = target.getBoundingClientRect();
		return {
			top: isSmallScreen ? top + height * 2 : top - height * 0.66,
			left: isSmallScreen ? left : right + 30
		}
	}

	const screenHasBecameSmall = () => {
		return isCurrentWindowWidthSmall() && !isSmallScreen;
	}

	const screenHasBecameBig = () => {
		return isCurrentWindowWidthBig() && isSmallScreen;
	}

	return {
		move,
		target,
		setTarget,
		isSmallScreen
	};
}

export default usePopoverPosition;