const f = require('./fileReadWrite');
const turf = require('@turf/turf');

async function test(feature) {
    const basePolygon = await f.readFile("./data/" + feature + ".geojson");
    var counter = 0;
    var totalDistance = 0;

    turf.geomEach(
        basePolygon,
        function (geom) {
            if (geom.type === 'LineString') {
                // then do this:
                counter = counter + 1;
                totalDistance = totalDistance + turf.length(geom);
            } else {
                // do this:
                console.log(geom.type);
            }
        }
    );

    console.log(feature);
    console.log(counter + ' number of rail tracks');
    console.log(Math.round(totalDistance) + 'km total distance');
}

test("railway=rail");
test("railway=tram");
test("railway=subway");