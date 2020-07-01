// Places array loaded from places.json - stores all place names, coordinates 
// to push to map and links to correct answer images

var places;

fetch('assets/scripts/places.json')
  .then(response => response.json())
  .then(data => places = data);

// Difficulty select object  

let selectedDifficulty = {
    difficulty: [],
    difficultySelected: function () {
        this.difficulty.push($("#difficultyStart option:selected").val());
    },
};

// randomisedArrays object ensures that on each playthrough the places array is 
// pushed to the page in a different order. This doesn't destroy the original 
// places array, allowing for implementation of a reset feature. Also stores 
// images for medium and hard difficulty levels in seperate arrays.

let randomisedArrays = {
    questionsOrder: [],
    questionsAnswer: [],
    locationImages: [],
    locationImagesHard: [],
    randomArrays: function () {
        // slice the whole array so as to not destroy places[]
        let placesSliced = places.slice();
        for (let i = 0; i < places.length; i++) {
            // shuffledPlaces is a randomly selected object from the place array
            // index is the position of shuffledPlaces in the placesSliced array
            // this index is then used to remove items from the array to avoid 
            // duplicates on shuffling  
            let shuffledPlaces = placesSliced[Math.floor(Math.random() *
                placesSliced.length)];
            let index = placesSliced.indexOf(shuffledPlaces);
            placesSliced.splice(index, 1);
            // all new arrays are filled with various different pieces of data 
            // from places[]                                                         
            if (selectedDifficulty.difficulty.includes("easy")) {
                this.questionsOrder.push(shuffledPlaces.coordinates_2);
                this.questionsAnswer.push(shuffledPlaces.street_view_image_link[1]);
                this.locationImages.push(shuffledPlaces.street_view_image_link[0],
                    shuffledPlaces.street_view_image_link[2],
                    shuffledPlaces.street_view_image_link[3]);
            } else if (selectedDifficulty.difficulty.includes("hard")) {
                this.questionsOrder.push(shuffledPlaces.coordinates);
                this.questionsAnswer.push(shuffledPlaces.street_view_image_link[0]);
                // pushes these two items as an array to create a nested array of 
                // images to be used in the hard difficulty setting
                this.locationImagesHard.push([shuffledPlaces.street_view_image_link[3],
                shuffledPlaces.street_view_image_link[4]]);
            }
        }
    }
};

// global counter keeps track of the level and ensures that the correct image is 
// always loaded to one of the target divs - its value is used in several 
// subsequent objects

let globalCounter = {
    counter: 0,
    incrementCounter: function () {
        if (this.counter < randomisedArrays.questionsOrder.length) {
            this.counter++;
        };
    },
};

// Map is loaded when clicking start game button from either welcome or reset modal
// loads places for each question from the randomly ordered array
// listens for clicks on divs that contain images and goes the next location in the 
// questionsOrder array, causing the map to pin and pan to new marker

function initMap() {
    var options = {
        zoom: 16,
        center: randomisedArrays.questionsOrder[globalCounter.counter],
    }

    var map = new google.maps.Map(document.getElementById("map"), options);

    var marker = new google.maps.Marker({
        position: randomisedArrays.questionsOrder[globalCounter.counter],
        map: map,

    });

    google.maps.event.addDomListener(streetview1, "click", function () {
        marker.setMap(null);
        new google.maps.Marker({
            // the + 1 in the code here prevents a bug - if removed, the map lags 
            // behind the images in the array it seems to be caused (as far as I can 
            // tell) by some sort of conflict between jQuery and Google Maps the code 
            // should not trigger this bug, but if the pictures have "onClick" attached 
            // to them when pushed to the DOM by jQuery rather than using a jQuery 
            // selector to trigger all the methods, the bug is not present
            position: randomisedArrays.questionsOrder[globalCounter.counter + 1],
            map: map,
        });
        map.panTo(randomisedArrays.questionsOrder[globalCounter.counter + 1]);
        map.setZoom(16);
    });
    google.maps.event.addDomListener(streetview2, "click", function () {
        marker.setMap(null);
        new google.maps.Marker({
            position: randomisedArrays.questionsOrder[globalCounter.counter + 1],
            map: map,
        });
        map.panTo(randomisedArrays.questionsOrder[globalCounter.counter + 1]);
        map.setZoom(16);
    });
    google.maps.event.addDomListener(streetview3, "click", function () {
        marker.setMap(null);
        new google.maps.Marker({
            position: randomisedArrays.questionsOrder[globalCounter.counter + 1],
            map: map,
        });
        map.panTo(randomisedArrays.questionsOrder[globalCounter.counter + 1]);
        map.setZoom(16);
    });
};

