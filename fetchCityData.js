const fs = require('fs');
const axios = require('axios');
const { NominatimJS } = require('nominatim-js');
const yaml = require('js-yaml');
const { exec } = require('child_process');
const { parse } = require('json2geojson');

const FOLDER_PREFIX = '../data/';
const OVERPASS_URL = "http://overpass-api.de/api/interpreter";

// Enum for operations
const Operation = {
    DIFFERENCE: "difference",
    UNION: "union"
};

// Class definitions
class ConfigLayer {
    constructor(name, operation) {
        this.name = name;
        this.operation = operation;
    }
}

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
    const layers = data.layers.map(layer => new ConfigLayer(layer.name, layer.operation));
    return new UnsealingConfig(layers, data.city);
}

// Fetch base geojson
function fetchBase(config) {
    writeOutputGeojson(osmBaseQuery(config.city), `${FOLDER_PREFIX}base.geojson`);
}

// Fetch layers geojson
function fetchLayers(config) {
    config.layers.forEach(layer => {
        console.log(layer.name);
        console.log(layer.operation);
        writeOutputGeojson(osmQuery([layer.name], config.city), `${FOLDER_PREFIX}${layer.name}.geojson`);
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
    const request = `[out:json];area(${areaId})->.searchArea;(${query});out geom;`;
    console.log(request);
    const response = await axios.get(OVERPASS_URL, { params: { data: request } });
    return parse(response.data);
}

// Execute base Overpass query and convert to GeoJSON
async function execBaseQuery(areaId) {
    const request = `[out:json];area(${areaId})->.searchArea;rel(pivot.searchArea);out geom;`;
    console.log(request);
    const response = await axios.get(OVERPASS_URL, { params: { data: request } });
    return parse(response.data);
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
    const config = parseConfig("../nuernberg_test.yaml");
    await fetchBase(config);
    await fetchLayers(config);
})();
