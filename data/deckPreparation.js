import difficulties from './difficulties.js';
import mythicCards from './mythicCards/index.js';

const cardBack = document.querySelector('.card-back');
const cardFace = document.querySelector('.card-face');

let firstStage = {blue: 0, brown: 0, green: 0};
let secondStage = {blue: 0, brown: 0, green: 0};
let thirdStage = {blue: 0, brown: 0, green: 0};

export function prepareDeck(currentAncient, difficulty) {
  initializeCounters(currentAncient);
  updateCounters();

  const cardSet = getCardSet(difficulty);
  const stageDecks = splitByStage(cardSet);
  const combinedDeck = combineStageDecks(stageDecks);
  console.log(combinedDeck);

  return combinedDeck;
}

function initializeCounters(currentAncient) {
  firstStage.blue = currentAncient.firstStage.blueCards;
  firstStage.brown = currentAncient.firstStage.brownCards;
  firstStage.green = currentAncient.firstStage.greenCards;
  secondStage.blue = currentAncient.secondStage.blueCards;
  secondStage.brown = currentAncient.secondStage.brownCards;
  secondStage.green = currentAncient.secondStage.greenCards;
  thirdStage.blue = currentAncient.thirdStage.blueCards;
  thirdStage.brown = currentAncient.thirdStage.brownCards;
  thirdStage.green = currentAncient.thirdStage.greenCards;
}

function updateCounters() {
  const firstStageBlueCardsCount = document.querySelector('.first-stage>.blue-cards-count');
  const firstStageBrownCardsCount = document.querySelector('.first-stage>.brown-cards-count');
  const firstStageGreenCardsCount = document.querySelector('.first-stage>.green-cards-count');
  const secondStageBlueCardsCount = document.querySelector('.second-stage>.blue-cards-count');
  const secondStageBrownCardsCount = document.querySelector('.second-stage>.brown-cards-count');
  const secondStagegreenCardsCount = document.querySelector('.second-stage>.green-cards-count');
  const thirdStageBlueCardsCount = document.querySelector('.third-stage>.blue-cards-count');
  const thirdStageBrownCardsCount = document.querySelector('.third-stage>.brown-cards-count');
  const thirdStageGreenCardsCount = document.querySelector('.third-stage>.green-cards-count');

  firstStageBlueCardsCount.textContent = firstStage.blue;
  firstStageBrownCardsCount.textContent = firstStage.brown;
  firstStageGreenCardsCount.textContent = firstStage.green;

  secondStageBlueCardsCount.textContent = secondStage.blue;
  secondStageBrownCardsCount.textContent = secondStage.brown;
  secondStagegreenCardsCount.textContent = secondStage.green;

  thirdStageBlueCardsCount.textContent = thirdStage.blue;
  thirdStageBrownCardsCount.textContent = thirdStage.brown;
  thirdStageGreenCardsCount.textContent = thirdStage.green;
}
function getCardSet(difficulty) {
  let blueCards;
  let brownCards;
  let greenCards;
  let cardsByColorArray;
  const blueTotal = +firstStage.blue + +secondStage.blue + +thirdStage.blue;
  const brownTotal = +firstStage.brown + +secondStage.brown + +thirdStage.brown;
  const greenTotal = +firstStage.green + +secondStage.green + +thirdStage.green;
  const cardsTotals = [blueTotal, brownTotal, greenTotal];

  if (difficulty === difficulties[0]) {
    blueCards = mythicCards.blueCards.filter(card => card.difficulty !== 'hard');
    brownCards = mythicCards.brownCards.filter(card => card.difficulty !== 'hard');
    greenCards = mythicCards.greenCards.filter(card => card.difficulty !== 'hard');

    cardsByColorArray = [blueCards, brownCards, greenCards];
    cardsByColorArray.forEach((array, index) => {
      shuffle(array);
      const easyArray = array.filter(card => card.difficulty === 'easy');

      if (easyArray.length < cardsTotals[index]) {
        const normalArray = array.filter(card => card.difficulty === 'normal');
        cardsByColorArray[index] = easyArray.concat(normalArray.slice(0, cardsTotals[index] - easyArray.length));
      } else {
        cardsByColorArray[index] = easyArray.slice(0, cardsTotals[index]);
      }
    });
  }

  if (difficulty === difficulties[1]) {
    blueCards = mythicCards.blueCards.filter(card => card.difficulty !== 'hard');
    brownCards = mythicCards.brownCards.filter(card => card.difficulty !== 'hard');
    greenCards = mythicCards.greenCards.filter(card => card.difficulty !== 'hard');

    cardsByColorArray = [blueCards, brownCards, greenCards];
    cardsByColorArray.forEach(array => shuffle(array));
  }

  if (difficulty === difficulties[2]) {
    cardsByColorArray = [mythicCards.blueCards, mythicCards.brownCards, mythicCards.greenCards];
  }

  if (difficulty === difficulties[3]) {
    blueCards = mythicCards.blueCards.filter(card => card.difficulty !== 'easy');
    brownCards = mythicCards.brownCards.filter(card => card.difficulty !== 'easy');
    greenCards = mythicCards.greenCards.filter(card => card.difficulty !== 'easy');  

    cardsByColorArray = [blueCards, brownCards, greenCards];
    cardsByColorArray.forEach(array => shuffle(array));
  }

  if (difficulty === difficulties[4]) {
    blueCards = mythicCards.blueCards.filter(card => card.difficulty !== 'easy');
    brownCards = mythicCards.brownCards.filter(card => card.difficulty !== 'easy');
    greenCards = mythicCards.greenCards.filter(card => card.difficulty !== 'easy');

    cardsByColorArray = [blueCards, brownCards, greenCards];
    cardsByColorArray.forEach((array, index) => {
      shuffle(array);
      const hardArray = array.filter(card => card.difficulty === 'hard');

      if (hardArray.length < cardsTotals[index]) {
        const normalArray = array.filter(card => card.difficulty === 'normal');
        cardsByColorArray[index] = hardArray.concat(normalArray.slice(0, cardsTotals[index] - hardArray.length));
      } else {
        cardsByColorArray[index] = hardArray.slice(0, cardsTotals[index]);
      }
    });
  }

  return cardsByColorArray;
}

