var buttons = document.querySelectorAll('#qwerty');
var phrase = document.querySelector('#phrase ul');
var startGame = document.querySelector('.btn__reset')
var overlay = document.querySelector('#overlay');
var hearts = document.querySelectorAll('.tries');
var missed = 0;
let match = "";

//Phrases to be picked from for word game
var phrases = [ 'chicken', 'turtle', 'tiger shark', 'sheep', 'ostrich'];
//function to pick random number and corresponding word in array
function getRandomPhraseAsArray (e) {
        let randomNumber = Math.floor( Math.random() * e.length );
        let chosenPhrase = phrases[randomNumber];
        let letters = chosenPhrase.split('');
        return letters;
};

const input = getRandomPhraseAsArray(phrases);

//Function to set display of chosen word and how to display space vs letter
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

//Checks the chosen letter against the chosen phrase, to be called in a latter function on button click. If click on div, match does not change
function checkLetter (letter) {
    let phraseNode = document.querySelectorAll('ul li');
    let phraseArray = Array.from(phraseNode);
    console.log(letter.length);
    if (letter.length <= 1) {
        for (i = 0; i < phraseArray.length; i++) {
            if (letter === phraseArray[i].innerHTML) {
                phraseArray[i].className = "show";
                match = "correct";
            };
        };

        if (match !== "correct") {
            match = "wrong"
        };
    } else {
            return match
    }
}

const phraseNodeLetter = document.querySelectorAll('li.letter');
const phraseArrayLetter = Array.from(phraseNodeLetter);
//If user has "missed" 5 times the game is lost, if the number of showing letters matches the length of the chosen phrase it is a win. If no win or loss, resets value of match
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
    } else {
        match = "";
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

//listener for buttons. Calls checkLetter function to either change the display if a letter matches or remove a heart if letter does not match and add one to the missed counter. check for win after each click. 
qwerty.addEventListener('click', (button) => {
    let letter = button.target.innerHTML;
    checkLetter(letter);
    if (match === "correct") {
        button.target.className = "chosen";
    } else if (match === "wrong" ) {
        button.target.className = "incorrect";
        missed = missed + 1;
        hearts[missed - 1].firstChild.src = 'images/lostHeart.png';
    }
    button.target.disabled = true;
    checkWin();
});