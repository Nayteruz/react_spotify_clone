import React, {useRef} from 'react';
import PlaylistContextMenuItem from "./PlaylistContextMenuItem";
import PlaylistContextMenuItemWithSubMenu from "./PlaylistContextMenuItemWithSubMenu";

const PlaylistContextMenu = ({classes, menuItems}, ref) => {

	let closePreviousSubMenu = useRef(null);
	const closePreviousSubMenuIfOpen = (closeSubMenu = null) => {
		if (closePreviousSubMenu.current) closePreviousSubMenu.current()
		closePreviousSubMenu.current = closeSubMenu;
	}

	return (
		<ul
			className={`bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-3xl cursor-default whitespace-nowrap z-10 ${classes}`}
			ref={ref}
		>
			{menuItems.map(({label, submenu, classes:menuItemClasses}) => {
				if (submenu) {
					return (
						<PlaylistContextMenuItemWithSubMenu key={label} submenu={submenu} onMouseEnter={closePreviousSubMenuIfOpen}>
							{label}
						</PlaylistContextMenuItemWithSubMenu>
					)
				} else {
					return (
						<PlaylistContextMenuItem key={label} classes={menuItemClasses} onMouseEnter={closePreviousSubMenuIfOpen}>
							{label}
						</PlaylistContextMenuItem>
					)
				}
			})}
		</ul>
	);
};

export default React.forwardRef(PlaylistContextMenu);