// var arr = [];
// arr[0] = "Jani";
// arr[1] = "Hege";
// arr[2] = "Stale";
// arr[3] = "Kai Jim";
// arr[4] = "Borge";

// console.log(arr.join());
// arr.splice(2, 1, "Lene");
// console.log(arr.join());


// declare variables
var hangman,
    guessCount,
    guessesLeft,
    html,
    losses,
    spaces = [],
    userGuess,
    rightGuesses,
    wins,
    wrongGuesses,
    wordArray,
    wordToGuess;



hangman = {


  // word bank
  wordbank: ['test', 'one', 'two'],

  // initiate game
  init: function() {

    // pick a random word from the wordbank array
    wordToGuess = this.wordbank[Math.floor(Math.random() * this.wordbank.length)];

    
    // convert word to array
    wordArray = wordToGuess.split('');



    // create the spaces to represent word
    wordArray.forEach(function() {
      spaces.push('_');
    });
    // convert to string without commas
    spaces = spaces.join('');
    // write to document
    document.querySelector('.spaces').innerHTML = spaces;



    // set guessCount to length of wordArray
    guessCount = wordArray.length;



    // set rightGuesses to 0
    rightGuesses = [];



    // set wrongGuess to 0
    wrongGuesses = [];

    


    document.onkeyup = function(event) {
      
      // store the user's guess
      userGuess = String.fromCharCode(event.keyCode).toLowerCase();



      // check if the userGuess is a letter in the wordToGuess
      if(wordArray.indexOf(userGuess) !== -1) {

        // check if userGuess has already been logged
        if(rightGuesses.indexOf(userGuess) !== -1) {
          console.log('you already guessed that');
        } else {
          // userGuess is found in word, now count how many times and log it
          console.log(hangman.occur(wordToGuess, userGuess));

          console.log(hangman.logLetter(userGuess, wordArray));
          // check if all letters have been guessed
          
          
        }



      } else { // if it is not in word:
        
          // check if userGuess has already been logged
          if(wrongGuesses.indexOf(userGuess) !== -1) {
            // do nothing
            console.log('you already guessed that');
          } else {

            // wrong guess means take away 1 from total guesses
            guessCount--;
            console.log('guesses left: ' + guessCount);

            // check if guessCount is at 0
            if(guessCount === 0) {
              hangman.lose();
            }

            console.log(userGuess + ' is not found in ' + wordToGuess);
            // add userGuess to wrongGuesses
            wrongGuesses.push(userGuess);
            console.log(wrongGuesses);
          }
      

      }

      hangman.record();

    }



  },

  occur: function(arr, word) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === word) {
            rightGuesses.push(userGuess);
        }
    }
    return rightGuesses;
  },

  logLetter: function(letter, word) {
    var index = word.indexOf(letter);
    return index;
  },

  reset: function() {
    document.querySelector('#game').innerHTML = '<p>Type a letter to start a new game';
    this.init();
  },

  win: function() {
  },

  lose: function() {
    console.log('sorry, you lost.');
    hangman.reset();
  },

  record: function() {

    html = '<p>Wins: ' + wins + '</p>' + 
    '<p>Losses: '+ losses + '</p>' +
    '<p>Guesses left: ' + guessesLeft + '</p>' +
    '<p>Your Guesses so far: ' + wrongGuesses + '</p>';

    document.querySelector('#game').innerHTML = html;


  
  }


}



hangman.init();





