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
  // wordbank: ['test', 'one', 'two'],
  // wordbank: ['jazz','strengths','gypsy','rhythmic','cognac','jukebox','sprightly','asthma','orphan','months','czar','depths','geniuses','withhold','powwow','bookkeeper','kamikaze','fettuccine','quagmire','mannequin','caribou','skiing','queueing','symphony','crypt','wintry','twelfth','sequoia','gauntlet','zoology','unscrupulous','tympani','furlough','coffee','papaya','catchphrase','paprika','brouhaha','impromptu','cyclists','plateaued','cushion','alfalfa','jambalaya','ukulele','anchovy','messiah','buoyed','rendezvous'],
  wordbank: ["above","cap","belong","alone","change","both","answer","clock","bridge","bad","corn","building","been","cover","buy","bell","across","care","blow","along","city","breakfast","any","clothes","brought","bank","corner","busy","before","cross","air","almost","bicycle","also","always","bread","anything","arm","brother","beautiful","because","bus","behind","believe","can’t","better","carry","caught","bought","clean","climb","bright","cloud","cook","burn","count","country","cannot","cut","dance"],
  congrats: ['Nice one!', 'Good job!', 'Way to go!'],

  // initiate game
  init: function() {

    // pick a random word from the wordbank array
    wordToGuess = this.wordbank[Math.floor(Math.random() * this.wordbank.length)];
    console.log(wordToGuess);

    // congrats phrase
    congratulation = this.congrats[Math.floor(Math.random() * this.congrats.length)];
    
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
        // hide the revealed messeag
        document.querySelector('.reveal').className = 'reveal';
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
      // hide the previous word if user wins
      prevWord = congratulation;
      this.reset();
    }
    
  },


  lose: function() {
    if(guessCount === 0) {
      losses++;
      document.querySelector('.lose').play();
      // display the word if user loses
      prevWord = '<span>The previous word was</span> ' + wordToGuess;
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
    document.querySelector('.reveal').innerHTML = prevWord;
    document.querySelector('.reveal').className = 'reveal visible';
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