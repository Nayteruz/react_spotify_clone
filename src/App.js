import TheSideBar from "./components/sidebar/TheSideBar";
import TheHeader from "./components/header/TheHeader";
import TheMain from "./components/content/TheMain";
import TheRegistration from "./components/register/TheRegistration";
import TheSideBarOverlay from "./components/sidebar/TheSideBarOverlay";

function App() {
	return (
		<>
			<div className="flex flex-grow overflow-auto">
				<TheSideBar/>
				<TheSideBarOverlay/>
				<div className="flex-1 overflow-auto">
					<TheHeader/>
					<TheMain/>
				</div>
			</div>
			<TheRegistration/>
		</>
	);
}

export default App;
