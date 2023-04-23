# wim-game-project - 90% complete

## To improve - Still Progress
*Fix small Details in dashboard


## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
# Image/Word Match

## About the Game

"Image/Word Match" is a game that challenges players to match images with their corresponding words. The game presents a grid of images and a list of words, and players must select the correct word for each image. The game can be played in various modes, including timed mode or with different levels of difficulty.

### How to Play

To play Image/Word Match, simply select a game mode and begin playing. The game will present a grid of image and a list of words. Use your mouse to select the correct word for each image. If you're correct the word will be highlighted and the image will be removed from the grid. If you're incorrect the word will remain and you'll have to try again.

### Features

-Multiple game modes
-Different of levels of difficulty
-Beautiful graphics and animations
-Easy to use interface

### Scoring System

Points are awarded for each correct match. the score is based on the difficulty level and the time taken to complete the game. Scores are displayed together with the user name on the Dashboard.

### Game Pictures



Scoring mechanism
data => baseScore    -    represents the base score for the level
        bonusPoints  -   represents any additional points earned during the level
        timePenalty  -   represents a penalty for taking too much time to complete the level.
      timeRatio = timeTaken / maxTime;

      base score = 200 

      Bonus points: 
      Time bonus points = baseBonusPoints * (1 - timeRatio);
      Difficulty bonus points easy=100 , medium=200 , hard=300

      Deduction poinst =  Number of wrong answer * 50

      Final Score per questions  = base score + difficulty bonus points + time bonus points - deduction points;
      






Time-Based Bonus Points
- award points based on the amount of time remaining on the timer when the level is completed. 

timeBonusPoints = maxTimeBonusPoints * (1 - timeRatio)

In this formula, maxTimeBonusPoints represents the maximum bonus points that can be earned for completing the level quickly, and timeRatio represents the ratio of time taken to complete the level to the maximum allowed time. The timeRatio value will be between 0 and 1, with 0 representing completing the level within the maximum allowed time and 1 representing taking the full maximum allowed time to complete the level.

You can adjust the maxTimeBonusPoints value and the specific time limit for your game to suit your needs.

Difficulty-Based Bonus Points
- award bonus points for completing the level on a higher difficulty level. 

difficultyBonusPoints = baseBonusPoints * difficultyMultiplier