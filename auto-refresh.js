
let r = true;
const REFRESH_AFTER_SECS = 50;

const watcher = setInterval(handleFocus, 10);
let refreshTimeout = null;

function handleFocus() {
    if (!r) {
        if (refreshTimeout != null) {
            clearTimeout(refreshTimeout);
            refreshTimeout = null;
//            console.log('Stopping refresh countdown');
        }
        return;
    }

    // begin refresh timer when window loses focus and there isn't a current refresh timer
    if (!document.hasFocus() && refreshTimeout === null) {
        refreshTimeout = setTimeout(() => location.reload(), REFRESH_AFTER_SECS * 1000);
//        console.log(`Lost focus. Refreshing page in ${REFRESH_AFTER_SECS}.`)

    // remove timeout when document regains focus
    } else if (document.hasFocus() && refreshTimeout != null) {
        clearTimeout(refreshTimeout);
        refreshTimeout = null;
//        console.log('Regained focus. Stopping refresh countdown.')
    }
}