

const BasePopoverTriangle = ({side}) => {

	if (side === 'top'){
		return(<div
			className="w-20 h-10 absolute -top-10 -left-5 flex items-end justify-center overflow-hidden pointer-events-none">
			<div className="w-3 h-3 bg-[#0e72ea] shadow-3xl translate-y-1/2 rotate-45 pointer-events-auto"></div>
		</div>)
	}

	return (
		<div
			className="w-10 h-20 absolute -top-4 -left-10 flex items-center justify-end overflow-hidden pointer-events-none">
			<div className="w-3 h-3 bg-[#0e72ea]  shadow-3xl translate-x-1/2 rotate-45 pointer-events-auto"></div>
		</div>
	);
};

export default BasePopoverTriangle;