document.getElementById("mapDiv").style.border = "10px solid transparent";
document.getElementById("mapDiv").style.height = "300px";
document.getElementById("mapDiv").style.width = "100%";

function getIP(callback) {

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            callback(ip); 
        })
        .catch(error => {
            console.log('Error:', error);
        })

}

getIP(function(ip) {
    const apiKey = "a25ad4b491824dd28d0ecf74b70838fa";
    const url = `https://api.ipgeolocation.io/ipgeo?ip=${ip}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const latitude = parseFloat(data.latitude);
            const longitude = parseFloat(data.longitude);
            loadMap(latitude, longitude);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    function loadMap(latitude, longitude) {
        const mapDiv = document.getElementById("mapDiv");
        const map = new google.maps.Map(mapDiv, {
            center: { lat: latitude, lng: longitude },
            zoom: 12
        });
        const marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: 'IP Location'
        });
    }

});

