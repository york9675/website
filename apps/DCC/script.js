let isWhite = false;
let fadeOutTimeout;

function setWhite() {
    isWhite = true;
    document.body.style.transition = '';
    document.body.style.backgroundColor = 'white';
}

function setBlack(event) {
    isWhite = false;
    if (event && (event.key === 's' || event.key === 'S')) {
        document.body.style.transition = 'background-color 1s ease-out';
    }
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
            setBlack(event);
        });
    } else if (event.key === 's' || event.key === 'S') {
        requestAnimationFrame(() => {
            fadeOutTimeout = setTimeout(() => {
                setBlack(event);
            }, 0);
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
