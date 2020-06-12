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
    }
];

// randomised places and pictures arrays - ensures that on each playthrough the places are presented in a different order

let questionsOrder = [];
let locationImages = [];

while (places.length !== 0) {
    let randomIndex = Math.floor(Math.random() * places.length);
    questionsOrder.push(places[randomIndex]);
    locationImages.push(places[randomIndex].street_view_image_link);
    places.splice(randomIndex, 1);
};

// Map - loads places for each question from the randomly ordered array

function initMap() {
    var options = {
        zoom: 16,
        center: questionsOrder[0].coordinates,
    }

    var map = new google.maps.Map(document.getElementById("map"), options);

    var marker = new google.maps.Marker({
        position: questionsOrder[0].coordinates,
        map: map,

    });

    var i = 0;

    // listens for clicks on divs that contain images and goes the next location in the questionsOrder array, causing the map to pin and pan to new marker

    google.maps.event.addDomListener(streetview1, "click", function () {
        marker.setMap(null);
        (i++) % (questionsOrder.length);
        new google.maps.Marker({
            position: questionsOrder[i].coordinates,
            map: map,
        });
        map.panTo(questionsOrder[i].coordinates);
    });
    google.maps.event.addDomListener(streetview2, "click", function () {
        marker.setMap(null);
        (i++) % (questionsOrder.length);
        new google.maps.Marker({
            position: questionsOrder[i].coordinates,
            map: map,
        });
        map.panTo(questionsOrder[i].coordinates);
    });
    google.maps.event.addDomListener(streetview3, "click", function () {
        marker.setMap(null);
        (i++) % (questionsOrder.length);
        new google.maps.Marker({
            position: questionsOrder[i].coordinates,
            map: map,
        });
        map.panTo(questionsOrder[i].coordinates);
    });
};

// handlers to keep code neater

var handlers = {
    gameStart: function () {
        pictureShuffler.shufflePictures();
        pictureShuffler.generateRandomOne();
        pictureShuffler.generateRandomTwo();
        picturePusher.gameStart();
    },
    shufflePictures: function () {
        pictureShuffler.shufflePictures();
    },
    incrementCounter: function () {
        pictureShuffler.incrementCounter();
    },
    nextQuestion: function () {
        pictureShuffler.shufflePictures();
        pictureShuffler.incrementCounter();
        pictureShuffler.generateRandomOne();
        pictureShuffler.generateRandomTwo();
        picturePusher.nextQuestion(); 
        picturePusher.nextQuestionSet();
    },
};

// Quiz objects - pictureTarget 

let pictureTarget = ["#streetview1", "#streetview2", "#streetview3"];

// shufflePictures selects a random target div for each city image, counter keeps track of the level and ensures that the correct image is always loaded to one of the target divs

let pictureShuffler = {
    ABC: [],
    shufflePictures: function () {
        this.ABC = [];
        let oneTwoThree = [0, 1, 2];
        this.ABC = oneTwoThree.sort(() => Math.random() - 0.5);
    },
    counter: 0,
    incrementCounter: function () {
        if (this.counter < questionsOrder.length) {
            this.counter++;
        };
        console.log(this.counter, "Counter");
    },
    randomOne: 0,
    generateRandomOne: function () {
        do {
            this.randomOne = Math.floor(Math.random() * questionsOrder.length);
        } while (this.randomOne === this.counter);
        console.log(this.randomOne);
    },
    randomTwo: 0,
    generateRandomTwo: function () {
        do {
            this.randomTwo = Math.floor(Math.random() * questionsOrder.length);
        } while (this.randomTwo === this.counter || this.randomTwo === this.randomOne);
        console.log(this.randomTwo);
    }
};

// picturePusher object targets the divs, loads images to DOM and removes images after each question. Image ID is used to calculate score 

let picturePusher = {
    gameStart: function () {
        $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${locationImages[pictureShuffler.counter]}" />`);
        $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${locationImages[pictureShuffler.randomOne]}" />`);
        $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${locationImages[pictureShuffler.randomTwo]}" />`);
    },
    nextQuestion: function () {
        $("#incorrect").remove();
        $("#correct").remove();
        $("#nearlyCorrect").remove();
        this.counter++;
    },
    nextQuestionSet: function () {
        $(`${pictureTarget[pictureShuffler.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestion()" src="${locationImages[pictureShuffler.counter]}" />`);
        $(`${pictureTarget[pictureShuffler.ABC[1]]}`).prepend(`<img id="incorrect" onclick="handlers.nextQuestion()" src="${locationImages[pictureShuffler.randomTwo]}" />`);
        $(`${pictureTarget[pictureShuffler.ABC[2]]}`).prepend(`<img id="nearlyCorrect" onclick="handlers.nextQuestion()" src="${locationImages[pictureShuffler.randomOne]}" />`);
    }
};
