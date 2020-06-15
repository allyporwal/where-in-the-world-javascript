// Places array - stores all place names, coordinates to push to map and links to correct answer images

var places = [
    {
        name: "londonPicadilly",
        coordinates: { lat: 51.5099088, lng: -0.134969 },
        street_view_image_link: "assets/img/londonPiccadilly.jpg",
    },
    {
        name: "barcelonaDiagonal",
        coordinates: { lat: 41.3977359, lng: 2.1632075 },
        street_view_image_link: "assets/img/barcelonaDiagonal.jpg",
    },
    {
        name: "romePiazzavenezia",
        coordinates: { lat: 41.8957469, lng: 12.4826705 },
        street_view_image_link: "assets/img/romePiazzavenezia.jpg",
    },
    {
        name: "milanDuomo",
        coordinates: { lat: 45.4646972, lng: 9.1894913 },
        street_view_image_link: "assets/img/milanDuomo.jpg",
    },
    {
        name: "bristolSuspensionbridge",
        coordinates: { lat: 51.4551766, lng: -2.6252481 },
        street_view_image_link: "assets/img/bristolSuspensionbridge.jpg",
    },
    {
        name: "dublinGuinness",
        coordinates: { lat: 53.34215, lng: -6.289821 },
        street_view_image_link: "assets/img/dublinGuinness.jpg",
    },
    {
        name: "nycE47thst",
        coordinates: { lat: 40.7548732, lng: -73.9742965 },
        street_view_image_link: "assets/img/nycE47thst.jpg",
    },
    {
        name: "madridGoya",
        coordinates: { lat: 40.4241351, lng: -3.6772299 },
        street_view_image_link: "assets/img/madridGoya.jpg",
    },
    {
        name: "berlinCheckpoint",
        coordinates: { lat: 52.5067303, lng: 13.3905375 },
        street_view_image_link: "assets/img/berlinCheckpoint.jpg",
    },
    {
        name: "sydneyOconnell",
        coordinates: { lat: -33.8649517, lng: 151.2098745 },
        street_view_image_link: "assets/img/sydneyOconnell.jpg",
    }
];

// handlers to keep code neater

var handlers = {
    gameStart: function () {
        selectedDifficulty.difficultySelected();
        randomisedArrays.randomArrays();
        pictureShuffler.shufflePictures();
        pictureShuffler.generateRandomOne();
        pictureShuffler.generateRandomTwo();
        picturePusher.gameStart();
        displayLevel();
    },
    nextQuestion: function () {
        globalCounter.incrementCounter();
        pictureShuffler.shufflePictures();
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

let selectedDifficulty = {
    difficulty: [],
    difficultySelected: function () {
        this.difficulty = [];
        this.difficulty.push($("#difficultyStart option:selected").val());        
    }
}

function logDifficulty () {
   if (selectedDifficulty.difficulty.includes("easy")) {
   console.log("easy");
   }
}

// randomisedArrays object ensures that on each playthrough the places array is pushed to the page in a different order. This doesn't destroy the original places array, allowing 
// for implementation of a reset feature

let randomisedArrays = {
    questionsOrder: [],
    locationImages: [],
    randomArrays: function () {
        this.questionsOrder = [];
        let placesSliced = places.slice();
        for (let i = 0; i < places.length; i++) {
            let shuffledPlaces = placesSliced[Math.floor(Math.random() * placesSliced.length)];
            let index = placesSliced.indexOf(shuffledPlaces);
            placesSliced.splice(index, 1);
            this.questionsOrder.push(shuffledPlaces.coordinates);
            this.locationImages.push(shuffledPlaces.street_view_image_link);
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
    });
    google.maps.event.addDomListener(streetview2, "click", function () {
        marker.setMap(null);
        new google.maps.Marker({
            position: randomisedArrays.questionsOrder[globalCounter.counter],
            map: map,
        });
        map.panTo(randomisedArrays.questionsOrder[globalCounter.counter]);
    });
    google.maps.event.addDomListener(streetview3, "click", function () {
        marker.setMap(null);
        new google.maps.Marker({
            position: randomisedArrays.questionsOrder[globalCounter.counter],
            map: map,
        });
        map.panTo(randomisedArrays.questionsOrder[globalCounter.counter]);
    });
};


// Quiz objects - pictureTarget array holds the ID of the target div and jQuery is used to select the correct DOM element to push the images to in the picturePusher object

let pictureTarget = ["#streetview1", "#streetview2", "#streetview3"];

// pictureShuffler contains everything needed to randomise all images and target divs on each playthrough
// shufflePictures selects a random target div for each city image 
// randomOne and RandomTwo are random numbers that are different from each other AND from the global counter - this means that there's always three different images to choose from for each question

let pictureShuffler = {
    ABC: [],
    shufflePictures: function () {
        this.ABC = [];
        let oneTwoThree = [0, 1, 2];
        this.ABC = oneTwoThree.sort(() => Math.random() - 0.5);
    },
    randomOne: 0,
    generateRandomOne: function () {
        do {
            this.randomOne = Math.floor(Math.random() * randomisedArrays.questionsOrder.length);
        } while (this.randomOne === globalCounter.counter);
    },
    randomTwo: 0,
    generateRandomTwo: function () {
        do {
            this.randomTwo = Math.floor(Math.random() * randomisedArrays.questionsOrder.length);
        } while (this.randomTwo === globalCounter.counter || this.randomTwo === this.randomOne);
    }
};

// picturePusher object targets the divs, loads images to DOM and removes images after each question. Image ID is used to calculate score 

let picturePusher = {
    gameStart: function () {
        if (selectedDifficulty.difficulty.includes("easy")) {
        $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[globalCounter.counter]}" />`);
        $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomOne]}" />`);
        $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomTwo]}" />`);
        } else if (selectedDifficulty.difficulty.includes("medium")) {
        $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[0]}" />`);
        $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[0]}" />`);
        $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[0]}" />`);    
        }
    },
    nextQuestion: function () {
        $("#incorrect").remove();
        $("#correct").remove();
        $("#nearlyCorrect").remove();
    },
    nextQuestionSet: function () {
        $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[globalCounter.counter]}" />`);
        $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomTwo]}" />`);
        $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${randomisedArrays.locationImages[pictureShuffler.randomOne]}" />`);
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



// Reset feature - resets every array except places[], all counters and random number generators and loads the reset modal which allows the player to start again

function resetAll() {
    randomisedArrays.questionsOrder = [];
    randomisedArrays.locationImages = [];
    globalCounter.counter = 0;
    pictureShuffler.ABC = [];
    pictureShuffler.randomOne = 0;
    pictureShuffler.randomTwo = 0;
    picturePusher.nextQuestion();
    $("#resetModal").modal('show');
};