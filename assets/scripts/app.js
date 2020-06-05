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
];


// var manyCoords = 

var random = Math.floor(Math.random() * places.length);
var coords = places[random].coordinates;


// Map object



function initMap() {
    var options = {
        zoom: 16,
        center: coords,
    }

    var map = new google.maps.Map(document.getElementById("map"), options);

    var marker = new google.maps.Marker({
        position: coords,
        map: map
    });
}



    //     var marker = new google.maps.Marker({
    //         position: coords,
    //         map: map
    //     });





