// declare variables
var userGuess,
    userGuesses = [],
    computerGuess,
    wins = 0,
    losses = 0,
    guessCount = 9,
    letters,
    randomNum,
    html;


// letters array
letters = ("abcdefghijklmnopqrstuvwxyz").split("");


// initiate game
function init() {

  // generate a random number
  randomNum = Math.floor(Math.random()*letters.length);
  
  // pick a letter and store it
  computerGuess = letters[randomNum];

  // guesses start at 9
  guessCount = 9;

  // reset user guesses
  userGuesses = [];

}

// reset all variables
function reset() {
  guessCount = 9;
}

// if the player wins
function win() {
  wins++;
  init();
  record();
  console.log('you win! total wins: ' + wins);
}

// if the player loses
function lose() {
  losses++;
  init();
  record();
  console.log('sorry, you lose. total losses: ' + losses);
}


function record() {
  html = '<p>Wins: ' + wins + '</p>' +
         '<p>Losses: ' + losses + '</p>' +
         '<p>Guesses left: ' + guessCount + '</p>' +
         '<p>Your Guesses so far: ' + userGuesses + '</p>';
  document.querySelector('#game').innerHTML = html;
}



// check for key event
document.onkeyup = function(event) {

  // keyup means a guess is used up so subtract
  guessCount--;
  console.log('guesses left: ' + guessCount);

  // store the user's guess
  userGuess = String.fromCharCode(event.keyCode).toLowerCase();
  // add userVuess to userGuesses
  userGuesses.push(userGuess);
  // record the guess to the document
  record();

  
  if(userGuess === computerGuess)
  {
    win();
  } else if(guessCount === 0) {
    lose();
  } else {
    // give people a chance to cheat:
    console.log(userGuess + ' is not the same as ' + computerGuess);
  }


}



// initiate game
init();