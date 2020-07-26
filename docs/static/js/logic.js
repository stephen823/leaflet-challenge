// Creating map object
var map = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

// If data.beta.nyc is down comment out this link
var link = "https://data-beta-nyc-files.s3.amazonaws.com/resources/35dd04fb-81b3-479b-a074-a27a37888ce7/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson?Signature=l8OAPLVQe0lMH8Nf%2BYrRSFj73jo%3D&Expires=1585837691&AWSAccessKeyId=AKIAWM5UKMRH2KITC3QA";

// Uncomment this link local geojson for when data.beta.nyc is down
// var link = "static/data/nyc.geojson";

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(map);
});
