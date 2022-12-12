let debounceTimer = null;

export const MIN_DESKTOP_WIDTH = 900;

export function debounce(callback, delay = 300) {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(callback, delay)
}