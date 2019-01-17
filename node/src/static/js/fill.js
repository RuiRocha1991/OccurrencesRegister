function createPopup(data){
    var type = getTypeOccurrence(data.properties.type);
    return `<table><tr><td colspan="2" ><img src="./uploadPhotos/${data.properties.image}" width="100%" heigth="50px"></td></tr><tr><td>Date</td><td>${data.properties.date}</td></tr><tr><td>Description</td><td>${data.properties.name}</td></tr><tr><td>Type</td><td>${type}</td></tr></table>`
}

function addMarkerToMap(data){
    for(var i=0; i<data.length; i++){
        var customPopup = createPopup(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'}
        markers[markers.length]=L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]]).bindPopup(customPopup,customOptions).addTo(map); 
    }
}

function removeMarker(){
    if(markers.length>0)
        for(var i=0; i<markers.length; i++){
            map.removeLayer(markers[i]);
        }
}

function addPolygonToMap(data){
    for(var i=0; i<data.length; i++){
        var customPopup = createPopup(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'}
         L.geoJSON(data).bindPopup(customPopup,customOptions).addTo(map);
    }
}
