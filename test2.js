const f = require('./fileReadWrite');


async function test() {
    const result = await f.readFile("./data/base.geojson");
    console.log(result);
}

test();