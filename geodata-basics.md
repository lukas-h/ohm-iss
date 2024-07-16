# Geodata Basics

- Formats: KML, GML, GeoJSON, etc.
- We will focus on GeoJSON (JSON=JavaScript Object Notation)
- GeoJSON allows us to save describe **Geometries** with associated **Metadata**.
- More about GeoJSON: 
  - Official Website: https://geojson.org/
  - Online tool to draw GeoJSON on a map: https://geojson.io

## Basic geometry types
Geometry Types
- **Points**:		single latitude, longitude coordinates (WGS84)
- **LineStrings**:	a list of coordinates, representing a route
- **Polygon**:		a closed circle of coordinates

- Coordinate system: WGS 84 (spherical coordinates with longitude, latitude in that order)

![World Geodetic System](https://www.jpz.se/bilder/Lat_Long.gif)

## Features
Features combine geometries (Point, Polygon, LineString) and properties (metadata).


## GeoJSON Hierarchy

### coordinate
```js
[11.5, 49.2]
// [longitude, latitude]
```

### geometry

```js
{
    "type": "Point",
    "coordinates": [11.5, 49.2]
}
```

### feature
```js
{
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [11.5, 49.2]
    },
    "properties": {
        "key": "value",

    }
}
```

### feature collection

```js
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            // ...
        }
    ]
}
```

# Geospatial Analysis
We have a library in JavaScript, called turf.js, that helps us to perform operations on GeoJSON data.

You can discover all of it's functions here:

https://turfjs.org/docs/api/along

## Example geometric operations

- Points: distance, midpoint, combine
- LineStrings: distance, bearing, route finding (dijkstra, a*)
- Polygons: set theory (union, difference, intersection, etc., transformation, area, center, centerOfMass)
- Combinations: Point in Polygon, Point on Line
- Algorithms: Voronoi cell generation, Delaney triangulation

and more... (see turf.js)