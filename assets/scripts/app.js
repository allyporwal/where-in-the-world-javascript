// Places array - stores all place names, coordinates to push to map and links to correct answer images
// coordinates_2 is used for easy difficulty

var places = [
    {
        name: "londonPicadilly",
        coordinates: { lat: 51.5099088, lng: -0.134969 },
        street_view_image_link: ["assets/img/londonPiccadilly.jpg", "assets/img/london2.jpg", "assets/img/london3.jpg", "assets/img/londonNearly.jpg", "assets/img/londonIncorrect.jpg"],
        coordinates_2: { lat: 51.5166884, lng: -0.1532064 },
    },
    {
        name: "barcelonaDiagonal",
        coordinates: { lat: 41.3977359, lng: 2.1632075 },
        street_view_image_link: ["assets/img/barcelonaDiagonal.jpg", "assets/img/barcelona2.jpg", "assets/img/barcelona3.jpg", "assets/img/barcelonaNearly.jpg", "assets/img/barcelonaIncorrect.jpg"],
        coordinates_2: { lat: 41.4083358, lng: 2.1705044 },
    },
    {
        name: "romePiazzavenezia",
        coordinates: { lat: 41.8957469, lng: 12.4826705 },
        street_view_image_link: ["assets/img/romePiazzavenezia.jpg", "assets/img/rome2.jpg", "assets/img/rome3.jpg", "assets/img/romeNearly.jpg", "assets/img/romeIncorrect.jpg"],
        coordinates_2: { lat: 41.9061756, lng: 12.4705072 },
    },
    {
        name: "milanDuomo",
        coordinates: { lat: 45.4646972, lng: 9.1894913 },
        street_view_image_link: ["assets/img/milanDuomo.jpg", "assets/img/milan2.jpg", "assets/img/milan3.jpg", "assets/img/milanNearly.jpg", "assets/img/milanIncorrect.jpg"],
        coordinates_2: { lat: 45.4657206, lng: 9.1718797 },
    },
    {
        name: "bristolSuspensionbridge",
        coordinates: { lat: 51.4551766, lng: -2.6252481 },
        street_view_image_link: ["assets/img/bristolSuspensionbridge.jpg", "assets/img/bristol2.jpg", "assets/img/bristol3.jpg", "assets/img/bristolNearly.jpg", "assets/img/bristolIncorrect.jpg"],
        coordinates_2: { lat: 51.4673504, lng: -2.5992505 },
    },
    {
        name: "dublinGuinness",
        coordinates: { lat: 53.34215, lng: -6.289821 },
        street_view_image_link: ["assets/img/dublinGuinness.jpg", "assets/img/dublin2.jpg", "assets/img/dublin3.jpg", "assets/img/dublinNearly.jpg", "assets/img/dublinIncorrect.jpg"],
        coordinates_2: { lat: 53.3415286, lng: -6.265984 },
    },
    {
        name: "nycE47thst",
        coordinates: { lat: 40.7548732, lng: -73.9742965 },
        street_view_image_link: ["assets/img/nycE47thst.jpg", "assets/img/nyc2.jpg", "assets/img/nyc3.jpg", "assets/img/nycNearly.jpg", "assets/img/nycIncorrect.jpg"],
        coordinates_2: { lat: 40.7578666, lng: -73.9853066 },
    },
    {
        name: "madridGoya",
        coordinates: { lat: 40.4241351, lng: -3.6772299 },
        street_view_image_link: ["assets/img/madridGoya.jpg", "assets/img/madrid2.jpg", "assets/img/madrid3.jpg", "assets/img/madridNearly.jpg", "assets/img/madridIncorrect.jpg"],
        coordinates_2: { lat: 40.3854827, lng: -3.7496872 },
    },
    {
        name: "berlinCheckpoint",
        coordinates: { lat: 52.5067303, lng: 13.3905375 },
        street_view_image_link: ["assets/img/berlinCheckpoint.jpg", "assets/img/berlin2.jpg", "assets/img/berlin3.jpg", "assets/img/berlinNearly.jpg", "assets/img/berlinIncorrect.jpg"],
        coordinates_2: { lat: 52.5042729, lng: 13.3597446 },
    },
    {
        name: "sydneyOconnell",
        coordinates: { lat: -33.8649517, lng: 151.2098745 },
        street_view_image_link: ["assets/img/sydneyOconnell.jpg", "assets/img/sydney2.jpg", "assets/img/sydney3.jpg", "assets/img/sydneyNearly.jpg", "assets/img/sydneyIncorrect.jpg"],
        coordinates_2: { lat: -33.8791052, lng: 151.1954087 },
    },
    {
        name: "vancouverPender",
        coordinates: { lat: 49.2843725, lng: -123.1143808 },
        street_view_image_link: ["assets/img/vancouverPender.jpg", "assets/img/vancouver2.jpg", "assets/img/vancouver3.jpg", "assets/img/vancouverNearly.jpg", "assets/img/vancouverIncorrect.jpg"],
        coordinates_2: { lat: 49.281903, lng: -123.131163 },
    },
    {
        name: "bangkokGrandpalace",
        coordinates: { lat: 13.7489321, lng: 100.4940658 },
        street_view_image_link: ["assets/img/bangkokGrandpalace.jpg", "assets/img/bangkok2.jpg", "assets/img/bangkok3.jpg", "assets/img/bangkokNearly.jpg", "assets/img/bangkokIncorrect.jpg"],
        coordinates_2: { lat: 13.7474395, lng: 100.523695 },
    },
    {
        name: "tokyoChuodori",
        coordinates: { lat: 35.6710284, lng: 139.7648783 },
        street_view_image_link: ["assets/img/tokyoChuodori.jpg", "assets/img/tokyo2.jpg", "assets/img/tokyo3.jpg", "assets/img/tokyoNearly.jpg", "assets/img/tokyoIncorrect.jpg"],
        coordinates_2: { lat: 35.6673361, lng: 139.6909901 },
    },
    {
        name: "capetownHof",
        coordinates: { lat: -33.9342388, lng: 18.4114601 },
        street_view_image_link: ["assets/img/capetownHof.jpg", "assets/img/capetown2.jpg", "assets/img/capetown3.jpg", "assets/img/capetownNearly.jpg", "assets/img/capetownIncorrect.jpg"],
        coordinates_2: { lat: -33.9249646, lng: 18.4200563 },
    },
    {
        name: "lagosAdetoKunbo",
        coordinates: { lat: 6.4341391, lng: 3.4306825 },
        street_view_image_link: ["assets/img/lagosAdetokunbo.jpg", "assets/img/lagos2.jpg",  "assets/img/lagos3.jpg",  "assets/img/lagosNearly.jpg", "assets/img/lagosIncorrect.jpg"],
        coordinates_2: { lat: 6.4543899, lng: 3.3877879 },
    }
];

