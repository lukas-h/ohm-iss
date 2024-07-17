const fs = require('fs');
const { NominatimJS } = require('nominatim-js');
const yaml = require('js-yaml');
const osmtogeojson = require('osm2geojson-lite');
const axios = require('axios');

const FOLDER_PREFIX = './data/';
const OVERPASS_URL = "http://overpass-api.de/api/interpreter";

class UnsealingConfig {
    constructor(layers, city) {
        this.layers = layers;
        this.city = city;
    }
}

// Parse YAML config file
function parseConfig(filename) {
    const fileContents = fs.readFileSync(filename, 'utf8');
    const data = yaml.load(fileContents);
    const layers = data.layers;
    return new UnsealingConfig(layers, data.city);
}

// Fetch base geojson
function fetchBase(config) {
    writeOutputGeojson(osmBaseQuery(config.city), `${FOLDER_PREFIX}base.geojson`);
}

// Fetch layers geojson
function fetchLayers(config) {
    config.layers.forEach(layer => {
        console.log(layer);
        writeOutputGeojson(osmQuery([layer], config.city), `${FOLDER_PREFIX}${layer}.geojson`);
    });
}

// Get area ID using Nominatim
async function getAreaId(cityName) {
    const geoResults = await NominatimJS.search({ q: cityName, limit: 3 });
    const city = geoResults.find(r => r.osm_type === 'relation');
    return city ? parseInt(city.osm_id) + 3600000000 : null;
}

// Execute Overpass query and convert to GeoJSON
async function execQuery(areaId, query) {
    const request = `area(${areaId})->.searchArea;(${query});out geom;`;
    console.log(request);
    const response = await axios.get(`${OVERPASS_URL}?data=${encodeURIComponent(request)}`, {
        "Content-Type": "application/xml; charset=utf-8"
    });
    const data = response.data;
    return osmtogeojson(data);
}

// Execute base Overpass query and convert to GeoJSON
async function execBaseQuery(areaId) {
    const request = `area(${areaId})->.searchArea;rel(pivot.searchArea);out geom;`;
    console.log(request);
    const response = await axios.get(`${OVERPASS_URL}?data=${encodeURIComponent(request)}`, {
        "Content-Type": "application/xml; charset=utf-8"
    });
    const data =  response.data;
    return osmtogeojson(data);
}

// Generate Overpass query string
function genQuery(queryList, queryKey = "nwr") {
    return queryList.map(queryItem => `${queryKey}[${queryItem}](area.searchArea);`).join('');
}

// OSM query
async function osmQuery(items, area) {
    const areaId = await getAreaId(area);
    return execQuery(areaId, genQuery(items));
}

// OSM base query
async function osmBaseQuery(area) {
    const areaId = await getAreaId(area);
    return execBaseQuery(areaId);
}

// Write GeoJSON data to file
function writeOutputGeojson(geoJson, filename) {
    fs.writeFileSync(filename, JSON.stringify(geoJson));
}

// Main function
(async () => {
    const config = parseConfig("cityData.yaml");
    await fetchBase(config);
    await fetchLayers(config);
})();
