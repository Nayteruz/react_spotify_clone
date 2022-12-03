import TheSideBar from "./components/sidebar/TheSideBar";
import TheHeader from "./components/header/TheHeader";
import TheMain from "./components/content/TheMain";
import TheRegistration from "./components/register/TheRegistration";
import TheSideBarOverlay from "./components/sidebar/TheSideBarOverlay";
import {useEffect, useRef} from "react";

function App() {

	const contentWrapperRef = useRef(null);
	let isScrollingEnabled = true;

	const toggleScrolling = (isEnabled) =>{
		isScrollingEnabled = isEnabled;
	}

	const handleScrolling = (e) => {
		if (isScrollingEnabled) return;

		e.preventDefault();
		e.stopPropagation();
	}

	useEffect(()=>{
		const contentWrapper = contentWrapperRef.current;

		contentWrapper.addEventListener('mousewheel', handleScrolling)

		return () => contentWrapper.removeEventListener('mousewheel', handleScrolling)
	})

	return (
		<>
			<div className="flex flex-grow overflow-auto">
				<TheSideBar/>
				<TheSideBarOverlay/>
				<div className="flex-1 overflow-auto" ref={contentWrapperRef}>
					<TheHeader/>
					<TheMain toggleScrolling={toggleScrolling}/>
				</div>
			</div>
			<TheRegistration/>
		</>
	);
}

export default App;