// Difficulty select object  

let selectedDifficulty = {
    difficulty: [],
    difficultySelected: function () {
        this.difficulty.push($("#difficultyStart option:selected").val());
    },
};

// randomisedArrays object ensures that on each playthrough the places array is pushed to the page in a different order. This doesn't destroy the original places array, allowing 
// for implementation of a reset feature. Also stores images for medium and hard difficulty levels in seperate arrays.

let randomisedArrays = {
    questionsOrder: [],
    questionsAnswer: [],
    locationImages: [],
    locationImagesHard: [],
    randomArrays: function () {
        let placesSliced = places.slice();                                                        // slice the whole array so as to not destroy places[]
        for (let i = 0; i < places.length; i++) {                                                  
            let shuffledPlaces = placesSliced[Math.floor(Math.random() * placesSliced.length)];   // shuffledPlaces is a randomly selected object from the place array 
            let index = placesSliced.indexOf(shuffledPlaces);                                     // index is the position of shuffledPlaces in the placesSliced array
            placesSliced.splice(index, 1);                                                        // this index is then used to remove items from the array to avoid duplicates on shuffling 
            if (selectedDifficulty.difficulty.includes("easy")) {                                 // all new arrays are filled with various different pieces of data from places[]
                this.questionsOrder.push(shuffledPlaces.coordinates_2);         
                this.questionsAnswer.push(shuffledPlaces.street_view_image_link[1]);
                this.locationImages.push(shuffledPlaces.street_view_image_link[0], shuffledPlaces.street_view_image_link[2], shuffledPlaces.street_view_image_link[3]);
            } else if (selectedDifficulty.difficulty.includes("hard")) {
                this.questionsOrder.push(shuffledPlaces.coordinates);
                this.questionsAnswer.push(shuffledPlaces.street_view_image_link[0]);
                this.locationImagesHard.push([shuffledPlaces.street_view_image_link[3], shuffledPlaces.street_view_image_link[4]]);
            }
        }
    }
};

// global counter keeps track of the level and ensures that the correct image is always loaded to one of the target divs - its value is used in several subsequent objects

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
// listens for clicks on divs that contain images and goes the next location in the questionsOrder array, causing the map to pin and pan to new marker

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
            position: randomisedArrays.questionsOrder[globalCounter.counter + 1], // the + 1 in the code here prevents a bug - if removed, the map lags behind the images in the array
            map: map,                                                             // it seems to be caused (as far as I can tell) by some sort of conflict between jQuery and Google Maps
        });                                                                       // the code should not trigger this bug, but if the pictures have "onClick" attached to them, rather than using jQuery, the bug is not present
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

// Quiz objects - pictureTarget array holds the ID of the target div and jQuery is used to select the correct DOM element to push the images to in the picturePusher object

