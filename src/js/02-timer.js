import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const myInput = document.querySelector("#datetime-picker");
const btnStart = document.querySelector('button[data-start]');
const remainderDays = document.querySelector('[data-days]');
const remainderHours = document.querySelector('[data-hours]');
const remainderMinutes = document.querySelector("[data-minutes]");
const remainderSeconds = document.querySelector("[data-seconds]");

// оголошуємо змінні із значенням по замовчуванню для залишку часу та стану таймера

let remainderTime = null;
let timerIsStarted = false;



//слухаємо інпут у методі onClose, кнопка неактивна поки користувач не вибере валідну дату , selectedDates є масивом, тому беремо по індексу
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const chooseDate = selectedDates[0];
        const currentDate = new Date();
        const isValidTime = chooseDate > currentDate;
        if (!isValidTime || timerIsStarted) {
            btnStart.disabled = true;

            if (!isValidTime) {
                Notify.failure("Please choose a date in the future");
            }
            if (timerIsStarted) {
                Notify.failure("TIMER IS STARTED ALREADY");
            }
        }
        else {
            btnStart.disabled = false;
            btnStart.addEventListener(
                'click', onClickStart)
        }
    },
}


//встановлюємо стан кнопки по замовчуванню при старті сторінки 
btnStart.disabled = true;

//створюємо екземпляр flatpickr, передаємо наш імпут і об"єкт
const fp = flatpickr(myInput, options);

// btnStart.addEventListener(
//     'click', onClickStart)

// після  кліку на старт щосекунди порівнюємо вибрану дату з поточниим часом та отримані мілісекунди форматуємо з допомогою функції convertMs
function onClickStart(evt) {
    timerIsStarted = true;
    btnStart.disabled = true;
    const choosedDate = fp.selectedDates[0]; //fp.selectedDates є масивом з одним елементом 

    const intervalId = setInterval(() => {
        const currentDate = new Date();

        remainderTime = choosedDate - currentDate;

        if (remainderTime > 0) {
            updateTimer(remainderTime)
            btnStart.removeEventListener(
                'click', onClickStart)
        } else {
            clearInterval(intervalId);
            timerIsStarted = false;
            Notify.info('TIME IS OVER');


        }
    }, 1000)
}

// функція оновлення інтерфейсу таймера
function updateTimer(time) {
    const { days, hours, minutes, seconds } = convertMs(time);
    remainderDays.textContent = addLeadingZero(days);
    remainderHours.textContent = addLeadingZero(hours);
    remainderMinutes.textContent = addLeadingZero(minutes);
    remainderSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
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
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}