
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let countActive = false;
let timerStartValue;

const flatOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const deltaTime = selectedDates[0] - Date.now();
        
        convertMs(deltaTime);
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
    
    if (time > 0) {
        startBtn.removeAttribute('disabled');  
    }

    if (time < 0 && !countActive) {
        startBtn.setAttribute('disabled', 1);

        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        window.alert('Оберіть дату в майбутньому!');
        
        return;
    }


    function countdown() {
        timerStartValue = time;
        intervalId = setInterval(() => {
            timerStartValue -= 1000;
            convertMs(timerStartValue);
            
        }, 1000);        
    }
    
    if (timerStartValue <= 0) {
        clearInterval(intervalId);

        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }

    startBtn.addEventListener('click', onStartBtnClick);
    function onStartBtnClick() {
        if (countActive) {
            return;
        }
        countActive = true;
        countdown();
    }

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}


