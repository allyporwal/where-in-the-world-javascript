// Map object

function initMap() {
    var options = {
        zoom: 8,
        center: {lat:51.4545, lng: -2.5879}
    }

    var map = new google.maps.Map(document.getElementById("map"), options);
}