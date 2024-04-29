let isWhite = false;
let fadeOutTimeout;

function setWhite() {
    isWhite = true;
    document.body.style.transition = '';
    document.body.style.backgroundColor = 'white';
}

function setBlack() {
    isWhite = false;
    document.body.style.transition = 'background-color 1s ease-out';
    document.body.style.backgroundColor = 'black';
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'a' || event.key === 'A') {
        setWhite();
    } else if (event.key === 's' || event.key === 'S') {
        setWhite();
        clearTimeout(fadeOutTimeout);
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'a' || event.key === 'A') {
        requestAnimationFrame(() => {
            setBlack();
        });
    } else if (event.key === 's' || event.key === 'S') {
        requestAnimationFrame(() => {
            fadeOutTimeout = setTimeout(setBlack, 0);
        });
    }
});

document.addEventListener('touchstart', function () {
    setWhite();
});

document.addEventListener('touchend', function () {
    requestAnimationFrame(() => {
        setBlack();
    });
});
