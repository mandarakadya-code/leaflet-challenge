let myMap = L.map("map", {
    center: [39.7392, -104.9903],
    zoom: 5
  });

  

 let map =  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

map.addTo(myMap);

d3.json(geoData).then(function(data) {
    function fillColorValue(x){
        if(x>-10 && x<=10){
            return "#5bcf57";
        }else if(x>10 && x<=30){
            return "#e0f582";
        }else if(x>30 && x<=50){
            return "#f7cf79";
        }else if(x>50 && x<=70){
            return "#de9b0b";
        }else if(x>70 && x<=90){
            return "#d1721f";
        }else if(x>90){
            return "#b55705";
        }

    }
    for(let i = 0; i < data.features.length; i++){
        // console.log(data.features[i].geometry.coordinates);
        // console.log(data.features[i].properties.mag * 1000)
        L.circleMarker([data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]],{
                fillOpacity: 0.75,
            // color: ["#5bcf57","#e0f582","#f7cf79","#de9b0b","#d1721f","#b55705"],
            color: "black",
            weight: 0.5,
            fillColor: fillColorValue(data.features[i].geometry.coordinates[2]),
            radius: data.features[i].properties.mag * 5
            
          }).bindPopup("Place of earthquake: "+data.features[i].properties.place+"<br/>Deapth of earthquake: "+ data.features[i].geometry.coordinates[2]).addTo(myMap);
        }
        // Legend information
        var legend = L.control({ position: "bottomright" });

        legend.onAdd = function() {
          var div = L.DomUtil.create("div", "legend");
          
          div.innerHTML += '<i style="background: #5bcf57"></i><span>-10-10</span><br>';
          div.innerHTML += '<i style="background: #e0f582"></i><span>10-30</span><br>';
          div.innerHTML += '<i style="background: #f7cf79"></i><span>30-50</span><br>';
          div.innerHTML += '<i style="background: #de9b0b"></i><span>50-70</span><br>';
          div.innerHTML += '<i style="background: #d1721f"></i><span>70-90</span><br>';
          div.innerHTML += '<i style="background: #b55705"></i><span>90+</span><br>';
           return div;
        };
        
        legend.addTo(myMap);
   
});
