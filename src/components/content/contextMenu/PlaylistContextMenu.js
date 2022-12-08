import {forwardRef, useRef} from 'react';
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
			{menuItems.map(({label, action, submenu, classes:menuItemClasses}) => {
				if (submenu) {
					return (
						<PlaylistContextMenuItemWithSubMenu key={label} submenuItems={submenu} onMouseEnter={closePreviousSubMenuIfOpen}>
							{label}
						</PlaylistContextMenuItemWithSubMenu>
					)
				} else {
					return (
						<PlaylistContextMenuItem key={label} onClick={action} classes={menuItemClasses} onMouseEnter={closePreviousSubMenuIfOpen}>
							{label}
						</PlaylistContextMenuItem>
					)
				}
			})}
		</ul>
	);
};

export default forwardRef(PlaylistContextMenu);