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
    }
];

// randomised places and pictures arrays - ensures that on each playthrough the places are presented in a different order

var questionsOrder = [];
var locationImages = [];

while (places.length !== 0) {
    var randomIndex = Math.floor(Math.random() * places.length);
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
    // listens for clicks on images and goes the next location in the questionsOrder array, causing the map to pin and pan to new marker
    google.maps.event.addDomListener(correct, "click", function () {
        marker.setMap(null);
        (i++) % (questionsOrder.length);
        new google.maps.Marker({
            position: questionsOrder[i].coordinates,
            map: map,
        });
        map.panTo(questionsOrder[i].coordinates);
    });
};

// Shuffle image order and select random image target div before starting game 

var pictureTarget = [".streetview1", ".streetview2", ".streetview3"];

// var pictureShuffler = {
//     ABC: [],
//     shufflePictures: function () {
//         this.ABC = [];
//         let oneTwoThree = [0, 1, 2];
//         this.ABC = oneTwoThree.sort(() => Math.random() - 0.5);
//     },
//     gameStart: function () {
//         $(`${pictureTarget[this.ABC[0]]}`).prepend(`<img id="correct" src="${locationImages[0]}" />`);
//         $(`${pictureTarget[this.ABC[1]]}`).prepend(`<img id="incorrect" src="${locationImages[1]}" />`);
//         $(`${pictureTarget[this.ABC[2]]}`).prepend(`<img id="nearlyCorrect" src="${locationImages[2]}" />`);
//     }
// };

var handlers = {
    gameStart: function () {
        pictureShuffler.shufflePictures();
        pictureShuffler.gameStart();
    },
    shufflePictures: function () {
        pictureShuffler.shufflePictures();
    },
    incrementCounter: function () {
        pictureShuffler.incrementCounter();
    },
    nextQuestionClear: function () {
        pictureShuffler.nextQuestionClear();
        pictureShuffler.shufflePictures();
    },
    nextQuestionSet: function () {
        pictureShuffler.nextQuestionClear();
        pictureShuffler.nextQuestionSet();
    }
};

var pictureShuffler = {
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
        }
    },
    gameStart: function () {
        $(`${pictureTarget[this.ABC[0]]}`).prepend(`<img id="correct" onclick="handlers.nextQuestionSet()" src="${locationImages[0]}" />`);
        $(`${pictureTarget[this.ABC[1]]}`).prepend(`<img id="incorrect" src="${locationImages[1]}" />`);
        $(`${pictureTarget[this.ABC[2]]}`).prepend(`<img id="nearlyCorrect" src="${locationImages[2]}" />`);
    },
    nextQuestionClear: function () {
        $("#incorrect").remove();
        $("#correct").remove();
        $("#nearlyCorrect").remove();
        this.counter++;
    },
    nextQuestionSet: function () {
        $(`${pictureTarget[this.ABC[0]]}`).prepend(`<img id="correct" src="${locationImages[this.counter]}" />`);
        $(`${pictureTarget[this.ABC[1]]}`).prepend(`<img id="incorrect" src="${locationImages[2]}" />`);
        $(`${pictureTarget[this.ABC[2]]}`).prepend(`<img id="nearlyCorrect" src="${locationImages[3]}" />`);
    }
};




// var randomOne = 0;
// var randomTwo = 0;
// var counter = 0;

// do {
//     randomOne = Math.floor(Math.random() * locationImages.length);
// } while (randomOne === counter);

// do {
//     randomTwo = Math.floor(Math.random() * locationImages.length);
// } while (randomTwo === counter || randomTwo === randomOne);



//     $("body").on("click", "#correct", function () {
//         (counter++) % (questionsOrder.length);
//     })
// });



















