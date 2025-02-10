
const btn1 = document.getElementById("my-button1");
// getting the button through the id named "my-button1"
btn1.addEventListener("click", () => {
    // adding an evenlistener
    // after clicking the button geojson file is to open in a new window
    window.open('mappeddata.geojson', '_blank')
});
const btn2 = document.getElementById("my-button2");
// getting the button through the id named "my-button2"
btn2.addEventListener("click", () => {
    // adding an eventlistener
    // after clicking a web page is to open in a new window
    window.open('https://storymaps.arcgis.com/stories/d6647c55be5b4583b20e5d9871870135', '_blank');
});

const homeLink = document.getElementById("home-link");
// getting the home button on the navigation bar
homeLink.addEventListener("click", function (event) {
    // adding an eventlistener
    // setting an alert as a small pop up window to confirm user is on the home page
    alert("You are on the home page!");
});

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxlbmEtYW5pc2hjaCIsImEiOiJjbTVvN2podncwanJ5Mm1wbnNuczl6c214In0.2ltrEF0cJrURbPWpaKr9bg'; // Add default public map token from your Mapbox account 
const map = new mapboxgl.Map({
    container: 'my-map', // map container ID 
    style: 'mapbox://styles/elena-anishch/cm6y5btsc00nn01sb2wtw5nex', // style URL 
    center: [-79.39, 43.66], // starting position [lng, lat] 
    zoom: 8, // starting zoom level 
});

map.on('load', () => {

    // Add a data source containing GeoJSON data 
    map.addSource('uoft3campuses-data', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "St.George Campus",
                        "address": "27 King's College Circle,Toronto, Ontario M5S 1A1",
                        "collectionName": "UofT3campuses"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.39608027116434,
                            43.66100433149802
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "name": "Mississauga Campus",
                        "address": "3359 Mississauga Road, Mississauga, Ontario L5L 1C6",
                        "collectionName": "UofT3campuses"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.66336899999986,
                            43.54814532864657
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "name": "Scarborough Campus",
                        "address": "1265 Military Trail, Toronto, Ontario M1C 1A4 Canada",
                        "collectionName": "UofT3campuses"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.18628027116512,
                            43.78397620302135
                        ],
                        "type": "Point"

                    }
                }
            ]
        }
    }); // <-- This closing parenthesis was missing for map.addSource method.
    map.addLayer({
        'id': 'uoft-pnt',
        'type': 'circle',
        'source': 'uoft3campuses-data',
        'paint': {
            'circle-radius': 6,
            'circle-color': '#B42222'
        }

    });

    // Add a data source from a GeoJSON file 
    map.addSource('buildings-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/Elena-Anishch/ggr472-exw5/refs/heads/main/wk5-data/buildings.geojson' // Your URL to your buildings.geojson file 
    });
    map.addLayer({
        'id': 'buildings-point',
        'type': 'circle',
        'source': 'buildings-data',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#007cbf'
        }
    });
    // Add a data source from a Mapbox tileset 
    map.addSource('toronto-census-tracts', { // Create your own source ID 
        'type': 'vector',
        'url': 'mapbox://elena-anishch.7ze1m1pp' // Update to your mapbox tileset ID 
    });

    map.addLayer({
        'id': 'census-tracts-layer', // Create your own layer ID 
        'type': 'fill', // Note this is different to point data 
        'source': 'toronto-census-tracts', // Must match source ID from addSource Method 
        'paint': {
            'fill-color': '#000000', // Test alternative colours and style properties 
            'fill-opacity': 0.4,
            'fill-outline-color': 'black'
        },
        'source-layer': 'torontoct-53j7j1' // Tileset NAME (diff to ID), get this from mapbox tileset page
    },
        'buildings-point' // Drawing order - places layer below points 
        // Here the addlayer method takes 2 arguments (the layer as an object and a string for another layer's name). If the other layer already exists, the new layer will be drawn before that one 
    );



});