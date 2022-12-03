import React from 'react';
import PlaylistContextMenuItem from "./PlaylistContextMenuItem";

const PlaylistContextMenu = ({classes, menuItems}, ref) => {

	return (
		<ul
			className={classes}
			ref={ref}
		>
			{menuItems.map(({label, submenu}) =>
				<PlaylistContextMenuItem key={label} submenu={submenu}>{label}</PlaylistContextMenuItem>
			)}
		</ul>
	);
};

export default React.forwardRef(PlaylistContextMenu);