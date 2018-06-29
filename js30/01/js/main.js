/**
 * Queries for a DOM element by a tag name and a data-key attribute.
 * @param {string} tagName - The element tag name
 * @param {string} dataKey - the data-key attribute value
 * @return {DOMElement | undefined} The queried element if it exists
 */
function selectByTagNameAndDataKey(tagName, dataKey) {
    return document.querySelector(`${tagName}[data-key="${dataKey}"]`);
}

const Classes = {
    playing: 'playing',
};

/**
 * Dictionary of dom elements, mapped to their corresponding data-keys.
 * This is to cache the references to these nodes in memory so we are not
 * performing a DOM query every time the event handler is executed.
 */
const ElementsByKey = {
    '65': {
        audio: selectByTagNameAndDataKey('audio', '65'),
        button: selectByTagNameAndDataKey('div', '65'),
    },
    '83': {
        audio: selectByTagNameAndDataKey('audio', '83'),
        button: selectByTagNameAndDataKey('div', '83'),
    },
    '68': {
        audio: selectByTagNameAndDataKey('audio', '68'),
        button: selectByTagNameAndDataKey('div', '68'),
    },
    '70': {
        audio: selectByTagNameAndDataKey('audio', '70'),
        button: selectByTagNameAndDataKey('div', '70'),
    },
    '71': {
        audio: selectByTagNameAndDataKey('audio', '71'),
        button: selectByTagNameAndDataKey('div', '71'),
    },
    '72': {
        audio: selectByTagNameAndDataKey('audio', '72'),
        button: selectByTagNameAndDataKey('div', '72'),
    },
    '74': {
        audio: selectByTagNameAndDataKey('audio', '74'),
        button: selectByTagNameAndDataKey('div', '74'),
    },
    '75': {
        audio: selectByTagNameAndDataKey('audio', '75'),
        button: selectByTagNameAndDataKey('div', '75'),
    },
    '76': {
        audio: selectByTagNameAndDataKey('audio', '76'),
        button: selectByTagNameAndDataKey('div', '76'),
    },
};

/**
 * Handler for keydown events.
 * @param {Object} e - event object
 * @return {undefined}
 */
function playAudio(e) {
    const elements = ElementsByKey[e.keyCode];
    if (elements) {
        const $audio = elements.audio;
        const $button = elements.button;

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
 * Bind the transitionend event listener to removePlayingTransition().
 * This event listener delegates the transitionend event from children of
 * the common parent and only acts on childen with a class `key`. This
 * is the behavior of jQuery's `.on()` method.
 */
document.getElementsByClassName('keys')[0].addEventListener('transitionend', function filterEvents(e) {
    if (e.target.classList.contains('key')) {
        removePlayingTransition(e);
    }
});
