// Places array - stores all place names, coordinates to push to map and links to correct answer images

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
    }
];

// handlers to keep code neater

var handlers = {
    gameStart: function () {
        selectedDifficulty.difficultySelected();
        randomisedArrays.randomArrays();
        pictureShuffler.shufflePictures(pictureShuffler.ABC);
        pictureShuffler.generateRandomOne();
        pictureShuffler.generateRandomTwo();
        picturePusher.gameStart();
        displayLevel();
    },
    nextQuestion: function () {
        globalCounter.incrementCounter();
        pictureShuffler.shufflePictures(pictureShuffler.ABC);
        pictureShuffler.generateRandomOne();
        pictureShuffler.generateRandomTwo();
        picturePusher.nextQuestion();
        picturePusher.nextQuestionSet();
        displayLevel();
    },
    resetAll: function () {
        resetAll();
    },
};

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
        let placesSliced = places.slice();
        for (let i = 0; i < places.length; i++) {
            let shuffledPlaces = placesSliced[Math.floor(Math.random() * placesSliced.length)];
            let index = placesSliced.indexOf(shuffledPlaces);
            placesSliced.splice(index, 1);
            if (selectedDifficulty.difficulty.includes("easy")) {
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


$(document).ready(function () {
    $("#startGame").on("click", initMap);
    $("#resetStartGame").on("click", initMap);
});


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
            position: randomisedArrays.questionsOrder[globalCounter.counter],
            map: map,
        });
        map.panTo(randomisedArrays.questionsOrder[globalCounter.counter]);
        map.setZoom(16);
    });
    google.maps.event.addDomListener(streetview2, "click", function () {
        marker.setMap(null);
        new google.maps.Marker({
            position: randomisedArrays.questionsOrder[globalCounter.counter],
            map: map,
        });
        map.panTo(randomisedArrays.questionsOrder[globalCounter.counter]);
        map.setZoom(16);
    });
    google.maps.event.addDomListener(streetview3, "click", function () {
        marker.setMap(null);
        new google.maps.Marker({
            position: randomisedArrays.questionsOrder[globalCounter.counter],
            map: map,
        });
        map.panTo(randomisedArrays.questionsOrder[globalCounter.counter]);
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
    ABC: [0, 1, 2],
    shufflePictures: function (array) {
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
            do {
                this.randomOne = Math.floor(Math.random() * randomisedArrays.locationImages.length);
            } while (this.randomOne === globalCounter.counter);
        }
    },
    randomTwo: 0,
    generateRandomTwo: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            do {
                this.randomTwo = Math.floor(Math.random() * randomisedArrays.locationImages.length);
            } while (this.randomTwo === globalCounter.counter || this.randomTwo === this.randomOne);
        }
    }
};

// picturePusher object targets the divs, loads images to DOM and removes images after each question. Image ID is used to calculate score on hard difficulty.
// else if statements are used to load correct images for both difficulty levels

let picturePusher = {
    gameStart: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomOne]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomTwo]}" />`);
        } else if (selectedDifficulty.difficulty.includes("hard")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImagesHard[globalCounter.counter][1]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImagesHard[globalCounter.counter][0]}" />`);
        }
    },
    nextQuestion: function () {
        $("#incorrect").remove();
        $("#correct").remove();
        $("#nearlyCorrect").remove();
    },
    nextQuestionSet: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomOne]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomTwo]}" />`);
        } else if (selectedDifficulty.difficulty.includes("hard")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.questionsAnswer[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImagesHard[globalCounter.counter][1]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImagesHard[globalCounter.counter][0]}" />`);
        }
    }
};

// Display level

function calculateLevel() {
    return globalCounter.counter + 1;
};

function displayLevel() {
    let level = calculateLevel();
    $("#level").empty().html(`${level}`);
};

// Calculate and display score

let playerScore = [];
let nearlyCorrect = [];

function calculateScore() {
    playerScore.push(1);
    return playerScore.length * 10;
};

function displayScore() {
    let score = calculateScore;
    $("#score").empty().html(`${score}`);
}

$("#quizContainer").on("click", "img", function(event){
    console.log(hello);
});

// Countdown timer

// Game over

// Reset function - resets every array except places[], all counters and random number generators and loads the reset modal which allows the player to start again

function resetAll() {
    selectedDifficulty.difficulty = [];
    randomisedArrays.questionsOrder = [];
    randomisedArrays.questionsAnswer = [];
    randomisedArrays.locationImages = [];
    randomisedArrays.locationImagesHard = [];
    playerScore = [];
    nearlyCorrect = [];
    globalCounter.counter = 0;
    pictureShuffler.randomOne = 0;
    pictureShuffler.randomTwo = 0;
    picturePusher.nextQuestion();
    $("#welcomeModal").modal('show');
};
