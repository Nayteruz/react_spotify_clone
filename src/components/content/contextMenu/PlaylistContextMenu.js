import React, {useEffect} from 'react';
import PlaylistContextMenuItem from "./PlaylistContextMenuItem";

const PlaylistContextMenu = ({classes, menuItems, onClose: handleCLose}, ref) => {

	useEffect(() => {
		if (!handleCLose) return;

		function handleClickAway(e) {
			if (!ref.current.contains(e.target)) {
				handleCLose();
			}
		}

		function handleEsc(e) {
			if (e.keyCode === 27) {
				handleCLose();
			}
		}

		document.addEventListener('mousedown', handleClickAway)
		document.addEventListener('keydown', handleEsc)
		return () => {
			document.removeEventListener('mousedown', handleClickAway)
			document.removeEventListener('keydown', handleEsc)
		}
	})

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