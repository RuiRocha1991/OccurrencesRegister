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

function addPolygonToMap(data){
    for(var i=0; i<data.length; i++){
        var customPopup = createPopup(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'}
        polygons[polygons.length]=L.geoJSON(data).bindPopup(customPopup,customOptions).addTo(map);
    }
}

function addLineToMap(data){
    for(var i=0; i<data.length; i++){
        var customPopup = createPopup(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'}
        lines[lines.length]=L.geoJSON(data).bindPopup(customPopup,customOptions).addTo(map);
    }
}

function removeMarker(){
    if(markers.length>0)
        for(var i=0; i<markers.length; i++){
            map.removeLayer(markers[i]);
        }
}

function removePolygon(){
    if(polygons.length>0)
        for(var i=0; i<polygons.length; i++){
            map.removeLayer(polygons[i]);
        }
}

function removeLines(){
    if(lines.length>0)
        for(var i=0; i<lines.length; i++){
            map.removeLayer(lines[i]);
        }
}

function createPopupFromQueries(data){
    var type = getTypeOccurrence(Number(data.type));
    return `<table><tr><td colspan="2" ><img src="./uploadPhotos/${data.image}" width="100%" heigth="50px"></td></tr><tr><td>Date</td><td>${data.date}</td></tr><tr><td>Description</td><td>${data.name}</td></tr><tr><td>Type</td><td>${type}</td></tr></table>`
}

function addMarkerToMapFromQueries(data){
    for(var i=0; i<data.length; i++){
        var lat =JSON.parse(data[i].geom).coordinates[1];
        var lng =JSON.parse(data[i].geom).coordinates[0];
        var customPopup = createPopupFromQueries(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'}
        markers[markers.length]=L.marker([lat, lng]).bindPopup(customPopup,customOptions).addTo(map); 
    }
}

function addPolygonToMapFromQueries(data){
    for(var i=0; i<data.length; i++){
        var customPopup = createPopupFromQueries(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'}
        data[i].geom = JSON.parse(data[i].geom);
        polygons[polygons.length]=L.geoJSON(data[i].geom).bindPopup(customPopup,customOptions).addTo(map);
    }
}

function addLineToMapFromQueries(data){
    for(var i=0; i<data.length; i++){
        var customPopup = createPopupFromQueries(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'}
        data[i].geom = JSON.parse(data[i].geom);
        lines[lines.length]=L.geoJSON(data[i].geom).bindPopup(customPopup,customOptions).addTo(map);
    }
}

