import useEvent from "./useEvent";

function useClickAway(ref, handle, shouldHandle = () => true) {

	useEvent('mousedown', handleMouseDown)

	function handleMouseDown(event) {
		if (shouldHandle(event) && !ref.current?.contains(event.target)) handle();
	}
}

export default useClickAway;