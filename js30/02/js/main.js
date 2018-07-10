const $secondHand = document.getElementsByClassName('second-hand')[0];
const $minuteHand = document.getElementsByClassName('min-hand')[0];
const $hourHand = document.getElementsByClassName('hour-hand')[0];

function rotateHand($hand, deg) {
    $hand.style.transform = `rotate(${deg}deg)`;
}

// Update the clock
function tick() {
    const current = new Date();

    const seconds = current.getSeconds();
    rotateHand($secondHand, (seconds/60) * 360);

    const minutes = current.getMinutes();
    rotateHand($minuteHand, ((minutes + seconds/60)/60) * 360);

    const militaryHour = current.getHours();
    const hour = militaryHour > 11 ? militaryHour - 12 : miltaryHour;
    rotateHand($hourHand, ((hour + minutes/60)/12) * 360);
}

// Start the clock
setInterval(tick, 1000);

// Utility to animate the clock face
const clock = (function animateClock() {
    const $clock = document.getElementsByClassName('clock')[0];

    const firstStopBase = 8;
    const secondStopBase = 40;
    const firstStopIncrement = 1;
    const secondStopIncrement = 5;
    const maxFirstStop = 16;
    const minFirstStop = 8;

    let firstStop = firstStopBase;
    let secondStop = secondStopBase;
    let direction = 1;

    let lastUpdateTime = new Date().getTime();
    const updateInterval = 115;

    let stopCommand, animating;

    function updateClockGradient() {
        const currTime = new Date().getTime();
        if (currTime - lastUpdateTime >= updateInterval) {
            const maxStopHit = direction > 0 && firstStop >= maxFirstStop;
            const minStopHit = direction < 0 && firstStop <= minFirstStop;

            if (maxStopHit || minStopHit) {
                direction = direction * -1;
            }

            firstStop += firstStopIncrement * direction;
            secondStop += secondStopIncrement * direction;
            $clock.style.backgroundImage = `repeating-radial-gradient(circle at center, #fffeef, #edde02 ${firstStop}px, #fcfcfc, #2d2d2d ${secondStop}px)`;
            lastUpdateTime = currTime;
        }

        if (!stopCommand) {
            requestAnimationFrame(updateClockGradient);
        } else {
            stopCommand = false;
            animating = false;
        }
    }

    function start() {
        stopCommand = false; // Guarantee stopCommand hasn't been triggered
        if (!animating) { // Prevent double calling requestAnimationFrame
            animating = true;
            requestAnimationFrame(updateClockGradient);
        }
    }

    function stop() {
        stopCommand = true; // Trigger stopCommand
    }

    return {
        start,
        stop,
    };
})();

// Bind handler to the toggle for the clock face
const $slider = document.getElementsByClassName('slider')[0];
const $input = document.getElementsByClassName('toggle')[0].getElementsByTagName('input')[0];

$slider.addEventListener('transitionend', function(e) {
    if (e.propertyName === 'transform') {
        if ($input.checked) {
            clock.start();
        } else {
            clock.stop();
        }
    }
});
