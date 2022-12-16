import {useEffect} from "react";

function useEvent(eventName, handler, shouldHandle = () => true, target = document) {
	useEffect(() => {
		if (!shouldHandle()) return;

		target.addEventListener(eventName, handler)

		return () => target.removeEventListener(eventName, handler);
	})

}

export default useEvent;