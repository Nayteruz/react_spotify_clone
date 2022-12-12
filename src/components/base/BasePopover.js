import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {debounce, MIN_DESKTOP_WIDTH} from "../../utils/utils";
import BaseButton from "./BaseButton";
import BasePopoverTriangle from "./BasePopoverTriangle";

function isCurrentWindowWidthSmall() {
	return window.innerWidth < MIN_DESKTOP_WIDTH;
}

function isCurrentWindowWidthBig() {
	return window.innerWidth >= MIN_DESKTOP_WIDTH;
}

const BasePopover = (_, ref) => {

	const [isSmallScreen, setIsSmallScreen] = useState(isCurrentWindowWidthSmall);
	const [classes, setClasses] = useState(getHiddenClasses);
	const [target, setTarget] = useState('');
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const nodeRef = useRef();
	const changeWidthTimer = useRef();

	const show = (title, description, nextTarget, offset) => {
		if (target === nextTarget) return;
		moveTo(offset ? offset : calculateTargetOffset(nextTarget));
		setTarget(nextTarget);
		setTitle(title);
		setDesc(description);
		setClasses('');
	}

	const hide = () => {
		setTarget(null);
		setClasses(getHiddenClasses);
	}

	const moveTo = ({top, left}) => {
		nodeRef.current.style.top = `${top}px`;
		nodeRef.current.style.left = `${left}px`;
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

	function getHiddenClasses() {
		const translateClass = isSmallScreen ? 'translate-y-1' : 'translate-x-1'
		return `opacity-0 ${translateClass} pointer-events-none`;
	}

	useEffect(() => {
		function handleResize() {
			if (!screenHasBecameSmall() && !screenHasBecameBig()) return;
			hide();
			clearTimeout(changeWidthTimer.current);
			changeWidthTimer.current = setTimeout(
				() => setIsSmallScreen(isCurrentWindowWidthSmall),
				300
			)

		}

		function handleClickAway(event) {
			if (target && target.parentNode.contains(event.target)) return;

			if (target && !nodeRef.current?.contains(event.target)) hide();
		}

		const debounceResize = debounce.bind(null, handleResize, 300);

		window.addEventListener('resize', debounceResize)
		document.addEventListener('mousedown', handleClickAway)

		return () => {
			window.removeEventListener('resize', debounceResize)
			document.removeEventListener('mousedown', handleClickAway)
		}

	})

	useImperativeHandle(ref, () => ({show}));

	return (
		<div ref={nodeRef}
		     className={`fixed z-30 bg-[#0e72ea] text-white tracking-wide rounded-lg shadow-3xl p-4 w-[330px] select-none transition duration-300 ${classes}`}>
			<h3 className="text-lg font-bold mb-2">{title}</h3>
			<p className="text-xs">{desc}</p>
			<div className="mt-6 text-right">
				<BaseButton extraClasses="text-white" onClick={hide}>Not now</BaseButton>
				<BaseButton extraClasses="bg-white text-[#2e2e2e]">Log in</BaseButton>
			</div>
			<BasePopoverTriangle side={isSmallScreen ? 'top' : 'left'}/>
		</div>
	);
};

export default forwardRef(BasePopover);