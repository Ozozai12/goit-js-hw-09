import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const calendarThumb = document.querySelector('.calendar');
const timerThumb = document.querySelector('.timer');
const fieldThumbs = document.querySelectorAll('.field');
const fieldSpans = document.querySelectorAll('.value');

let countActive = false;
let timerValue = 0;

const flatOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const deltaTime = selectedDates[0] - Date.now();

    compareDate(deltaTime);
  },
};
const fp = flatpickr(datePicker, flatOptions);

function convertMs(time) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(time / day);
  const hours = Math.floor((time % day) / hour);
  const minutes = Math.floor(((time % day) % hour) / minute);
  const seconds = Math.floor((((time % day) % hour) % minute) / second);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);

  return { days, hours, minutes, seconds };
}


function compareDate(time) {
  if (time > 0) {
    startBtn.removeAttribute('disabled');
    convertMs(time);
    startBtn.addEventListener('click', onStartBtnClick);
    function onStartBtnClick() {
      if (countActive) {
        return;
      }
      countActive = true;
      countdown(time);
    }
  }

  if (time < 0 && !countActive) {
    startBtn.setAttribute('disabled', 1);

    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    Notiflix.Report.failure('Оберіть дату в майбутньому!', '', 'Добре');

    return;
  }
}

function countdown(time) {
  timerValue = time;
  const intervalId = setInterval(() => {
    timerValue -= 1000;
      convertMs(timerValue);
      if (timerValue < 1000) {
        clearInterval(intervalId);

        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        Notiflix.Report.success('Час настав!', '', 'Добре');
        return;
      }
  }, 1000);
    
  
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

calendarThumb.style.display = 'flex';
calendarThumb.style.justifyContent = 'center';
datePicker.style.marginRight = '15px';
timerThumb.style.display = 'flex';
timerThumb.style.justifyContent = 'space-evenly';
timerThumb.style.marginTop = '40px';
timerThumb.style.fontSize = '40px';
fieldThumbs.forEach(elem => {
  elem.style.display = 'flex';
  elem.style.flexDirection = 'column';
});
fieldSpans.forEach(elem => {
  elem.style.display = 'flex';
  elem.style.justifyContent = 'center';
});
