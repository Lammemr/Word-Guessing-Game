var buttons = document.querySelectorAll('#qwerty');
var phrase = document.querySelector('#phrase ul');
var startGame = document.querySelector('.btn__reset')
var overlay = document.querySelector('#overlay');
var missed = 0;

var phrases = [ 'chicken', 'turtle', 'horse pig', 'sheep', 'ostrich'];

function getRandomPhraseAsArray (e) {
        let randomNumber = Math.floor( Math.random() * e.length );
        let chosenPhrase = phrases[randomNumber];
        let letters = chosenPhrase.split('');
        return letters;
};

const input = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay ( ) {
    for (i = 0; i < input.length; i++) {
        inputLetter = input[i];
        let li = document.createElement('li');
        li.textContent = inputLetter;
        if (li.innerHTML === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        };
        phrase.appendChild(li);
    };
};

addPhraseToDisplay();

// function checkLetter () {
//     let letterButton = buttons.innerHTML;
//     for (i = 0; i < input.length; i++) {

//         if (letterButton === input[i].textContent) {

//         } else {

//         };
//     };
// };

// const checkWin = arr => {

// };
//Start button event listener, removes overlay on click
startGame.addEventListener('click', (e) => {
    overlay.style.display = 'none';
});

qwerty.addEventListener('click', (button) => {
    let letter = button.target.innerHTML;
    console.log(letter);
});
