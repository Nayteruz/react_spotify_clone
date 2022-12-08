import React from 'react';
import TheRegistrationInfo from "./TheRegistrationInfo";
import BaseButton from "../base/BaseButton";

const TheRegistration = () => {
	return (
		<a href="/User files/React_lessons/react_spotify/public"
		   className="bg-gradient-to-r from-[#af2896] to-[#509bf5] text-white py-4 px-8 flex justify-between items-center flex-wrap gap-x-6 gap-y-2">
			<TheRegistrationInfo/>
			<BaseButton extraClasses="bg-white text-[#2c77d0] text-[14px]">Sign up free</BaseButton>
		</a>
	);
};

export default TheRegistration;