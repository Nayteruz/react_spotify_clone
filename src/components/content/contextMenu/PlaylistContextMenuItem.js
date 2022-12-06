import React from 'react';

const PlaylistContextMenuItem = ({
		children: label,
		onClick:handleClick,
		onMouseEnter: closePreviousSubMenuIfOpen,
		classes
	}) => {
	return (
		<li onMouseEnter={() => closePreviousSubMenuIfOpen()}>
			<button
				onClick={handleClick}
				className={`w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default ${classes}`}>
				{label}
			</button>
		</li>
	);
};

export default PlaylistContextMenuItem;