// Quiz objects
// pictureShuffler contains everything needed to randomise image selection and 
// target divs on each playthrough
// shufflePictures method selects a random target div for each city image 
// randomOne and randomTwo methods are random number generators that run a 
// random number generator while the output of them is equivalent to the global 
// counter or each other, resulting in three
// different numbers. 

let pictureShuffler = {
    // unlike the handling of the places array, ABC[] is shuffled in-place
    ABC: [0, 1, 2],
    shufflePictures: function (array) {
        // this is a JS version of the Durstenfeld shuffle, source for this
        // piece of code in README.md
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },
    randomOne: 0,
    generateRandomOne: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            // generate a different random number if same as counter
            do {
                this.randomOne = Math.floor(Math.random() *
                    randomisedArrays.locationImages.length);
            } while (this.randomOne === globalCounter.counter);
        }
    },
    randomTwo: 0,
    generateRandomTwo: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            // generate a different random number if same as counter AND/OR 
            // randomOne - source for this snippet in README.md
            do {
                this.randomTwo = Math.floor(Math.random() *
                    randomisedArrays.locationImages.length);
            } while (this.randomTwo === globalCounter.counter ||
                this.randomTwo === this.randomOne);
        }
    }
};

// picturePusher object targets the divs, loads images to DOM and removes images 
// after each question. Image ID is used to calculate score on hard difficulty.
// else if statements are used to load correct images for both difficulty levels

let picturePusher = {
    pictureTarget: ["#streetview1", "#streetview2", "#streetview3"],
    gameStart: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            $(`${this.pictureTarget[pictureShuffler.ABC[0]]}`)
                .prepend(`<img id="correct" class="streetviewImg" 
            src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${this.pictureTarget[pictureShuffler.ABC[1]]}`)
                .prepend(`<img id="incorrect" class="streetviewImg" 
            src="${randomisedArrays.locationImages[pictureShuffler.randomOne]}" />`);
            $(`${this.pictureTarget[pictureShuffler.ABC[2]]}`)
                .prepend(`<img id="nearlyCorrect" class="streetviewImg" 
            src="${randomisedArrays.locationImages[pictureShuffler.randomTwo]}" />`);
        } else if (selectedDifficulty.difficulty.includes("hard")) {
            $(`${this.pictureTarget[pictureShuffler.ABC[0]]}`)
                .prepend(`<img id="correct" class="streetviewImg" 
            src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${this.pictureTarget[pictureShuffler.ABC[1]]}`)
                .prepend(`<img id="incorrect" class="streetviewImg" 
            src="${randomisedArrays.locationImagesHard[globalCounter.counter][1]}" />`);
            $(`${this.pictureTarget[pictureShuffler.ABC[2]]}`)
                .prepend(`<img id="nearlyCorrect" class="streetviewImg" 
            src="${randomisedArrays.locationImagesHard[globalCounter.counter][0]}" />`);
        }
    },
    nextQuestion: function () {
        $("#incorrect").remove();
        $("#correct").remove();
        $("#nearlyCorrect").remove();
    },
    nextQuestionSet: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            $(`${this.pictureTarget[pictureShuffler.ABC[0]]}`)
                .prepend(`<img id="correct" class="streetviewImg" 
            src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${this.pictureTarget[pictureShuffler.ABC[1]]}`)
                .prepend(`<img id="incorrect" class="streetviewImg" 
            src="${randomisedArrays.locationImages[pictureShuffler.randomOne]}" />`);
            $(`${this.pictureTarget[pictureShuffler.ABC[2]]}`)
                .prepend(`<img id="nearlyCorrect" class="streetviewImg" 
            src="${randomisedArrays.locationImages[pictureShuffler.randomTwo]}" />`);
        } else if (selectedDifficulty.difficulty.includes("hard")) {
            $(`${this.pictureTarget[pictureShuffler.ABC[0]]}`)
                .prepend(`<img id="correct" class="streetviewImg" 
            src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${this.pictureTarget[pictureShuffler.ABC[1]]}`)
                .prepend(`<img id="incorrect" class="streetviewImg" 
            src="${randomisedArrays.locationImagesHard[globalCounter.counter][1]}" />`);
            $(`${this.pictureTarget[pictureShuffler.ABC[2]]}`)
                .prepend(`<img id="nearlyCorrect" class="streetviewImg" 
            src="${randomisedArrays.locationImagesHard[globalCounter.counter][0]}" />`);
        }
    }
};

// Calculate level

function calculateLevel() {
    if ((globalCounter.counter + 1) > 5) {
        // gameOver triggered on completion of level 5
        gameOver();                               
    } else {
        return globalCounter.counter + 1;
    }
};

// Calculate score

