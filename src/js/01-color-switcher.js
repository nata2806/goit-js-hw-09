
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body')

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);

let timeId = null;

function onClickStart(evt) {
    timeId = setInterval(changeColor, 1000);
    btnStart.disabled = true;
    btnStop.disabled = false;
}

function changeColor() {
    body.style.backgroundColor = getRandomHexColor()
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function onClickStop(evt) {
    clearInterval(timeId);
    btnStart.disabled = false;
    btnStop.disabled = true;
}
