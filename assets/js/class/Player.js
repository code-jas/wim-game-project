export default class Player {
   constructor(id, playerName, highScore, totalScore, totalGameTime, totalGamesPlayed, accuracy, selected, started, questions) {
      this.id = id;
      this.playerName = playerName;
      this.highScore = highScore;
      this.totalScore = totalScore;
      this.totalGameTime = totalGameTime;
      this.totalGamesPlayed = totalGamesPlayed;
      this.accuracy = accuracy;
      this.selected = selected;
      this.started = started;
      this.questions = questions || {}; // Initialize to an empty object if not provided
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

   get playerName() {
      return this.playerName;
   }

   set playerName(value) {
      this.playerName = value;
   }

   get highScore() {
      return this.highScore;
   }

   set highScore(value) {
      this.highScore = value;
   }

   get totalScore() {
      return this.totalScore;
   }

   set totalScore(value) {
      this.totalScore = value;
   }

   get totalGameTime() {
      return this.totalGameTime;
   }

   set totalGameTime(value) {
      this.totalGameTime = value;
   }

   get totalGamesPlayed() {
      return this.totalGamesPlayed;
   }

   set totalGamesPlayed(value) {
      this.totalGamesPlayed = value;
   }

   get accuracy() {
      return this.accuracy;
   }

   set accuracy(value) {
      this.accuracy = value;
   }

   get selected() {
      return this.selected;
   }

   set selected(value) {
      this.selected = value;
   }

   get started() {
      return this.started;
   }

   set started(value) {
      this.started = value;
   }

   get questions() {
      return this.questions;
   }

   set questions(value) {
      this.questions = value;
   }





}