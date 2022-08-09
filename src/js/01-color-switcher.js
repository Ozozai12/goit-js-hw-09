const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const thumb = document.querySelector('.thumb');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

let colorActive = false;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
    if (colorActive) {
        return;
    }
    colorActive = true;
    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', 1);
    timerId = setInterval(() => {
        document.body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000)
}

function onStopBtnClick() {
    clearInterval(timerId);
    colorActive = false;
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 1);
}

thumb.style.display = 'flex';
thumb.style.justifyContent = 'center';
thumb.style.alighnItems = 'center';
startBtn.style.padding = '15px';
stopBtn.style.padding = '15px';
stopBtn.style.marginLeft = '15px';