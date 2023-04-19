// import Player from './Player.js';

export default class GamePlay {
   constructor(playerData, currentScore, currentAccuracy, currentDifficulty, currentLevel, timer, timeLeft, hintCount, attempts, correctAnswers, scorePerDifficulty, timePerQuestion) {
      const { id, playerName, highScore, totalScore, totalGameTime, totalGamesPlayed, accuracy, selected, started, questionnaire, levelDonePerDifficulty } = playerData;
      this.player = playerData;
      this.currentScore = currentScore;
      this.currentAccuracy = currentAccuracy;
      this.currentDifficulty = currentDifficulty;
      this.currentLevel = currentLevel - 1;
      this.timer = timer;
      this.timeLeft = timeLeft;
      this.hintCount = hintCount;
      this.attempts = attempts; // array
      this.correctAnswers = correctAnswers; // array
      this.scorePerDifficulty = scorePerDifficulty; //array
      this.timePerQuestion = timePerQuestion; // array
      this.numIncorrectAttempts = 0;
   }

   showData() {
      console.log('this.player', this.player);
      console.log('this.currentScore', this.currentScore);
      console.log('this.currentDifficulty', this.currentDifficulty);
      console.log('this.currentLevel', this.currentLevel);
      console.log('this.timer', this.timer);
      console.log('this.timeLeft', this.timeLeft);
      console.log('this.hintCount', this.hintCount);

   }

   showTheCurrentQuestion() {
      const currentQuestions = this.player.questionnaire[this.currentDifficulty];
      console.log(currentQuestions)
      const picture = currentQuestions[this.currentLevel].picture;
      const choices = currentQuestions[this.currentLevel].choices;
      const answer = currentQuestions[this.currentLevel].answer;
      const hint = currentQuestions[this.currentLevel].hint;


      return { picture, hint, choices, answer };
   }

   startTheCurrentQuestion() {

      // Start the timer for this question
      this.countdownTimer(
         15,
         (timeLeft) => {
            // Update the time left
            // console.log('timeLeft: ', timeLeft)
            this.setTimeLeft(timeLeft);
         },
         () => {
            // Time is up, do nothing
         }
      );
   }

   checkAnswer(selectedChoice) {

      const currentQuestions = this.player.questionnaire[this.currentDifficulty];
      const answerIndex = currentQuestions[this.currentLevel].answer;


      let isCorrect = false;
      // Correct
      if (currentQuestions[this.currentLevel].choices[selectedChoice] === answerIndex) {
         this.player.levelDonePerDifficulty[this.currentDifficulty][this.currentLevel] = true;
         // console.log('levelDonePerDifficulty: ', this.player.levelDonePerDifficulty[this.currentDifficulty])

         this.scoring();

         isCorrect = true; // correct level
         this.correctAnswers.push(true); // correct level
         // if the totalGamesPlayed is  15, don't add the totalGamesPlayed
         if (this.player.totalGamesPlayed < 15) {
            this.player.totalGamesPlayed += 1; // Increment the number of games played
         } else {
            this.player.totalGamesPlayed = 15;
         }

         this.currentLevel += 1; // Increment the current level

         // display ui correct

         //
      } else { //Incorrect
         this.correctAnswers.push(false); // incorrect level   
         this.numIncorrectAttempts++; // Increment the number of incorrect attempts
         // console.log('numIncorrectAttempts: ', numIncorrectAttempts)
         // display ui incorrect
      }

      return {
         player: this.player,
         correctAnswers: this.correctAnswers,
         scorePerDifficulty: this.scorePerDifficulty,
         timePerQuestion: this.timePerQuestion,
         currentScore: this.getCurrentScore(),
         isCorrect: isCorrect,
         currentLevel: this.currentLevel
      };
   }

   endGame() {
      // Save the player data
      this.player.totalScore[this.currentDifficulty] = this.scorePerDifficulty.reduce((acc, result) => acc + result, 0);
      console.log('Total Score: ', this.player.totalScore)
      console.log('add score: ', this.scorePerDifficulty.reduce((acc, result) => acc + result, 0))
      this.player.highScore = this.getTotalScore() > this.player.highScore ? this.getTotalScore() : this.player.highScore;
      this.player.accuracy[this.currentDifficulty] = this.getAccuracy();

      console.log('Total Score: ', this.player.totalScore)
      console.log('High Score: ', this.player.highScore)
      console.log('Accuracy: ', this.player.accuracy)

      this.savePlayerData(this.player, this.player.id);
   }

