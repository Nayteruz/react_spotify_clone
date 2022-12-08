import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import BaseButton from "./BaseButton";

const BasePopover = (_, ref) => {

	const HIDDEN_CLASSES = 'opacity-0 translate-x-1 pointer-events-none';
	const [classes, setClasses] = useState(HIDDEN_CLASSES);
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const nodeRef = useRef();

	const show = (title, description, target) => {
		moveTo(target);
		setTitle(title);
		setDesc(description);
		setClasses('');
	}

	const hide = () => {
		setClasses(HIDDEN_CLASSES);
	}

	const moveTo = (target) => {
		//nodeRef
		console.dir(target);
		const {top, right, height} = target.getBoundingClientRect();
		nodeRef.current.style.left = `${right}px`;
		nodeRef.current.style.top = `${top}px`;
	}

	useEffect(() => {

		function handleClickAway({target}) {
			if (!nodeRef.current?.contains(target)) hide();
		}
		document.addEventListener('mousedown', handleClickAway)

		return () => document.removeEventListener('mousedown', handleClickAway)

	})

	useImperativeHandle(ref, () => ({ show }));


	return (
		<div ref={nodeRef}
		     className={`fixed z-30 bg-[#0e72ea] text-white tracking-wide rounded-lg shadow-3xl p-4 w-[330px] select-none transition duration-300 ${classes}`}>
			<h3 className="text-lg font-bold mb-2">{title}</h3>
			<p className="text-xs">{desc}</p>
			<div className="mt-6 text-right">
				<BaseButton extraClasses="text-white" onClick={hide}>Not now</BaseButton>
				<BaseButton extraClasses="bg-white text-[#2e2e2e]">Log in</BaseButton>
			</div>
			<div
				className="w-10 h-20 absolute -top-4 -left-10 flex items-center justify-end overflow-hidden pointer-events-none">
				<div className="w-3 h-3 bg-[#0e72ea]  shadow-3xl translate-x-1/2 rotate-45 pointer-events-auto"></div>
			</div>
		</div>
	);
};

export default forwardRef(BasePopover);