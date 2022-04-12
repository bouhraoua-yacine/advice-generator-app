'use strict';

const container = document.querySelector('.container');
const btn = document.querySelector('.btn');

getAdvice();

async function getAdvice() {
  //nothing is clickable while fetching data
  btn.removeEventListener('click', getAdvice);

  //reset the ui from the previous generation
  resetUI();

  //inserting a new skeleton animation
  skeltonAnim();

  //generating a random  1 < num < 224 ( for fetching by id)
  const id = randomNum(224);

  //fetching data from the API
  try {
    const res = await fetch(`https://api.adviceslip.com/advice/${id}`);
    const data = await res.json();
    const html = `
    <div class="title"> 
        <span>ADVICE </span> <span class="id" id="id">#${id}</span>
    </div>
        <p class="advice">
            “${data.slip.advice}”
        </p>
    `;
    resetUI(true, html);
  } catch {
    const error = new Error('Somthing went wrong, please try again.');
    const errorHtml = `<div class="error">${error.message}</div>`; 
    resetUI(true,errorHtml)
  }
}

function resetUI(andUpdate = false, html) {
  //removing any previous advice rendering or error text
  const title = document.querySelectorAll('.title');
  const advice = document.querySelectorAll('.advice');
  const skelton = document.querySelectorAll('.skelton');
  const error = document.querySelectorAll('.error');

  if (title || advice || error) {
    title.forEach(elm => elm.remove());
    advice.forEach(elm => elm.remove());
    error.forEach(elm => elm.remove())
  }

  setTimeout(() => {
    //removing any skeleton animation with a delay of 1.5s
    if (skelton) skelton.forEach((elm) => elm.remove());

    //updating the UI and adding the eventlistener for the next advice generation
    if (andUpdate) {
      container.insertAdjacentHTML('afterbegin', html);
      btn.addEventListener('click', getAdvice);
    }
  }, 1500);
}

function randomNum(num = 10) {
  return Math.floor(Math.random() * num + 1);
}

function skeltonAnim() {
  const skl = ` <div class="skelton skelton-title"></div>
  <div class="skelton skelton-text"style="width: 80%"></div>
  <div class="skelton skelton-text"></div>
  <div class="skelton skelton-text"style="width: 60%; margin-bottom: 40px;"></div>`;
  container.insertAdjacentHTML('afterbegin', skl);
}
