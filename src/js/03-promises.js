import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css'

const refs = {
  inpDelay: document.querySelector('[name = delay]'),
  inpStep: document.querySelector('[name = step]'),
  inpAmount: document.querySelector('[name = amount]'),
  btn: document.querySelector('button'),
}

refs.btn.addEventListener('click', collectingData);

let delay = 0;
let step = 0;
let amount = 0;

function collectingData(e) {
  e.preventDefault();
  delay = Number(refs.inpDelay.value);
  step = Number(refs.inpStep.value);
  amount = Number(refs.inpAmount.value);
  createAllPromises(delay, step, amount);
}

function createAllPromises(delay, step, amount) {
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(onResolve)
      .catch(onReject);
      delay += step;
  }
};

function onResolve({ position, delay }) {
  Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
};

function onReject({ position, delay }) {
  Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }}, delay)
    
  })
};


