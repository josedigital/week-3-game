// declare variables
var hangman,
    guessCount,
    html,
    losses = 0,
    prevWord,
    spaces = [],
    userGuess,
    userGuesses = [],
    wins = 0,
    wordArray,
    wordToGuess;


hangman = {

  // word bank
  wordbank: ['test', 'one', 'two'],

  congrats: ['Nice one!', 'Good job!', 'Way to go!'],

  // initiate game
  init: function() {

    // pick a random word from the wordbank array
    wordToGuess = this.wordbank[Math.floor(Math.random() * this.wordbank.length)];
    console.log(wordToGuess);

    
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






    document.onkeyup = function(event) {
      
      // store the user's guess
      userGuess = String.fromCharCode(event.keyCode).toLowerCase();



      if(wordArray.indexexOf(userGuess) !== -1) { // if the letter is in the word
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

    if(userGuesses.indexOf(userGuess) !== -1) {
        alert('you already guessed that');
      } else {
        guessCount--;
        userGuesses.push(userGuess);
      }
  },



  win: function() {
    if(wordArray.toString() === spaces.toString()) {
      wins++;
      this.reset();
    }
    
  },


  lose: function() {
    if(guessCount === 0) {
      losses++;
      this.reset();
    }
  },



  reset: function() {
    // reset spaces
    spaces = [];
    // set wrongGuess to 0
    userGuesses = [];
    // restart game
    this.init();
  },


  record: function() {
    html = '<p>Wins: ' + wins + '</p>' +
           '<p>Losses: ' + losses + '</p>' +
           '<p>Guesses left: ' + guessCount + '</p>' +
           '<p>Your Guesses so far: <span class="uppercase guesses">' + userGuesses + '</span></p>';
    document.querySelector('#game').innerHTML = html;
  }







}


hangman.init();