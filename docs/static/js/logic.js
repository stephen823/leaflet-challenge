var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

function Colourscale (magnitude){
    if (magnitude < 3){
      return "#99ff33"
    }else if (magnitude >= 3 && magnitude < 4 ){
      return "#ccff33"
    }else if (magnitude >= 4 && magnitude < 5 ){
      return "#ffff00"
    }else if (magnitude >= 5 && magnitude < 6 ){
      return "#ff9900"
    }else if (magnitude >= 6 && magnitude < 7 ){
      return "#cc6600" 
    }else if (magnitude >= 7 && magnitude < 8 ){
      return "#ff3300"
    }else {
      return "#990000"
    }
  }

function Classifier (magnitude){
    if (magnitude < 3){
      return "No Applicable"
    }else if (magnitude >= 3 && magnitude < 4 ){
      return "Minor"
    }else if (magnitude >= 4 && magnitude < 5 ){
      return "Light"
    }else if (magnitude >= 5 && magnitude < 6 ){
      return "Moderate"
    }else if (magnitude >= 6 && magnitude < 7 ){
      return "Strong" 
    }else if (magnitude >= 7 && magnitude < 8 ){
      return "Major"
    }else {
      return "Great"
    }
  }

function EffectEvaluation (magnitude){
    if (magnitude < 2.5){
      return "Usually not felt, but can be recorded by seismograph."
    }else if (magnitude >= 2.5 && magnitude < 5.5 ){
      return "Often felt, but only causes minor damage."
    }else if (magnitude >= 5.5 && magnitude < 6.1 ){
      return "Slight damage to buildings and other structures."
    }else if (magnitude >= 6.1 && magnitude < 7 ){
      return "May cause a lot of damage in very populated areas."
    }else if (magnitude >= 7 && magnitude < 8 ){
      return "Major earthquake. Serious damage." 
    }else {
      return "Great earthquake. Can totally destroy communities near the epicenter."
    }
  }


// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

  function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(features,latlng) {
      return L.circle(latlng,{
        fillColor: Colourscale(features.properties.mag),
        fillOpacity: 0.75,
        radius: features.properties.mag*10000,
        stroke: false
      }).bindPopup("<h3>Place: " + features.properties.place + "<h3><h3>Time: " + features.properties.time+ "<h3><h3>Magnitude: " + features.properties.mag + "<h3><h3>Classification: "+ Classifier(features.properties.mag) + "<h3><h3>Effects: "+ EffectEvaluation(features.properties.mag) +"</h3>");

    }
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

  function createMap(earthquakes) {
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: "pk.eyJ1Ijoic3RlcGhlbno4MjMiLCJhIjoiY2thb2lmaGd3MGhjMzJxbzZlYnBneXJ2diJ9.P_d0zV-iNFx2vZIbjQOzqQ"

    });
  
  
    var baseMaps = {
      "Street Map": streetmap
    };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });
  // Create a circle and pass in some initial options
  L.circle([45.52, -122.69], {
  color: "green",
  fillColor: "green",
  fillOpacity: 0.75,
  radius: 500
  }).addTo(myMap);
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}


