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
    // listens for correct answer and pushes the next location to the map, causing the map to pin a new marker and pan to new marker
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


// Shuffle image order and image target before starting game 



var pictureTarget = [".streetview1", ".streetview2", ".streetview3"];

var pictureShuffler = {
    ABC: [],
    shufflePictures: function () {
        this.ABC = [];
        let oneTwoThree = [0, 1, 2];
        this.ABC = oneTwoThree.sort(() => Math.random() - 0.5);
    }
};

var loadImages = {
    gameStart: function () {
        $(`${pictureTarget[0]}`).prepend(`<img id="correct" src="${locationImages[0]}" />`);
        $(`${pictureTarget[2]}`).prepend(`<img id="incorrect" src="${locationImages[1]}" />`);
        $(`${pictureTarget[1]}`).prepend(`<img id="nearlyCorrect" src="${locationImages[2]}" />`);
    }
}

var handlers = {
    gameStart: function () {
        pictureShuffler.shufflePictures();
        loadImages.gameStart();
},
    shufflePictures: function () {
        pictureShuffler.shufflePictures();
    }
};












// ------------------------------------------------------------------



// Counter keeps track of the current stage of the game and selects correct answer image, randomOne and randomTwo are used to select two different random images from the array

// var randomOne = 0;
// var randomTwo = 0;
// var counter = 0;

// do {
//     randomOne = Math.floor(Math.random() * locationImages.length);
// } while (randomOne === counter);

// do {
//     randomTwo = Math.floor(Math.random() * locationImages.length);
// } while (randomTwo === counter || randomTwo === randomOne);

// Starting game

// $(document).ready(function () {

//     $(`${pictureShuffle[pictureShuffleIndex1]}`).prepend(`<img id="correct" src="${locationImages[counter]}" />`);
//     $(`${pictureShuffle[pictureShuffleIndex2]}`).prepend(`<img id="incorrect" src="${locationImages[randomOne]}" />`);
//     $(`${pictureShuffle[pictureShuffleIndex3]}`).prepend(`<img id="nearlyCorrect" src="${locationImages[randomTwo]}" />`);

//     $("body").on("click", "#correct", function () {
//         (counter++) % (questionsOrder.length);
//     })
// });



















