// declare variables
var hangman,
    guessCount,
    guessesLeft,
    html,
    losses = 0,
    spaces = [],
    userGuess,
    userGuesses = [],
    rightGuesses,
    wins = 0,
    wrongGuesses = [],
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
    // guessCount = wordArray.length;
    guessCount = 12;

    // set indicator to 0
    document.querySelector('.indicator').className = 'indicator';





    document.onkeyup = function(event) {
      
      // store the user's guess
      userGuess = String.fromCharCode(event.keyCode).toLowerCase();

      

      if(wordArray.indexOf(userGuess) !== -1) {
        hangman.writeLetters(wordArray, userGuess);
      } else { // if it is not in word:
        hangman.notInWord();

      }

      // check for a win
      hangman.win();
      
      // check for a lose
      hangman.lose();

      // write to DOM
      hangman.record();

      
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

        }
      }
  },

  notInWord: function() {
    // grow indicator if wrong guess
    document.querySelector('.indicator').className = 'indicator w-'+guessCount;  

    if(userGuesses.indexOf(userGuess) !== -1) {
        // document.querySelector('.error').innerHTML = 'You have already guessed that letter.'
        document.querySelector('.error').className = 'error visible';
        guessCount++;
        document.querySelector('.indicator').className = 'indicator w-'+guessCount;  
        console.log('you already guessed that');
        guessCount--;
      } else {
        document.querySelector('.error').className = 'error';
        guessCount--;
        userGuesses.push(userGuess);
      }    
  },



  win: function() {
    if(wordArray.toString() === spaces.toString()) {
      wins++;
      document.querySelector('.win').play();
      hangman.reset();
    }
    
  },


  lose: function() {
    if(guessCount === 0) {
      losses++;
      document.querySelector('.lose').play();
      hangman.reset();
    }
  },



  reset: function() {
    // reset spaces
    spaces = [];
    // set wrongGuess to 0
    userGuesses = [];
    // restart game
    hangman.init();
  },


  record: function() {
    html = '<p>Wins: ' + wins + '</p>' +
           '<p>Losses: ' + losses + '</p>' +
           '<p>Guesses left: ' + guessCount + '</p>' +
           '<p>Your Guesses so far: <span class="uppercase">' + userGuesses + '</span></p>';
    document.querySelector('#game').innerHTML = html;
  }







}


hangman.init();