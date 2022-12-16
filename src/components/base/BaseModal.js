import React, {useEffect, useRef} from 'react';
import {XMarkIcon} from "@heroicons/react/24/outline";
import useEvent from "../../hooks/useEvent";

const BaseModal = ({onClose: handleClose, duration = 500}) => {

	const ref = useRef();
	const contentRef = useRef();

	useEffect(() => {
		setTimeout(animate)
	})

	useEvent('keydown', handleEsc);

	function handleEsc({key}) {
		if (key === 'Escape') close();
	}

	function close() {
		animate(true);
		setTimeout(handleClose, duration);
	}

	function animate(isClosing = false) {
		ref.current.classList.toggle('opacity-0', isClosing);
		contentRef.current.classList.toggle('-translate-y-10', isClosing);
	}


	return (
		<div
			className={`fixed inset-0 bg-black/70 z-30 flex justify-center items-center opacity-0 transition-opacity`}
			role="dialog"
			ref={ref}
			style={{transitionDuration: duration + 'ms'}}
			onClick={close}
		>
			<div
				className={`relative flex flex-col bg-[#333] text-white h-80 w-[480px] rounded-xl -translate-y-10 transition-transform`}
				ref={contentRef}
				style={{transitionDuration: duration + 'ms'}}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="absolute right-0 p-3 text-neutral-500 hover:text-neutral-200"
					onClick={close}
				>
					<XMarkIcon className="w-8 h-8"/>
				</button>
				<h1 className="text-3xl pt-8 pb-3 px-8 font-bold leading-relaxed border-b border-neutral-600 ">About
					recommendations</h1>
				<div className="py-6 px-8 overflow-y-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Animi corporis culpa deleniti, dolore ex facere ipsam modi molestiae necessitatibus, nostrum placeat
					quod reiciendis! Ab ad aliquid autem, cupiditate eligendi enim fugit harum impedit inventore maxime
					nesciunt pariatur placeat praesentium, quas quibusdam repellat, tempora? Consectetur consequatur
					delectus distinctio ex explicabo libero maxime nesciunt nisi nobis, pariatur repellendus
					reprehenderit voluptate voluptates? Adipisci, nisi, quos. Aperiam, blanditiis culpa cupiditate
					deleniti distinctio eos est laborum mollitia nobis nostrum odio omnis, quam quibusdam ratione rem
					repudiandae saepe. Eaque, fugiat fugit quasi quisquam repellendus sed voluptatum? Autem beatae
					dolores expedita fuga incidunt labore odit reprehenderit ullam.
				</div>
			</div>
		</div>
	);
};

export default BaseModal;