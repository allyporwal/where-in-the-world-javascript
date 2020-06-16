// Places array - stores all place names, coordinates to push to map and links to correct answer images

var places = [
    {
        name: "londonPicadilly",
        coordinates: { lat: 51.5099088, lng: -0.134969 },
        street_view_image_link: "assets/img/londonPiccadilly.jpeg",
        street_view_medium: ["assets/img/london2.jpeg", "assets/img/london3.jpeg"],
        street_view_hard: ["assets/img/londonNearly.jpeg", "assets/img/londonIncorrect.jpeg"],
    },
    {
        name: "barcelonaDiagonal",
        coordinates: { lat: 41.3977359, lng: 2.1632075 },
        street_view_image_link: "assets/img/barcelonaDiagonal.jpeg",
        street_view_medium: ["assets/img/barcelona2.jpeg", "assets/img/barcelona3.jpeg"],
        street_view_hard: ["assets/img/barcelonaNearly.jpeg", "assets/img/barcelonaIncorrect.jpeg"]
    },
    {
        name: "romePiazzavenezia",
        coordinates: { lat: 41.8957469, lng: 12.4826705 },
        street_view_image_link: "assets/img/romePiazzavenezia.jpeg",
        street_view_medium: ["assets/img/rome2.jpeg", "assets/img/rome3.jpeg"],
        street_view_hard: ["assets/img/romeNearly.jpeg", "assets/img/romeIncorrect.jpeg"]
    },
    {
        name: "milanDuomo",
        coordinates: { lat: 45.4646972, lng: 9.1894913 },
        street_view_image_link: "assets/img/milanDuomo.jpeg",
        street_view_medium: ["assets/img/milan2.jpeg", "assets/img/milan3.jpeg"],
        street_view_hard: ["assets/img/milanNearly.jpeg", "assets/img/milanIncorrect.jpeg"]
    },
    {
        name: "bristolSuspensionbridge",
        coordinates: { lat: 51.4551766, lng: -2.6252481 },
        street_view_image_link: "assets/img/bristolSuspensionbridge.jpeg",
        street_view_medium: ["assets/img/bristol2.jpeg", "assets/img/bristol3.jpeg"],
        street_view_hard: ["assets/img/bristolNearly.jpeg", "assets/img/bristolIncorrect.jpeg"]
    },
    {
        name: "dublinGuinness",
        coordinates: { lat: 53.34215, lng: -6.289821 },
        street_view_image_link: "assets/img/dublinGuinness.jpeg",
        street_view_medium: ["assets/img/dublin2.jpeg", "assets/img/dublin3.jpeg"],
        street_view_hard: ["assets/img/dublinNearly.jpeg", "assets/img/dublinIncorrect.jpeg"]
    },
    {
        name: "nycE47thst",
        coordinates: { lat: 40.7548732, lng: -73.9742965 },
        street_view_image_link: "assets/img/nycE47thst.jpeg",
        street_view_medium: ["assets/img/nycl2.jpeg", "assets/img/nyc3.jpeg"],
        street_view_hard: ["assets/img/nycNearly.jpeg", "assets/img/nycIncorrect.jpeg"]
    },
    {
        name: "madridGoya",
        coordinates: { lat: 40.4241351, lng: -3.6772299 },
        street_view_image_link: "assets/img/madridGoya.jpeg",
        street_view_medium: ["assets/img/madrid2.jpeg", "assets/img/madrid3.jpeg"],
        street_view_hard: ["assets/img/madridNearly.jpeg", "assets/img/madridIncorrect.jpeg"]
    },
    {
        name: "berlinCheckpoint",
        coordinates: { lat: 52.5067303, lng: 13.3905375 },
        street_view_image_link: "assets/img/berlinCheckpoint.jpeg",
        street_view_medium: ["assets/img/berlin2.jpeg", "assets/img/berlin3.jpeg"],
        street_view_hard: ["assets/img/berlinNearly.jpeg", "assets/img/berlinIncorrect.jpeg"]
    },
    {
        name: "sydneyOconnell",
        coordinates: { lat: -33.8649517, lng: 151.2098745 },
        street_view_image_link: "assets/img/sydneyOconnell.jpeg",
        street_view_medium: ["assets/img/sydney2.jpeg", "assets/img/sydney3.jpeg"],
        street_view_hard: ["assets/img/sydneyNearly.jpeg", "assets/img/sydneyIncorrect.jpeg"]
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
    }
};

// Difficulty select object - changes which image arrays the potential answers are loaded from 

let selectedDifficulty = {
    difficulty: [],
    difficultySelected: function () {
        this.difficulty = [];
        this.difficulty.push($("#difficultyStart option:selected").val());
    }
}

// randomisedArrays object ensures that on each playthrough the places array is pushed to the page in a different order. This doesn't destroy the original places array, allowing 
// for implementation of a reset feature. Also stores images for medium and hard difficulty levels in seperate arrays.

let randomisedArrays = {
    questionsOrder: [],
    locationImages: [],
    locationImagesMedium: [],
    locationImagesHard: [],
    randomArrays: function () {
        let placesSliced = places.slice();
        for (let i = 0; i < places.length; i++) {
            let shuffledPlaces = placesSliced[Math.floor(Math.random() * placesSliced.length)];
            let index = placesSliced.indexOf(shuffledPlaces);
            placesSliced.splice(index, 1);
            this.questionsOrder.push(shuffledPlaces.coordinates);
            this.locationImages.push(shuffledPlaces.street_view_image_link);
            this.locationImagesMedium.push(shuffledPlaces.street_view_medium);
            this.locationImagesHard.push(shuffledPlaces.street_view_hard);
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
// different numbers. randomOne and randomTwo are only used in easy mode

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
                this.randomOne = Math.floor(Math.random() * randomisedArrays.questionsOrder.length);
            } while (this.randomOne === globalCounter.counter);
        }
    },
    randomTwo: 0,
    generateRandomTwo: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            do {
                this.randomTwo = Math.floor(Math.random() * randomisedArrays.questionsOrder.length);
            } while (this.randomTwo === globalCounter.counter || this.randomTwo === this.randomOne);
        }
    }
};

// picturePusher object targets the divs, loads images to DOM and removes images after each question. Image ID is used to calculate score in medium and hard levels.
// else if statements are used to load correct images for each difficulty level

let picturePusher = {
    gameStart: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomOne]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomTwo]}" />`);
        } else if (selectedDifficulty.difficulty.includes("medium")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImagesMedium[globalCounter.counter][0]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImagesMedium[globalCounter.counter][1]}" />`);
        } else if (selectedDifficulty.difficulty.includes("hard")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[globalCounter.counter]}" />`);
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
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomTwo]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomOne]}" />`);
        } else if (selectedDifficulty.difficulty.includes("medium")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[globalCounter.counter]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImagesMedium[globalCounter.counter][0]}" />`);
            $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImagesMedium[globalCounter.counter][1]}" />`);
        } else if (selectedDifficulty.difficulty.includes("hard")) {
            $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[globalCounter.counter]}" />`);
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




// Reset function - resets every array except places[], all counters and random number generators and loads the reset modal which allows the player to start again

function resetAll() {
    selectedDifficulty.difficulty = [];
    randomisedArrays.questionsOrder = [];
    randomisedArrays.locationImages = [];
    randomisedArrays.locationImagesMedium = [];
    randomisedArrays.locationImagesHard = [];
    globalCounter.counter = 0;
    pictureShuffler.randomOne = 0;
    pictureShuffler.randomTwo = 0;
    picturePusher.nextQuestion();
    $("#resetModal").modal('show');
};
