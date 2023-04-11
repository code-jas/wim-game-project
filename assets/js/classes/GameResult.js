class GameResult {
   constructor(playerName, difficultyLevel, levelNumber, accuracy, score, correctAnswers, incorrectAnswers, timePerQuestion, timestamp) {
      this.playerName = playerName;
      this.difficultyLevel = difficultyLevel;
      this.levelNumber = levelNumber;
      this.accuracy = accuracy;
      this.score = score;
      this.correctAnswers = correctAnswers;
      this.incorrectAnswers = incorrectAnswers;
      this.timePerQuestion = timePerQuestion;
      this.timestamp = timestamp;
   }
}

// const result = new GameResult("John", "Intermediate", 3, 0.85, 150, 17, 3, [12, 8, 11, 10, 13, 9, 14, 10, 11, 12], "2022-04-10T12:34:56.789Z");


// console.log(result.playerName);  // John
// console.log(result.score);  // 150
// console.log(result.timePerQuestion);  // [12, 8, 11, 10, 13, 9, 14, 10, 11, 12]
