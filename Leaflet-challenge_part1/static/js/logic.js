let myMap = L.map("map", {
    center: [27.96044, -82.30695],
    zoom: 7
  });

  

 let map =  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

map.addTo(myMap);

d3.json(geoData).then(function(data) {
    let geojson = L.choropleth(data, {
        valueProperty: "data.features[0].properties.mag",

    // Set the color scale.
    scale: ["#ffffb2", "#b10026"],

    // The number of breaks in the step range
    steps: 6,

    onEachFeature: function(feature, layer) {
        layer.bindPopup("Place of earthquake: $" + data.features[0].properties.place);
      }
    }).addTo(myMap);

     // Set up the legend.
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits = geojson.options.limits;
    let colors = geojson.options.colors;
    let labels = [];

    // Add the minimum and maximum.
    let legendInfo = 
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

//   // Adding the legend to the map
//   legend.addTo(myMap);
//     L.circle(data,{
//         fillOpacity: 0.75,
//     color: ["green","yellow","orange","red"],
//     // fillColor: "purple",
//     // Setting our circle's radius to equal the output of our markerSize() function:
//     // This will make our marker's size proportionate to its population.
//     radius: data.features[0].properties.mag
//   }).bindPopup("Place of earthquake: $" + data.features[0].properties.place).addTo(myMap);
   
});

// d3.json(geoData).then(function(data) {

// });