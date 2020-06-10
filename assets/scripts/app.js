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

// randomised places array - ensures that on each playthrough the places are presented in a different order

var questionsOrder = [];
var locationImages = [];

while (places.length !== 0) {
    var randomIndex = Math.floor(Math.random() * places.length);
    questionsOrder.push(places[randomIndex]);
    locationImages.push(places[randomIndex].street_view_image_link);
    places.splice(randomIndex, 1);
};

// Map object - loads places for each question from the randomly ordered array

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


// Quiz - loads images to page, correct ID is used to go to next question



$(document).ready(function () {

    $(".streetview1").prepend(`<img id="correct" src="${locationImages[0]}" />`);
    // $(".streetview2").prepend(`<img id="incorrect" src="${locationImages[randomImageIndex]}" />`);
    // $(".streetview3").prepend(`<img id="nearlyCorrect" src="${locationImages[randomImageIndex]}" />`);
});








