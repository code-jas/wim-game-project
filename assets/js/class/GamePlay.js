// import Player from './Player.js';

export default class GamePlay {
   constructor(playerData, currentScore, currentAccuracy, currentDifficulty, currentLevel, timer, timeLeft, hintCount, attempts, correctAnswers, incorrectAnswers, timePerQuestion) {
      const { id, playerName, highScore, totalScore, totalGameTime, totalGamesPlayed, accuracy, selected, started, questionnaire, levelDonePerDifficulty } = playerData;
      this.player = playerData;
      this.currentScore = currentScore;
      this.currentAccuracy = currentAccuracy;
      this.currentDifficulty = currentDifficulty;
      this.currentLevel = currentLevel;
      this.timer = timer;
      this.timeLeft = timeLeft;
      this.hintCount = hintCount;
      this.attempts = attempts; // array
      this.correctAnswers = correctAnswers; // array
      this.incorrectAnswers = incorrectAnswers; //array
      this.timePerQuestion = timePerQuestion; // array
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
            console.log('timeLeft: ', timeLeft)
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

      let numIncorrectAttempts = 0;
      if (selectedChoice !== answerIndex) {
         this.incorrectAnswers.push(this.currentLevel);
         numIncorrectAttempts = this.incorrectAnswers.filter((val) => val === this.currentLevel).length;

         const pointsPerIncorrectAttempt = 50;
         const baseBonusPoints = 200;
         const POINTS_PER_INCORRECT_ATTEMPT = 50

         // difficulty bonus points
         const difficultyMultiplier = this.getDifficultyMultiplier();
         const difficultyBonusPoints = baseBonusPoints + difficultyMultiplier;
         console.log('difficultyBonusPoints: ', difficultyBonusPoints)


         // time bonus points
         const maxTimeBonusPoints = 200;
         const maxTime = 15;
         const timeTaken = maxTime - this.timeLeft;
         const timeRatio = timeTaken / maxTime;
         const timeBonusPoints = maxTimeBonusPoints * (1 - timeRatio);

         const attemptDeductionPoints = baseBonusPoints - (numIncorrectAttempts * pointsPerIncorrectAttempt)
         const finalScore = attemptDeductionPoints + difficultyBonusPoints + timeBonusPoints;

         console.log('finalScore: ', finalScore)

         // this.setCurrentScore(finalScore);
      } else {
         // this.correctAnswers.push(this.currentLevel);
      }

      // return selectedChoice === answerIndex;
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
}
