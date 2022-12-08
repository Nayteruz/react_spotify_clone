import TheSideBar from "./components/sidebar/TheSideBar";
import TheHeader from "./components/header/TheHeader";
import TheMain from "./components/content/TheMain";
import TheRegistration from "./components/register/TheRegistration";
import TheSideBarOverlay from "./components/sidebar/TheSideBarOverlay";
import React, {useEffect, useRef} from "react";
import BaseToast from "./components/base/BaseToast";
import BasePopover from "./components/base/BasePopover";

function App() {

	const contentWrapperRef = useRef();
	const toastRef = useRef();
	const popoverRef = useRef();
	let isScrollingEnabled = true;

	useEffect(() => {
		const contentWrapper = contentWrapperRef.current;

		contentWrapper?.addEventListener('mousewheel', handleScrolling)

		return () => contentWrapper?.removeEventListener('mousewheel', handleScrolling)
	})

	const toggleScrolling = (isEnabled) => {
		isScrollingEnabled = isEnabled;
	}

	const handleScrolling = (e) => {
		if (isScrollingEnabled) return;

		e.preventDefault();
		e.stopPropagation();
	}

	function showPopover(title, description, target) {
		popoverRef.current?.show(title, description, target);
	}

	function showToast(message) {
		toastRef.current?.show(message);
	}



	return (
		<>
			<div className="flex grow overflow-auto">
				<TheSideBar showPopover={showPopover}/>
				<TheSideBarOverlay/>
				<div className="flex-1 overflow-auto" ref={contentWrapperRef}>
					<TheHeader/>
					<TheMain showToast={showToast} showPopover={showPopover} toggleScrolling={toggleScrolling}/>
				</div>
			</div>
			<TheRegistration/>
			<BaseToast ref={toastRef}/>
			<BasePopover ref={popoverRef}/>
		</>
	);
}

export default App;
