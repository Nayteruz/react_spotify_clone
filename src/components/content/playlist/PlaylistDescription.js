import React from 'react';

const PlaylistDescription = ({children:text}) => {
	return (
		<p className="text-sm text-[#b3b3b3] line-clamp-2">
			{text}
		</p>
	);
};

export default PlaylistDescription;