let calculatePlayerScore = {
    playerScore: [],
    nearlyCorrect: [],
    calculateScore: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            return this.playerScore.length * 10;
        } else if (selectedDifficulty.difficulty.includes("hard")) {
            return ((this.playerScore.length * 10) + (this.nearlyCorrect.length * 5))
        }
    }
}

// Countdown timer

let countdownTimer = {
    timeRemaining: 0,
    counter: 0,
    timerInterval: 0,
    countdownDifficulty: function () {      
        // select how long countdown timer lasts for each level according to difficulty                            
        if (selectedDifficulty.difficulty.includes("easy")) {
            this.timeRemaining = 30;
        } else if (selectedDifficulty.difficulty.includes("hard")) {
            this.timeRemaining = 15;
        }
    },
    countdown: function () {
        // this.timeRemaining stays constant - this.counter is equivalent 
        // to this.timeRemaining when beginning countdown clear interval resets 
        // timer each time countdownTimer.countdown is used
        this.counter = this.timeRemaining;                              
        clearInterval(this.timerInterval);                              
        this.timerInterval = setInterval(() => {
            this.counter--;
            if (this.counter < 0) {
                // timer stops at 0 and gameOver function triggered 
                // if player left game alone
                clearInterval(this.timerInterval);                      
                gameOver();
            }
        }, 1000);
    }
}

// display level 

function displayLevel() {
    let level = calculateLevel();
    if ((globalCounter.counter + 1) > 5) {
        $("#level").empty();
    } else {
        $("#level").empty().html(`${level}`);
    }
};

// display score and have it ready on game over modal

function displayScore() {
    let score = calculatePlayerScore.calculateScore();
    $("#score").empty().html(`${score}`);
    $("#endGameScore").empty().html(`${score}`);
}

// display countdown

function displayCountdown() {
    setInterval(function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            $("#countdownTimer").val(`${countdownTimer.counter}`);
        }
        else if (selectedDifficulty.difficulty.includes("hard")) {
            $("#countdownTimer").val(`${countdownTimer.counter * 2}`);
        }
    }, 500);
}

// Game over

function gameOver() {
    picturePusher.nextQuestion();
    $("#gameOverModal").modal('show');
    clearInterval(countdownTimer.timerInterval);
}

// Reset function - resets every array except places[], all counters and random 
// number generators, and loads the reset modal which allows the player to start again

function resetAll() {
    selectedDifficulty.difficulty = [];
    randomisedArrays.questionsOrder = [];
    randomisedArrays.questionsAnswer = [];
    randomisedArrays.locationImages = [];
    randomisedArrays.locationImagesHard = [];
    calculatePlayerScore.playerScore = [];
    calculatePlayerScore.nearlyCorrect = [];
    globalCounter.counter = 0;
    pictureShuffler.randomOne = 0;
    pictureShuffler.randomTwo = 0;
    $("#score").empty().html("0");
    $("#level").empty().html("0");
    $("#endGameScore").empty().html("0");
    picturePusher.nextQuestion();
    $("#welcomeModal").modal("show");
};

// handlers object to keep code neater

var handlers = {
    gameStart: function () {
        selectedDifficulty.difficultySelected();
        randomisedArrays.randomArrays();
        pictureShuffler.shufflePictures(pictureShuffler.ABC);
        pictureShuffler.generateRandomOne();
        pictureShuffler.generateRandomTwo();
        picturePusher.gameStart();
        countdownTimer.countdownDifficulty();
        countdownTimer.countdown();
        displayCountdown();
        displayLevel();
    },
    nextQuestion: function () {
        globalCounter.incrementCounter();
        pictureShuffler.shufflePictures(pictureShuffler.ABC);
        pictureShuffler.generateRandomOne();
        pictureShuffler.generateRandomTwo();
        picturePusher.nextQuestion();
        picturePusher.nextQuestionSet();
        countdownTimer.countdownDifficulty();
        countdownTimer.countdown();
        displayCountdown();
        displayLevel();
    },
};

// jQuery event handlers

$(document).ready(function () {
    $("#welcomeModal").modal('show');
    $(document).on("click", "#startGame", function () {
        handlers.gameStart();
        initMap();
    })
});

$(document).on("click", "img", function () {
    handlers.nextQuestion();
});

$(document).on("click", "#reset", function () {
    resetAll();
});

$(document).on("click", "#playAgain", function () {
    resetAll();
});

$(document).on("click", "#correct", function () {
    calculatePlayerScore.playerScore.push(1);
    displayScore();
});

$(document).on("click", "#nearlyCorrect", function () {
    calculatePlayerScore.nearlyCorrect.push(1);
    displayScore();
});