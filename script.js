
const btn1 = document.getElementById("my-button1");
// getting the button through the id named "my-button1"
btn1.addEventListener("click", () => {
    // adding an evenlistener
    // after clicking the button geojson file is to open in a new window
    window.open('storymapdata.geojson', '_blank')
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
    zoom: 4, // starting zoom level 
});
// Create a fullscreen control for the map
var fullscreenControl = new mapboxgl.FullscreenControl({
    container: document.querySelector('my-map') // Optional: Specifies the container 'my-map'to enable fullscreen for the specific container
});
// 'my-map' is the container ID where the fullscreen control will be applied. 
// If omitted, the fullscreen control would apply to the entire page.

// Add the fullscreen control to the map
map.addControl(fullscreenControl); // Adds the fullscreen control button to the map interface.

// Event listener that triggers when the map has fully loaded
map.on('load', () => {
    // Add a data source containing GeoJSON data of UofT Campuses
    map.addSource('uoft3campuses-data', {
        type: 'geojson', // Specifies that the data source type is GeoJSON
        data: {
            "type": "FeatureCollection", // Defines the data type as a collection of geographic features
            "features": [ // Array of geographic features (locations)
                {
                    "type": "Feature",// Defines this as a geographic feature
                    "properties": { // Specifies metadata about the feature (such as name, address, etc.)
                        "name": "St.George Campus", // Name of the campus
                        "address": "27 King's College Circle,Toronto, Ontario M5S 1A1",
                        "collectionName": "UofT3campuses" // Name of the collection this feature belongs to
                    },
                    "geometry": { // Defines the geometry (location) of the feature
                        "coordinates": [ // Longitude and latitude of the location
                            -79.39608027116434, // Longitude of St. George campus
                            43.66100433149802], // Latitude of St. George campus

                        "type": "Point" // Specifies that the geometry is a point (location)
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "name": "Mississauga Campus",
                        "address": "3359 Mississauga Road, Mississauga, Ontario L5L 1C6",
                        "collectionName": "UofT3campuses" // Name of the collection this feature belongs to
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
                        "collectionName": "UofT3campuses" // Name of the collection this feature belongs to
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
    });

    // Add a circle layer for UofT campuses with a red color
    map.addLayer({
        'id': 'uoft-pnt', // ID for the uoft campuses point layer
        'type': 'circle', // Defines the type of the layer as a cirle used for point data
        'source': 'uoft3campuses-data', // Specifies the source of the data for this layer, referencing a previously added source
        'paint': {  // Defines the style properties for the layer
            'circle-radius': 6, // Sets the radius of the circles (markers) to 6 pixels
            'circle-color': '#B42222'  // Sets the color of the circles to a shade of red (#B42222)
        }
    });

    // Add a data source for subway stations from a GeoJSON URL from the repository
    map.addSource('subways-data', { /// Adding a new data source to the map with ID 'subways-data'
        type: 'geojson', // Specifies the data source is GeoJson
        data: 'https://raw.githubusercontent.com/Elena-Anishch/ggr472-w5-lab2/refs/heads/main/lab2data/subwaystationsclosest2fesitval.geojson' // Your URL to your subways-data.geojson file 
    });

    // Add a circle layer for subway stations with a black color
    map.addLayer({
        'id': 'subways-data', // ID for subways stations layer
        'type': 'circle', // Defines the type of the layer as a cirle used for point data
        'source': 'subways-data', // Specifies the source of the data for this layer, referencing a previously added source
        'paint': { // Defines the style properties for the layer
            'circle-radius': 5, //Sets the radius of the circles (markers) to 5 pixels
            'circle-color': '#000000' // Sets the color of the subway station markers to black
        }
    });
    // Add a data source for Toronto census tracts from a Mapbox tileset
    map.addSource('toronto-census-tracts', { // Source ID for toronto census tracks 
        'type': 'vector', // data is vector based
        'url': 'mapbox://elena-anishch.7ze1m1pp' // Mapbox tileset ID 
    });

    // Add a fill layer for Toronto census tracts with a semi-transparent black color
    map.addLayer({
        'id': 'census-tracts-layer', // Creating a census tracts layer ID 
        'type': 'fill', // Different to point data 
        'source': 'toronto-census-tracts', // Matching  source ID from addSource Method 
        'paint': { // Defines the style properties for the layer
            'fill-color': '#000000', // setting the fill color to black
            'fill-opacity': 0.2, // setting the opacity of the fill to 20%
            'fill-outline-color': 'black' // setting the outline color of the fill to black 
        },
        'source-layer': 'torontoct-53j7j1' // Tileset NAME obtianed from mapbox tileset page
    },
        'subways-data'); // Ensuring the census tracts layer is below the subway points

});