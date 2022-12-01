import React from 'react';
import {HomeIcon, MagnifyingGlassIcon, ViewColumnsIcon, PlusCircleIcon, HeartIcon} from '@heroicons/react/24/outline'
import NavItem from "./NavItem";

const TheNav = () => {

	const activeNavItemClasses = 'flex items-center text-white bg-[#282828] mx-2 px-4 py-2 rounded';
	const navItemClasses = 'flex items-center hover:text-white mx-2 px-4 py-2 rounded duration-300';

	const navItems = [
		{
			label: 'Home',
			classes: activeNavItemClasses,
			icon: <HomeIcon className="w-6 h-6"/>
		},
		{
			label: 'Search',
			classes: navItemClasses,
			icon: <MagnifyingGlassIcon className="w-6 h-6"/>
		},
		{
			label: 'Your Library',
			classes: `${navItemClasses} mb-6`,
			icon: <ViewColumnsIcon className="w-6 h-6"/>
		},
		{
			label: 'Create Playlist',
			classes: navItemClasses,
			icon: <PlusCircleIcon className="w-6 h-6"/>
		},
		{
			label: 'Liked Songs',
			classes: navItemClasses,
			icon: <HeartIcon className="w-6 h-6"/>
		},
	];

	return (
		<nav>
			{navItems.map(({label, icon, classes}) =>
				<NavItem key={label} classes={classes} icon={icon} >
					{label}
				</NavItem>
			)}
		</nav>
	);
};

export default TheNav;