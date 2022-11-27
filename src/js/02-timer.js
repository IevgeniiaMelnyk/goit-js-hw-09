import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css"

const refs = {
    input: document.querySelector("input"),
    btn: document.querySelector("button"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
};

refs.btn.setAttribute('disabled', true);

let timerId = null;
let userDate = null;
let timerCheck = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userDate = selectedDates[0];
        notValidDate(userDate);
    },
};

function notValidDate(userDate) {
    if (userDate <= Date.now()) {
         Notiflix.Notify.failure('Please choose a date in the future');
    } else {
        Notiflix.Notify.success('Good! You can start a timer!');
        refs.btn.removeAttribute('disabled');
    }    
};

refs.btn.addEventListener('click', onClick);

function onClick() {
    timerId = setInterval(() => {
        timerCheck = userDate - Date.now();
        const timeBefoDate = padStart(convertMs(timerCheck));
        updateClockface(timeBefoDate);
        refs.btn.setAttribute('disabled', true);
        refs.input.setAttribute('disabled', true);
            
        if (timerCheck < 1000) {
            clearInterval(timerId);
        }
    }, 1000); 
};

const calendar = flatpickr("#datetime-picker", options);

function updateClockface({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
  return { days, hours, minutes, seconds };
};

function padStart({ days, hours, minutes, seconds }) {
    // const days = String(days).padStart(2, '0');
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    return { days, hours, minutes, seconds };
};










