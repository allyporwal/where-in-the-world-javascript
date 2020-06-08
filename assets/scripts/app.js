// Places array

var places = [
    {
        name: "londonPicadilly",
        coordinates: { lat: 51.5099088, lng: -0.134969 },
        street_view_image_link: "assets/img/londonPicadilly.jpg",
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


// set random start 

// var random = Math.floor(Math.random() * places.length);

var random = Math.floor(Math.random() * places.length);
var coords = places[random].coordinates;

// function randomiser() {
// var random = Math.floor(Math.random() * places.length);
// document.getElementById("randomiser").innerHTML = random; 
// };

// Map object

// var map;
// var markers = [];

// function initMap() {
//     var options = {
//         zoom: 16,
//         center: coords,
//     }

//     var map = new google.maps.Map(document.getElementById("map"), options);


//     var marker = new google.maps.Marker({
//         position: coords,
//         map: map,

//     });

//     google.maps.event.addDomListener(nextLocation, "click", function () {
//         marker.setMap(null);
//         new google.maps.Marker({
//             position: places[2].coordinates,
//             map: map,
//         });
//         map.panTo(places[2].coordinates);
//     });
// }

function initMap() {
    var options = {
        zoom: 16,
        center: coords,
    }

    var map = new google.maps.Map(document.getElementById("map"), options);


    var marker = new google.maps.Marker({
        position: coords,
        map: map,

    });


    google.maps.event.addDomListener(nextLocation, "click", function () {
        marker.setMap(null);
        for (i = 0; i < places.length; i++) {
            var newPlace = places[Math.floor(Math.random() * places.length)];
        }
        new google.maps.Marker({
            position: newPlace.coordinates,
            map: map,
        });
        map.panTo(newPlace.coordinates);
    });
};
















