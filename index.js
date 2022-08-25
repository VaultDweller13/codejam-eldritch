import ancientsData from './data/ancients.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const ancientsContainer = main.querySelector('.ancients-container');

let currentAncient = null;

pickAncient();
const ancientsCards = ancientsContainer.querySelectorAll('.card-ancient');
ancientsCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        currentAncient = ancientsData[index];
        console.log(currentAncient);
        hideBlock(ancientsContainer);
    })
});

function pickAncient() {
    ancientsData.forEach(ancient => {
        console.log(ancient);
        
        const image = new Image();
        const div = document.createElement('div');

        image.src = ancient.cardFace;
        image.classList.add('image', 'card-image', 'card-ancient-image');

        div.classList.add('card', 'card-ancient');
        div.appendChild(image);

        ancientsContainer.appendChild(div);
    });
}

function showBlock(block) {
    block.classList.remove('hidden');
    block.classList.add('visible');
}

function hideBlock(block) {
    block.classList.remove('visible');
    block.classList.add('hidden');

}

function pickDifficulty() {

}