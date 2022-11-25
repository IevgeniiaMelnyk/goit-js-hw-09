function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', startChangeBodyColor);
refs.stopBtn.addEventListener('click', stopChangeBodyColor);

let timerID = null;
function startChangeBodyColor() {
    timerID = setInterval(() => refs.body.style.backgroundColor = getRandomHexColor(), 1000);
    refs.startBtn.setAttribute('disabled', true);
    refs.stopBtn.removeAttribute('disabled')
};

function stopChangeBodyColor() {
    clearInterval(timerID);
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', true);
};

