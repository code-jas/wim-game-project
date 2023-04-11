export default class Player {
   constructor(playerName, highScore = 0, totalScore = 0, totalGameTime = 0, totalGamesPlayed = 0, accuracy = 0) {
      this.playerName = playerName;
      this.highScore = highScore;
      this.totalScore = totalScore;
      this.totalGameTime = totalGameTime;
      this.totalGamesPlayed = totalGamesPlayed;
      this.accuracy = accuracy;
   }

   toJSON() {
      return {
         playerName: this.playerName,
         highScore: this.highScore,
         totalScore: this.totalScore,
         totalGameTime: this.totalGameTime,
         totalGamesPlayed: this.totalGamesPlayed,
         accuracy: this.accuracy,
      };
   }

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
}