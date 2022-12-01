import React from 'react';

const TheSideBarOverlay = () => {
	return (
		<a
			href="/User files/React_lessons/react_spotify/public"
			className="
				fixed inset-0 bg-black opacity-0 peer-target:opacity-50
				pointer-events-none peer-target:pointer-events-auto
				z-20 lg:hidden cursor-default transition-opacity"
		>&nbsp;</a>

	);
};

export default TheSideBarOverlay;