function splitByStage(cardSet) {
  const firstStageBlueCards = [];
  const firstStageBrownCards = [];
  const firstStageGreenCards = [];

  const secondStageBlueCards = [];
  const secondStageBrownCards = [];
  const secondStageGreenCards = [];

  const thirdStageBlueCards = [];
  const thirdStageBrownCards = [];
  const thirdStageGreenCards = [];

  const stageDecks = [firstStageGreenCards, firstStageBrownCards, firstStageBlueCards,
                    secondStageGreenCards, secondStageBrownCards, secondStageBlueCards,
                    thirdStageGreenCards, thirdStageBrownCards, thirdStageBlueCards];
 
  // Blue cards mini-decks; 
  for(let i = 0; i < firstStage.blue; i++) {
    shuffle(cardSet[0]);
    firstStageBlueCards.push(cardSet[0].pop());
  }

  for(let i = 0; i < secondStage.blue; i++) {
    shuffle(cardSet[0]);
    secondStageBlueCards.push(cardSet[0].pop());
  }
    
  for(let i = 0; i < thirdStage.blue; i++) {
    shuffle(cardSet[0]);
    thirdStageBlueCards.push(cardSet[0].pop());
  }

  // Brown cards mini-decks;
  for(let i = 0; i < firstStage.brown; i++) {
    shuffle(cardSet[1]);
    firstStageBrownCards.push(cardSet[1].pop());
  }

  for(let i = 0; i < secondStage.brown; i++) {
    shuffle(cardSet[1]);
    secondStageBrownCards.push(cardSet[1].pop());
  }
    
  for(let i = 0; i < thirdStage.brown; i++) {
    shuffle(cardSet[1]);
    thirdStageBrownCards.push(cardSet[1].pop());
  }

  // Green cards mini-deck
  for(let i = 0; i < firstStage.green; i++) {
    shuffle(cardSet[2]);
    firstStageGreenCards.push(cardSet[2].pop());
  }

  for(let i = 0; i < secondStage.green; i++) {
    shuffle(cardSet[2]);
    secondStageGreenCards.push(cardSet[2].pop());
  }
    
  for(let i = 0; i < thirdStage.green; i++) {
    shuffle(cardSet[2]);
    thirdStageGreenCards.push(cardSet[2].pop());
  }

  stageDecks.forEach(deck => shuffle(deck));
  return stageDecks;
}

function combineStageDecks(stageDecks) {
  const firstStageDeck = stageDecks.slice(0, 3).flat();
  const secondStageDeck = stageDecks.slice(3, 6).flat();
  const thirdStageDeck = stageDecks.slice(6, 9).flat();
  [firstStageDeck, secondStageDeck, thirdStageDeck].forEach(shuffle);
  return [firstStageDeck, secondStageDeck, thirdStageDeck].flat();
}

export function setPullCardListener(deck, currentAncient) {
  cardBack.addEventListener('click', () => {
    const card = cardFace.querySelector('.card-mythic');
    if (card) card.remove();
    if (deck.length) {
      const card = deck.shift();
      if (card.color === 'blue') {
        if (firstStage.blue > 0) {
          firstStage.blue -= 1;
        } else if (secondStage.blue > 0) {
          secondStage.blue -= 1;
        } else {
          thirdStage.blue -= 1;
        }
      }

      if (card.color === 'brown') {
        if (firstStage.brown > 0) {
          firstStage.brown -= 1;
        } else if (secondStage.brown > 0) {
          secondStage.brown -= 1;
        } else {
          thirdStage.brown -= 1;
        }
      }

      if (card.color === 'green') {
        if (firstStage.green > 0) {
          firstStage.green -= 1;
        } else if (secondStage.green > 0) {
          secondStage.green -= 1;
        } else {
          thirdStage.green -= 1;
        }
      }
      updateCounters();
      drawCard(card, cardFace);
    }
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); 

    [array[i], array[j]] = [array[j], array[i]];
  }
}

function drawCard(card, element) {
  const image = new Image();
  const div = document.createElement('div');

  image.src = card.cardFace;
  image.classList.add('image', 'card-image');
  div.classList.add('card');

  image.classList.add('card-mythic-image');
  div.classList.add('card-mythic');

  div.appendChild(image);
  element.appendChild(div);
}