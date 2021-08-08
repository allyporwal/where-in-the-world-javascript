# Where in the World...?

## Interactive Frontend Milestone Project

<hr>

Welcome to *Where in the World...?*

This is a simple game written in JavaScript that makes use of the Google Maps API. This single page website is intended to showcase basic JavaScript and provide an entertaining few minutes for the user.

The game was deployed to Github Pages and [can be found here](https://allyporwal.github.io/where-in-the-world-javascript/).

The goal was to produce a game that would:

1. entertain the user while testing their knowledge of various world cities
2. use the Google Maps API in a seamless and fully integrated fashion
3. show the user some famous tourist spots in major world cities and some more unknown spots in others
4. give the user a chance to play in hard or easy modes, depending on their choice
5. need only a single page and no browser refreshes or use of forward/back buttons; so if the user wants to restart the game they can do so without ever leaving the page

In a nutshell, the goal of the game is to click on the correct street view picture that is taken from the exact location pinned on the Google Map. Each playthrough shows the player 5 locations and scores them according to their answer. The player can restart at any time and has two difficulty settings to choose from. 

<hr>

## User Experience

### Strategy

The app is deliberately simplistic in layout and presentation. This is to ensure that anyone from anywhere in the world can play and also helps the page remain responsive to the user's inputs.

### Scope

The website exists primarily as a milestone project for the Code Institute diploma, but also as something that can provide a diverting five minutes for an interested player. It's nice to feel like you're *kind of* going away during lockdown!

### Structure

The app is deliberately simple. It is simple enough that it can be played with very basic instructions. When the page has loaded the welcome modal pops up and gives the player instructions. On beginning the game, the map and pictures load, the countdown begins and it's game on!

### Skeleton

The wireframe for the app was done in Balsamiq and there are some subtle differences between the sketches and the finished app:

1. Pre-game wireframe

![pre-game wireframe](https://raw.githubusercontent.com/allyporwal/interactive-fontend-milestone/master/wireframes/Pre%20game.png)

2. In-game wireframe

![in-game wireframe](https://raw.githubusercontent.com/allyporwal/interactive-fontend-milestone/master/wireframes/Game%20in%20progress%20screen.png)

3. Post-game wireframe

![post-game wireframe](https://raw.githubusercontent.com/allyporwal/interactive-fontend-milestone/master/wireframes/Post%20game.png)

### Surface

The minimalist design is complemented with simple colour schemes and layout. 

<hr>

## Curent Features

1. Welcome modal that shows the player how to play the game
2. Google Maps API integration to display locations
3. Images dynamically loaded to the page when advancing from one level to the next
4. Two different difficulty settings, each with different scoring 
5. A countdown timer to impose a time limit on the game
6. A game over modal that shows the player their score and allows them to go again

## User story

The playing of the game is very simple:

1. Player selects a difficulty and begins game
2. A location is pinned on the Google Map and three pictures are loaded to the DOM
3. The user clicks or taps on the picture that they think is the street view from the location marked on the map before the countdown timer reaches 0
4. The next location and pictures are loaded and the player's score is calculated according their answer (max score is 50 in both difficulty settings)
   - in Easy mode the player scores 10 points for a correct answer or no points
   - in Hard mode the player scores 10 points for a correct answer, 5 points if close to the correct answer and 0 points for an incorrect answer (further information on difficulty settings below)
5. On completion of all 5 levels OR if the player runs out of time at any point the game over modal will display and allow them to retrn to step 1. Alternatively, the player can click the restart button to return to step 1. Multiple playthroughs are possible without ever needing to refresh the page

## A note on difficulty settings

The .json file containing all the 15 city objects contains two sets of coordinates for each city and five photos from each city. The easy difficulty has a totally random image selection, meaning there might be a repeat in the images. This allows a player to narrow down their guesses. The images shown are likely to be of completely different cities with different road layouts and buildings, making it easier to pick the correct answer.

The hard difficulty has three images all taken from within a few hundred metres of each other and might show the same landmark and/or road layout to challenge the player. In hard mode there is also only 15 seconds for each level rather than the 30 seconds given to the player in easy mode.

## Future Features

1. A larger array of places for the player to be shown
2. Different playing modes based around continents - for example, a mode on major European cities
3. A progressive level of difficulty that increases the toughness as each playthrough goes on

<hr>

## Deployment

This project was deployed on Github Pages by 

- Going to the Github repository settings 
- Scrolling to the Github Pages section 
- Selecting the "master branch" from the source dropdown menu and then letting the page automatically refresh.
- The link to the live site then became visible and it will update if any changes are made on the master branch of the repository.

The project can be cloned by 

- [Going to the repository on Github](https://github.com/allyporwal/interactive-fontend-milestone) 
- Clicking on the "Clone or download" button 
- The link to be copied will then be displayed 
- In your IDE, ensure you are in the correct directory and then type "git clone" followed by pasting the link 
- The repository will then be cloned into your chosen directory.

<hr>

## Testing 

All CSS and HTML code was tested using the [W3C Validator](https://validator.w3.org/) tools and passed without errors.

JavaScript syntax was checked online at [Esprima](https://esprima.org/demo/validate.html) and no errors were highlighted.

Whilst writing the JavaScript code I was careful to continually check for bugs that made the game unplayable or caused a bad user experience. The design is defensive to ensure that the player cannot have conflicting functions triggered simultaneously - for example, if the game over function did not cancel the countdown, the game over modal would appear on top of the welcome modal if the player clicked the restart button and then did not restart before the countdown timer reached 0. 

There were multiple tests performed upon completion of the app, to ensure a smooth UX that couldn't be broken by a rogue mouse click or finger tap.

| Element/function to test | Expected outcome | Result |
| ---- | :----: | :----: |
| Welcome modal | Modal should appear on page load on all devices and not disappear if screen behind modal pressed/tapped | Passed |
| Game start button | On pressing "START!" on the welcome modal the game should begin - Google Maps API loads, images are loaded, level and score displayed and the countdown timer begins | Passed |
| Countdown timer has correct value according to difficulty | The timer should give the player 30 seconds on easy mode and 15 seconds on hard mode | Passed |
| Countdown timer stops on game over | To avoid both modals being displayed at once, the game over function should reset the timer, meaning that the game over modal cannot appear in front of the welcome modal | Passed |
| Game over modal | Modal should appear on completion of level 5 and display correct score. Modal should not disappear if screen behind modal pressed/tapped | Passed |
| Play again button | Button should hide the game over modal, reset scores and re-load the welcome modal, allowing the player to play again on the same or a different difficulty | Passed |
| Score function | Score function should give 10 points per correct answer in easy and hard modes and 5 points for a close answer in hard mode only. Score should display correctly | Passed |

<hr>

When looking at the JavaScript code in [app.js](https://github.com/allyporwal/interactive-fontend-milestone/blob/master/assets/scripts/app.js), you will notice that there is an unexpected addition to the code on line 102. The addition of `+1` to the value of the global counter object's value in the code here prevents a bug - if removed, the map lags behind the images in the array by one place. It seems to be caused (I think) by some sort of conflict between jQuery and Google Maps. The code should not trigger this bug. If the pictures have "onClick" attached to them when pushed to the DOM by jQuery rather than using a jQuery selector to trigger all the methods, the bug is not present. The use of "onClick" is bad practice and pollutes the HTML, so solving this bug was important. The addition of `+1` on line 102 and subsequent lines was the best of a few possible fixes that I discovered.

<hr> 

The app has been tested on a variety of different devices and browsers.

1. iPhone XR

   - The app was tested on Safari, Firefox and Chrome and perfomed as intended in both vertical and horizontal orientations with one exception - the modal displayed on the game loading only scales and scrolls properly on Firefox; the other two browsers display the whole modal except the bottom few pixels when in vertical orientation, meaning the user has to scroll down to see the start button. With the device in horizontal orientation the app performs as expected. 

2. iPad Pro

    - The website was tested on Safari and performed as intended in both orientations

3. Acer Laptop with touchscreen

    - The website was tested on Firefox and Chrome and performed as intended in both touchscreen and normal mode 

4. 21.5 inch iMac with 1080p display

    - The website performed as intended on Chrome and Safari

5. iPhone 5, 6/7/8, 6/7/8 plus, iPad, various android phones, laptops and a 4K monitor were all simulated in Chrome Developer Tools to check for responsiveness

    - All performed as intended

<hr>

## Technologies used

1. HTML and CSS
2. JavaScript was used to program all the workings of the app
3. [JQuery](https://www.jQuery.com/) was used to inject content to the DOM and for event handling
4. [Bootstrap 4](https://getbootstrap.com/) was used to create the modals, buttons and navbar at the top that contains the title
5. [Gitpod](https://www/gitpod.io/) was the IDE used for the project
6. [Google Fonts](https://fonts.google.com) provided the fonts chosen for the project
7. [Balsamiq](https://balsamiq.com/) was used to create the basic wireframes

<hr>

## Credits

Several parts of the code were informed by snippets from various sources online.

1. The `do {} while;` loop in the `pictureShuffler` object was originally by [user Tasos K on Stack Overflow](https://stackoverflow.com/questions/25424602/how-to-generate-two-different-random-numbers)
2. The `randomisedArrays` object was built around the code by [Willem van der Veen on Stack Overflow](https://stackoverflow.com/questions/50525909/random-item-from-array-with-no-repeat-using-javascript/50528028)
3. The `countdownTimer` object was based on the code in this [freeCodeCamp blog post](https://www.freecodecamp.org/news/how-to-create-a-countdown-timer/)
4. The in-place shuffling of the array `ABC: [0, 1, 2],` in the `pictureShuffler` object is thanks to the Durstenfeld shuffle code written by [Laurens Holst and posted on Stack Overflow](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
5. On mobile devices the modal was causing problems - the CSS code [here by Lib Thoyib Basarah fixed the issue](https://stackoverflow.com/questions/25874001/how-to-put-scroll-bar-only-for-modal-body)

Big thanks to my mentor, Brian Macharia, for his help in this module.









