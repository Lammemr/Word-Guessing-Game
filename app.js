var buttons = document.querySelectorAll('#qwerty');
var phrase = document.querySelector('#phrase ul');
var startGame = document.querySelector('.btn__reset')
var overlay = document.querySelector('#overlay');
var hearts = document.querySelectorAll('.tries');
var missed = 0;
let match = null;


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

function checkLetter (letter) {
    let phraseNode = document.querySelectorAll('ul li');
    let phraseArray = Array.from(phraseNode);
    for (i = 0; i < phraseArray.length; i++) {
        if (letter === phraseArray[i].innerHTML) {
            phraseArray[i].className = "show";
            match = letter;
        } else {

        };
    };
    return match
};

const phraseNodeLetter = document.querySelectorAll('li.letter');
const phraseArrayLetter = Array.from(phraseNodeLetter);

function checkWin () {
    let phraseNodeShow = document.querySelectorAll('li.show');
    let phraseArrayShow = Array.from(phraseNodeShow);

    if (phraseArrayShow.length === phraseArrayLetter.length) {
        overlay.className = 'win';
        overlay.style.display = 'flex'
        overlay.querySelector('h2.title').textContent = 'You Win';
        startGame.textContent = 'Play Again?'
    } else if ( missed >= 5 ) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.querySelector('h2.title').textContent = 'You Lose';
        startGame.textContent = 'Play Again?'
    };
};

//Start button event listener, removes overlay on click
startGame.addEventListener('click', (e) => {
    if (startGame.textContent === 'Start Game')
        overlay.style.display = 'none';
    else {
        document.location.reload();
    };
});

qwerty.addEventListener('click', (button) => {
    let letter = button.target.innerHTML;
    checkLetter(letter);
    if (match === letter) {

    } else {
        missed = missed + 1;
        hearts[missed - 1].style.display = 'none';
    }
    checkWin();
});
