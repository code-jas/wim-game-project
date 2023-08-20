# wim-game-project 




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
It is a type of visual puzzle that presents an image and provides a set of options for a corresponding word that best matches or describes the image.

### How to Play

To play Image/Word Match, simply select a game mode and begin playing. The game will present a grid of image and a list of words. Use your mouse to select the correct word for each image. If you're correct the word will be highlighted and the image will be removed from the grid. If you're incorrect the word will remain and you'll have to try again.

1. Analyze the image presented by the game.
2. Carefully read the different word options provided.
3. Use the visual hint to narrow down the options.
4. Select the word option that best describes the image.

### Features

-Multiple Players
-Different of levels of difficulty
-Beautiful graphics and animations
-Easy to use interface

### Scoring System

Scoring System

Completing a level gives 200 points.

Completing a level in Easy, Medium and Hard gives a bonus points of 100, 200, and 300 respectively.

Time Bonus Points is calculated as Base Points * [1 - (time taken / 15 Seconds)]

Every wrong answer on each level deducts 50 points to the total score

The total score is calculated as Base Points + Difficulty Points + Time Bonus Points - Number of wrong answer/s * 50
### Game Pictures



<!-- Scoring mechanism
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

difficultyBonusPoints = baseBonusPoints * difficultyMultiplier -->