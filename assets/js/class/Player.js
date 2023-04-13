export default class Player {
   constructor(id, playerName, highScore, totalScore, totalGameTime, totalGamesPlayed, accuracy, selected, started, questionnaire) {
      this.id = id;
      this.playerName = playerName;
      this.highScore = highScore;
      this.totalScore = totalScore;
      this.totalGameTime = totalGameTime;
      this.totalGamesPlayed = totalGamesPlayed;
      this.accuracy = accuracy;
      this.selected = selected;
      this.started = started;
      this.questionnaire = questionnaire || {}; // Initialize to an empty object if not provided
   }

   // toJSON() {
   //    return {
   //       playerName: this.playerName,
   //       highScore: this.highScore,
   //       totalScore: this.totalScore,
   //       totalGameTime: this.totalGameTime,
   //       totalGamesPlayed: this.totalGamesPlayed,
   //       accuracy: this.accuracy,
   //    };
   // }

   addGameResult(score, gameTime) {
      this.totalGamesPlayed++;
      this.totalScore += score;
      this.totalGameTime += gameTime;

      if (score > this.highScore) {
         this.highScore = score;
      }
   }

   getAverageScore() {
      if (this.totalGamesPlayed === 0) {
         return 0;
      }

      return this.totalScore / this.totalGamesPlayed;
   }

   getWinLossRatio() {
      if (this.totalGamesPlayed === 0) {
         return 'N/A';
      }

      const totalWins = this.getNumberOfWins();
      const totalLosses = this.totalGamesPlayed - totalWins;

      return `${totalWins}:${totalLosses}`;
   }

   getNumberOfWins() {
      // Code to count the number of wins based on your game's rules.
      // This will depend on how you track wins and losses in your game.
   }

   getLastPlayed() {
      // Code to get the date and time of the last game played by this player.
      // This will depend on how you track game history for each player.
   }

   getPlayerId() {
      return this.id;
   }

   setPlayerId(value) {
      this.id = value;
   }

   getPlayerName() {
      return this.playerName;
   }

   setPlayerName(value) {
      this.playerName = value;
   }

   getHighScore() {
      return this.highScore;
   }

   setHighScore(value) {
      this.highScore = value;
   }

   getTotalScore() {
      return this.totalScore;
   }

   setTotalScore(value) {
      this.totalScore = value;
   }

   getTotalGameTime() {
      return this.totalGameTime;
   }

   setTotalGameTime(value) {
      this.totalGameTime = value;
   }

   getTotalGamesPlayed() {
      return this.totalGamesPlayed;
   }

   setTotalGamesPlayed(value) {
      this.totalGamesPlayed = value;
   }

   getAccuracy() {
      return this.accuracy;
   }

   setAccuracy(value) {
      this.accuracy = value;
   }

   getSelected() {
      return this.selected;
   }

   setSelected(value) {
      this.selected = value;
   }

   getStarted() {
      return this.started;
   }

   setStarted(value) {
      this.started = value;
   }

   getQuestions() {
      return this.questions;
   }

   setQuestions(value) {
      this.questions = value;
   }
}