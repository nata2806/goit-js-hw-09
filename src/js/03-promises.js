import { Notify } from 'notiflix/build/notiflix-notify-aio';

const promisForm = document.querySelector(".form")
promisForm.addEventListener('submit', onSubmit)


// Додаємо до функції створення промісу  сеттаймаут та отримуємо масив значень при успішному і неуспішному виконанняі промісу
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
}

// функція обробки результату промісу
function hendlerPromises(promise) {
  promise.then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
}

//Колбек для слухача форми. Отримуємо значення з інпутів, приводимо до числа, створюємо цикл, де на кожній ітерації викликаємо функцію створення  промісу, обробляємо результат через фунуцію обробки, після чого збільшуємо delay на крок 

function onSubmit(evt) {

  evt.preventDefault();

  const { elements: { delay, step, amount } }
    = evt.currentTarget;

  const actualAmount = Number(amount.value);
  const actualStep = Number(step.value);

  let actualDelay = Number(delay.value);

  for (let i = 1; i <= actualAmount; i += 1) {

    const promise = createPromise(i, actualDelay);
    hendlerPromises(promise);

    actualDelay += actualStep;
  }
};