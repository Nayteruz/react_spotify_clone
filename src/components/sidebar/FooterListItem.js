import React from 'react';

const FooterListItem = ({children: label}) => {
	return (
		<li>
			<a
				href="/User files/React_lessons/react_spotify/public"
				className="text-[11px] hover:underline py-2"
			>
				{label}
			</a>
		</li>
	);
};

export default FooterListItem;