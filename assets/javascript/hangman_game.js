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
    
    // write to document
    document.querySelector('.spaces').innerHTML = spaces.join('');
    



    // set guessCount to length of wordArray
    guessCount = wordArray.length;



    // set wrongGuess to 0
    wrongGuesses = [];


    document.onkeyup = function(event) {
      
      // store the user's guess
      userGuess = String.fromCharCode(event.keyCode).toLowerCase();

      if(wordArray.indexOf(userGuess) !== -1) {
        hangman.writeLetters(wordArray, userGuess);
      } else { // if it is not in word:
        guessCount--;
        console.log('incorrect guess ' + guessCount);
      }

      
      hangman.wins(spaces);
      

      
    }

  },




  writeLetters: function(word, letter) {
      // check if userGuess is in wordArray
      for(var i = 0; i < word.length; i++) {
        if (letter === word[i]) {
          
          // if letter is in word, add it to spaces array at appropriate index
          spaces.splice(i, 1, letter);
          
          
          // write to document
          document.querySelector('.spaces').innerHTML = spaces.join('');

        };
      }
  },



  wins: function(activeArray) {
    if(wordArray.toString() === activeArray.toString()) {
      return true;
    }
    
  }



}


hangman.init();