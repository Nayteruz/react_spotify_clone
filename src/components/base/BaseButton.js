import React from 'react';

const BaseButton = ({children: label, onClick:handleClick, extraClasses = ''}) => {

	const classesBtn = 'font-semibold leading-5 py-[14px] px-[17px] sm:px-[38px] rounded-full hover:scale-105';

	return (
		<button className={`${classesBtn} ${extraClasses}`} onClick={handleClick}>{label}</button>
	);
};

export default BaseButton;