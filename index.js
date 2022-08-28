import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import blue from './data/mythicCards/blue/index.js';
import brown from './data/mythicCards/brown/index.js';
import green from './data/mythicCards/green/index.js';
import mythicCards from './data/mythicCards/index.js';
import {prepareDeck, setPullCardListener} from './data/deckPreparation.js'; 


const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const ancientsContainer = main.querySelector('.ancients-container');
const cardsContainer = main.querySelector('.cards-container');

let deck;
let currentAncient = null;
let currentDifficulty = difficulties[2];


pickAncient();

function pickAncient() {
  ancientsData.forEach(ancient => {
    drawCard(ancient, ancientsContainer);
  });

  const ancientsCards = ancientsContainer.querySelectorAll('.card-ancient');

  ancientsCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      currentAncient = ancientsData[index];
      hideBlock(ancientsContainer);
      showCurrentPicks();
      pickDifficulty();
    })
  });
}

function pickDifficulty() {
  const difficultyContainer = main.querySelector('.difficulty-container');
  const difficultiesList = difficultyContainer.querySelectorAll('.difficulties-item');
  const description = difficultyContainer.querySelector('.difficulty-description');
  const button = difficultyContainer.querySelector('.button-difficulty');
  showBlock(difficultyContainer);

  difficultiesList.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentDifficulty = difficulties[index];
      description.textContent = currentDifficulty.description;
      removeActive();
      item.classList.add('difficulty-active');
      showCurrentPicks();
    });
  })

  button.addEventListener('click', () => {
    hideBlock(difficultyContainer);
    makeDeck();
  });

  function removeActive() {
    difficultiesList.forEach(item => {
      item.classList.remove('difficulty-active');
    })
  }
}

function makeDeck() {
  deck = prepareDeck(currentAncient, currentDifficulty);
  showBlock(cardsContainer);
  setPullCardListener(deck, currentAncient);
}

function drawCard(card, element) {
  const image = new Image();
  const div = document.createElement('div');

  image.src = card.cardFace;
  image.classList.add('image', 'card-image');
  div.classList.add('card');

  if (ancientsData.includes(card)) {
    image.classList.add('card-ancient-image');
    div.classList.add('card-ancient');
  } else {
    image.classList.add('card-mythic-image');
    div.classList.add('card-mythic');
  }

  div.appendChild(image);
  element.appendChild(div);
}

function showCurrentPicks() {
  const currentAncientBlock = header.querySelector('.current-pick-ancient');
  const currentDifficultyBlock = header.querySelector('.current-pick-difficulty');

  if (currentAncient) currentAncientBlock.textContent = `Ancient: ${currentAncient.name}`;
  if (currentDifficulty) currentDifficultyBlock.textContent = `Difficulty: ${currentDifficulty.name}`;
}

function showBlock(block) {
  block.classList.remove('hidden');
  block.classList.add('visible');
}

function hideBlock(block) {
  block.classList.remove('visible');
  block.classList.add('hidden');
}
