import React from 'react';
import PlaylistContextMenuItem from "./PlaylistContextMenuItem";

const PlaylistContextMenu = ({classes, menuItems}) => {

	return (
		<ul className={classes}
		>
			{menuItems.map(({label, submenu}) =>
				<PlaylistContextMenuItem key={label} submenu={submenu}>{label}</PlaylistContextMenuItem>
			)}
		</ul>
	);
};

export default PlaylistContextMenu;