/**
 * Tracks whether a pointer gesture is in progress within an editor canvas.
 *
 * Changing an editable element's `contenteditable` while a pointer gesture is
 * active mutates the DOM under the pointer, and browsers abandon native
 * selection gestures (a drag extending a selection, the expansion of a double
 * or triple click) when that happens. The rich text renders the selected
 * block's editable as an inert part of the editing host only once the pointer
 * is up; keyboard driven selection changes flip immediately.
 */
const listeners = new Set();
let pointerIsDown = false;

export function subscribePointerGesture( callback ) {
	listeners.add( callback );
	return () => listeners.delete( callback );
}

export function isPointerGestureActive() {
	return pointerIsDown;
}

export function setPointerGestureActive( value ) {
	if ( pointerIsDown === value ) {
		return;
	}
	pointerIsDown = value;
	listeners.forEach( ( callback ) => callback() );
}
