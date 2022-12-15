import {useEffect} from "react";

function useClickAway(ref, handle, shouldHandle = () => true) {
	useEffect(() => {

		function handleMouseDown(event) {
			if (shouldHandle(event) && !ref.current?.contains(event.target)) handle();
		}

		document.addEventListener('mousedown', handleMouseDown)

		return () => document.removeEventListener('mousedown', handleMouseDown)

	})
}

export default useClickAway;