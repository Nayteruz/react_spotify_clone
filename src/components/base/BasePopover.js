import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import BaseButton from "./BaseButton";
import BasePopoverTriangle from "./BasePopoverTriangle";
import usePosition from "../../hooks/usePopoverPosition"
import useClickAway from "../../hooks/useClickAway";

const BasePopover = (_, ref) => {

	const nodeRef = useRef();
	const {move, target, setTarget, isSmallScreen} = usePosition(nodeRef, hide);
	const [classes, setClasses] = useState(getHiddenClasses);
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');

	useClickAway(nodeRef, hide, shouldHide);

	function shouldHide(event){
		return !target?.parentNode?.contains(event.target);
	}

	const show = (title, description, nextTarget, offset) => {
		if (target === nextTarget) return;
		move(nextTarget, offset);

		setTitle(title);
		setDesc(description);
		setClasses('');
	}

	function hide() {
		setTarget(null);
		setClasses(getHiddenClasses);
	}

	function getHiddenClasses() {
		const translateClass = isSmallScreen ? 'translate-y-1' : 'translate-x-1'
		return `opacity-0 ${translateClass} pointer-events-none`;
	}



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