let pictureTarget = ["#streetview1", "#streetview2", "#streetview3"];

// pictureShuffler contains everything needed to randomise all images and target divs on each playthrough
// shufflePictures method selects a random target div for each city image 
// randomOne and randomTwo methods are random number generators that run a random number generator while the output of them is equivalent to the global counter or each other, resulting in three
// different numbers. 

let pictureShuffler = {
    ABC: [0, 1, 2],                                       // unlike the handling of the places array, ABC[] is shuffled in-place
    shufflePictures: function (array) {
        for (let i = array.length - 1; i > 0; i--) {      // this is a JS version of the Durstenfeld shuffle
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },
    randomOne: 0,
    generateRandomOne: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            do {
                this.randomOne = Math.floor(Math.random() * randomisedArrays.locationImages.length);   // generate a different random number if same as counter
            } while (this.randomOne === globalCounter.counter);
        }
    },
    randomTwo: 0,
    generateRandomTwo: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            do {
                this.randomTwo = Math.floor(Math.random() * randomisedArrays.locationImages.length);   // generate a different random number if same as counter AND/OR randomOne
            } while (this.randomTwo === globalCounter.counter || this.randomTwo === this.randomOne);
        }
    }
};

// picturePusher object targets the divs, loads images to DOM and removes images after each question. Image ID is used to calculate score on hard difficulty.
// else if statements are used to load correct images for both difficulty levels

let picturePusher = {
    gameStart: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" src="${randomisedArrays.locationImages[pictureShuffler.randomOne]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" src="${randomisedArrays.locationImages[pictureShuffler.randomTwo]}" />`);
        } else if (selectedDifficulty.difficulty.includes("hard")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" src="${randomisedArrays.locationImagesHard[globalCounter.counter][1]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" src="${randomisedArrays.locationImagesHard[globalCounter.counter][0]}" />`);
        }
    },
    nextQuestion: function () {
        $("#incorrect").remove();
        $("#correct").remove();
        $("#nearlyCorrect").remove();
    },
    nextQuestionSet: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" src="${randomisedArrays.locationImages[pictureShuffler.randomOne]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" src="${randomisedArrays.locationImages[pictureShuffler.randomTwo]}" />`);
        } else if (selectedDifficulty.difficulty.includes("hard")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" src="${randomisedArrays.locationImagesHard[globalCounter.counter][1]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" src="${randomisedArrays.locationImagesHard[globalCounter.counter][0]}" />`);
        }
    }
};

// Calculate level

function calculateLevel() {
    if ((globalCounter.counter + 1) > 5) {
        gameOver();                               // gameOver triggered on completion of level 5
    } else {
        return globalCounter.counter + 1;
    }
};

// Calculate score

var playerScore = [];

function calculateScore() {
    return playerScore.length * 10;
};

// Countdown timer

let countdownTimer = {
    timeRemaining: 0,
    counter: 0,
    timerInterval: 0,
    countdownDifficulty: function () {                                  // select how long countdown timer lasts for each level according to difficulty
        if (selectedDifficulty.difficulty.includes("easy")) {
            this.timeRemaining = 30;
        } else if (selectedDifficulty.difficulty.includes("hard")) {
            this.timeRemaining = 15;
        }
    },
    countdown: function () {
        this.counter = this.timeRemaining;                              // this.timeRemaining stays constant - this.counter is equivalent to this.timeRemaining when beginning countdown
        clearInterval(this.timerInterval);                              // clear interval resets timer each time countdownTimer.countdown is used
        this.timerInterval = setInterval(() => {                        
            this.counter--;
            if (this.counter < 0) {
                clearInterval(this.timerInterval);                      // timer stops at 0 and gameOver function triggered if player left game alone
                gameOver();
            }
        }, 1000);
    }
}

// display level and call gameOver function when level 5 complete

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
    let score = calculateScore();
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
            $("#countdownTimer").val(`${countdownTimer.counter * 2}`);   // 15 and 30 second countdown chosen so same progress bar could be used on both difficulties
        }
    }, 500);
}

// Game over

function gameOver() {
    picturePusher.nextQuestion();
    $("#gameOverModal").modal('show');
}

// Reset function - resets every array except places[], all counters and random number generators, and loads the reset modal which allows the player to start again

function resetAll() {
    selectedDifficulty.difficulty = [];
    randomisedArrays.questionsOrder = [];
    randomisedArrays.questionsAnswer = [];
    randomisedArrays.locationImages = [];
    randomisedArrays.locationImagesHard = [];
    playerScore = [];
    globalCounter.counter = 0;
    pictureShuffler.randomOne = 0;
    pictureShuffler.randomTwo = 0;
    $("#score").empty().html("0");
    $("#level").empty().html("0");
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
    resetAll: function () {
        handlers.resetAll();
    },
};

$(document).ready(function () {
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
    playerScore.push(1);
    displayScore();
});