   // Get Total Score
   getTotalScore() {
      let total = 0;

      for (const difficulty in this.player.totalScore) {
         if (Object.hasOwnProperty.call(this.player.totalScore, difficulty)) {
            total += this.player.totalScore[difficulty];
         }
      }

      return total;
   }

   // get the accuracy
   getAccuracy() {
      const total = this.correctAnswers.length;
      const correct = this.correctAnswers.filter(result => result).length;
      const accuracy = (correct / total) * 100;
      return Math.floor(accuracy)
   }


   formattedTime() {
      const minutes = 0; // Always 0 for 15 seconds
      const seconds = this.timeLeft;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
   }
   // formattedAccuracy() {
   //    const total = this.correctAnswers.length;
   //    const correct = this.correctAnswers.filter(result => result).length;
   //    const accuracy = (correct / total) * 100;
   //    return Math.floor(accuracy)
   // }
   // Save the player data
   savePlayerData(player, id) { // player - object
      // Retrieve the current players data from the localStorage
      const playersData = JSON.parse(localStorage.getItem('players'));

      // Find the player with the matching id
      const playerIndex = playersData.findIndex(p => p.id === id);

      // Update the player data
      playersData[playerIndex] = player;

      // Save the updated players data back to the localStorage
      localStorage.setItem('players', JSON.stringify(playersData));
   }
   scoring() {
      const pointsPerIncorrectAttempt = 50;
      const baseBonusPoints = 200;
      // difficulty bonus points
      // time bonus points
      const maxTime = 15;
      const timeTaken = maxTime - this.timeLeft;
      const timeRatio = timeTaken / maxTime;
      const timeBonusPoints = baseBonusPoints * (1 - timeRatio);

      const difficultyBonusPoints = this.getDifficultyMultiplier();
      const attemptDeductionPoints = this.numIncorrectAttempts * pointsPerIncorrectAttempt
      const finalScore = baseBonusPoints + difficultyBonusPoints + timeBonusPoints - attemptDeductionPoints;

      //! Testing
      // console.log('Base Points: ', baseBonusPoints)
      // console.log('Difficulty Points: ', difficultyBonusPoints)
      // console.log('Time Points: ', timeBonusPoints)
      // console.log('Attempt Deduction: ', attemptDeductionPoints)
      // console.log('Final: ', finalScore)


      this.timePerQuestion.push(timeTaken); // time taken per question
      this.setCurrentScore(Math.floor(finalScore)); // current score
      this.scorePerDifficulty.push(finalScore); // score per difficulty

      // reset 
      this.numIncorrectAttempts = 0;
      // console.log('finalScore: ', this.getCurrentScore())
      // console.log('array score: ', this.getScorePerDifficulty())
   }

   hasNextQuestion() {
      const currentQuestions = this.player.questionnaire[this.currentDifficulty];
      return currentQuestions.length > this.currentLevel;
   }


   getDifficultyMultiplier() {
      let difficultyMultiplier = 0;
      switch (this.currentDifficulty) {
         case 'easy':
            difficultyMultiplier = 100;
            break;
         case 'medium':
            difficultyMultiplier = 200;
            break;
         case 'hard':
            difficultyMultiplier = 300;
            break;
         default:
            console.log('Invalid difficulty level');
      }
      return difficultyMultiplier;
   }

   countdownTimer(timeLimit, onTick, onTimeUp) {
      let timeLeft = timeLimit;
      const timerId = setInterval(() => {
         timeLeft--;
         onTick(timeLeft);
         if (timeLeft === 0) {
            clearInterval(timerId);
            onTimeUp();
         }
      }, 1000);
   }


   getPlayer() {
      return this.player;
   }

   getCurrentDifficulty() {
      return this.currentDifficulty;
   }

   setCurrentDifficulty(value) {
      this.currentDifficulty = value;
   }

   getCurrentLevel() {
      return this.currentLevel;
   }

   setCurrentLevel(value) {
      this.currentLevel = value;
   }

   getCurrentScore() {
      return this.currentScore;
   }

   setCurrentScore(value) {
      this.currentScore = value;
   }

   getTimer() {
      return this.timer;
   }

   setTimer(value) {
      this.timer = value;
   }

   getTimeLeft() {
      return this.timeLeft;
   }

   setTimeLeft(value) {
      this.timeLeft = value;
   }

   getHintCount() {
      return this.hintCount;
   }

   setHintCount(value) {
      this.hintCount = value;
   }
   getScorePerDifficulty() {
      return this.scorePerDifficulty;
   }
   setScorePerDifficulty(value) {
      this.scorePerDifficulty = value;
   }
}
