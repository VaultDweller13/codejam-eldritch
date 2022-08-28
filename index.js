import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import blue from './data/mythicCards/blue/index.js';
import brown from './data/mythicCards/brown/index.js';
import green from './data/mythicCards/green/index.js';
import mythicCards from './data/mythicCards/index.js';


const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const ancientsContainer = main.querySelector('.ancients-container');
const cardsContainer = main.querySelector('.cards-container');

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

function drawCard(card, element) {
  console.log(card);
      
  const image = new Image();
  const div = document.createElement('div');

  image.src = card.cardFace;
  image.classList.add('image', 'card-image');
  div.classList.add('card');

  if (ancientsData.includes(card)) {
    image.classList.add('card-ancient-image');
    div.classList.add('card-ancient');
  }

  div.appendChild(image);
  element.appendChild(div);
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
    prepareDeck();
  });

  function removeActive() {
    difficultiesList.forEach(item => {
      item.classList.remove('difficulty-active');
    })
  }

}

function showMythics() {
  brown.forEach(card => {
    drawCard(card, cardsContainer);
  })
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

function prepareDeck() {
  const cardSet = getCardSet();
  console.log(cardSet);
  setCounters();
  showBlock(cardsContainer);

  function setCounters() {
    const firstStage = cardsContainer.querySelector('.first-stage');
    const secondStage = cardsContainer.querySelector('.second-stage');
    const thirdStage = cardsContainer.querySelector('.third-stage');
    const firstStageBlueCardsCount = cardsContainer.querySelector('.first-stage>.blue-cards-count');
    const firstStageBrownCardsCount = cardsContainer.querySelector('.first-stage>.brown-cards-count');
    const firstStageGreenCardsCount = cardsContainer.querySelector('.first-stage>.green-cards-count');
    const secondStageBlueCardsCount = cardsContainer.querySelector('.second-stage>.blue-cards-count');
    const secondStageBrownCardsCount = cardsContainer.querySelector('.second-stage>.brown-cards-count');
    const secondStagegreenCardsCount = cardsContainer.querySelector('.second-stage>.green-cards-count');
    const thirdStageBlueCardsCount = cardsContainer.querySelector('.third-stage>.blue-cards-count');
    const thirdStageBrownCardsCount = cardsContainer.querySelector('.third-stage>.brown-cards-count');
    const thirdStageGreenCardsCount = cardsContainer.querySelector('.third-stage>.green-cards-count');

    const firstStageBlueCards = currentAncient.firstStage.blueCards;
    const firstStageBrownCards = currentAncient.firstStage.brownCards;
    const firstStageGreenCards = currentAncient.firstStage.greenCards;
    const secondStageBlueCards = currentAncient.secondStage.blueCards;
    const secondStageBrownCards = currentAncient.secondStage.brownCards;
    const secondStageGreenCards = currentAncient.secondStage.greenCards;
    const thirdStageBlueCards = currentAncient.thirdStage.blueCards;
    const thirdStageBrownCards = currentAncient.thirdStage.brownCards;
    const thirdStageGreenCards = currentAncient.thirdStage.greenCards;

    firstStageBlueCardsCount.textContent = firstStageBlueCards;
    firstStageBrownCardsCount.textContent = firstStageBrownCards;
    firstStageGreenCardsCount.textContent = firstStageGreenCards;

    secondStageBlueCardsCount.textContent = secondStageBlueCards;
    secondStageBrownCardsCount.textContent = secondStageBrownCards;
    secondStagegreenCardsCount.textContent = secondStageGreenCards;

    thirdStageBlueCardsCount.textContent = thirdStageBlueCards;
    thirdStageBrownCardsCount.textContent = thirdStageBrownCards;
    thirdStageGreenCardsCount.textContent = thirdStageGreenCards;
  }

  function getCardSet() {
    let blueCards;
    let brownCards;
    let greenCards;

    if (currentDifficulty === difficulties[0]) {
      blueCards = mythicCards.blueCards.filter(card => card.difficulty !== 'hard');
      brownCards = mythicCards.brownCards.filter(card => card.difficulty !== 'hard');
      greenCards = mythicCards.greenCards.filter(card => card.difficulty !== 'hard');
    }

    if (currentDifficulty === difficulties[1]) {
      blueCards = mythicCards.blueCards.filter(card => card.difficulty !== 'hard');
      brownCards = mythicCards.brownCards.filter(card => card.difficulty !== 'hard');
      greenCards = mythicCards.greenCards.filter(card => card.difficulty !== 'hard');
    }

    if (currentDifficulty === difficulties[2]) {
      cardSet = mythicCards;
    }

    if (currentDifficulty === difficulties[3]) {
      blueCards = mythicCards.blueCards.filter(card => card.difficulty !== 'easy');
      brownCards = mythicCards.brownCards.filter(card => card.difficulty !== 'easy');
      greenCards = mythicCards.greenCards.filter(card => card.difficulty !== 'easy');  
    }

    if (currentDifficulty === difficulties[4]) {
      blueCards = mythicCards.blueCards.filter(card => card.difficulty !== 'easy');
      brownCards = mythicCards.brownCards.filter(card => card.difficulty !== 'easy');
      greenCards = mythicCards.greenCards.filter(card => card.difficulty !== 'easy');
    }

    return {blueCards, brownCards, greenCards};
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
  
      [array[i], array[j]] = [array[j], array[i]];
    }
  }


}

