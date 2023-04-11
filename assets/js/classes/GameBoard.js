class GameBoard {
   constructor(words, images, difficulty, currentLevel = 1) {
      this.words = words;
      this.images = images;
      this.difficulty = difficulty;
      this.currentLevel = currentLevel
      this.currentWordIndex = 0;
      this.currentImageIndex = 0;
      this.score = 0;
      this.timer = null;
      this.timeLeft = null;
      this.hintCount = 3;
   }

   startGame() {
      this.shuffleArrays();
      this.resetGame();
      this.timer = setInterval(() => {
         if (this.timeLeft > 0) {
            this.timeLeft--;
         } else {
            this.endGame();
         }
      }, 1000);
   }

   resetGame() {
      this.currentLevel = 1;
      this.currentWordIndex = 0;
      this.currentImageIndex = 0;
      this.score = 0;
      this.timeLeft = this.getTimeLimit();
      this.hintCount = 3;
   }

   endGame() {
      clearInterval(this.timer);
      // Code to handle end of game, such as displaying the player's score and offering the option to play again.
   }

   shuffleArrays() {
      // Code to shuffle the words and images arrays to create a randomized game.
   }

   getCurrentWord() {
      return this.words[this.currentWordIndex];
   }

   getCurrentImage() {
      return this.images[this.currentImageIndex];
   }

   getTimeLimit() {
      // Code to get the time limit for the current level based on the game's difficulty setting.
      // This could be a fixed value or calculated based on the level number or other factors.
   }

   checkAnswer(answer) {
      if (answer.toLowerCase() === this.getCurrentWord().toLowerCase()) {
         this.score += this.getPoints();
         this.currentWordIndex++;
         this.currentImageIndex++;
         if (this.currentWordIndex === this.words.length) {
            this.endGame();
         }
      } else {
         this.hintCount--;
         if (this.hintCount === 0) {
            this.endGame();
         }
      }
   }

   getPoints() {
      // Code to calculate the points earned for a correct answer based on the game's scoring system.
   }

   getScore() {
      return this.score;
   }

   getHintCount() {
      return this.hintCount;
   }

   getCurrentLevel() {
      return this.currentLevel;
   }

   getProgress() {
      return `${this.currentWordIndex + 1}/${this.words.length}`;
   }
}