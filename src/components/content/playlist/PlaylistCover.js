import React from 'react';

const PlaylistCover = ({url}) => {
	return (
		<img
			src={url}
			className="rounded shadow-lg"
			alt={url}
		/>
	);
};

export default PlaylistCover;