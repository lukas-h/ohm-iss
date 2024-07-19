var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var geoJson = { "type": "FeatureCollection", "features": [{ "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[[9.2202794, 49.1457732], [9.2203015, 49.1458705], [9.2205046, 49.1458507], [9.2204825, 49.1457535], [9.2202794, 49.1457732]]] } }] };

var resultLayer = L.geoJson(geoJson).addTo(map);
map.fitBounds(inputLayer.getBounds());