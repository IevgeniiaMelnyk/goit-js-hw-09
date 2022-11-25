import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    input: document.querySelector("input"),
    btn: document.querySelector("button"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
};

refs.btn.setAttribute('disabled', true);
let intervalId = null;
let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userDate = selectedDates[0];
        if (userDate <= Date.now()) {
            return window.alert("Please choose a date in the future");
        };
        refs.btn.removeAttribute('disabled');
        
                       
        // refs.btn.addEventListener('click', onClick);

        // let timeBefoDate = 0;

        // function onClick() {
        //     const intervalId = setInterval(() => { 
        //             timeBefoDate = convertMs(userDate - Date.now());
        //             updateClockface(timeBefoDate);
        //     }, 1000);
        // }

        
    },
};

refs.btn.addEventListener('click', onClick);


function onClick() {
    intervalId = setInterval(() => {
        timeBefoDate = convertMs(userDate - Date.now());
        updateClockface(timeBefoDate);
    }, 1000); 
};

function stopTimer() {
    if (timeBefoDate === 0)
        clearInterval(intervalId)
};







const calendar = flatpickr("#datetime-picker", options);

function updateClockface({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
  // Remaining minutes
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, '0');
  // Remaining seconds
  const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, '0');
  
  return { days, hours, minutes, seconds };
};












