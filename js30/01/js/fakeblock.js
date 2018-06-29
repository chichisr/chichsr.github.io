const $audio = document.querySelector('audio');
const $button = document.getElementsByClassName('key')[0];

const Classes = {
    playing: 'playing',
};

/**
 * Handler for keydown events.
 * @param {Object} e - event object
 * @return {undefined}
 */
function playAudio(e) {
    if (e.keyCode === 32) {
        $audio.currentTime = 0;
        $audio.play();
        $button.classList.add(Classes.playing);
    }
}

/**
 * Bind the keydown event to run playAudio()
 */
document.addEventListener('keydown', playAudio);

/**
 * Handler for transitionend events. Removes the playing class
 * from the buttons.
 * @param {Object} e - event object
 * @return {undefined}
 */
function removePlayingTransition(e) {
    if (e.propertyName === 'transform') {
        e.target.classList.remove(Classes.playing);
    }
}

/**
 * Bind the transitionend event listener to removePlayingTransition()
 */
$button.addEventListener('transitionend', removePlayingTransition);
