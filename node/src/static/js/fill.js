function createPopup(data){
    var type = getTypeOccurrence(data.properties.type);
    return `<table><tr><td colspan="2" ><img src="./uploadPhotos/${data.properties.image}" width="100%" heigth="50px"></td></tr><tr><td>Date</td><td>${data.properties.date}</td></tr><tr><td>Description</td><td>${data.properties.name}</td></tr><tr><td>Type</td><td>${type}</td></tr></table>`
}

function addMarkerToMap(data){
    for(var i=0; i<data.length; i++){
        var customPopup = createPopup(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'};
        markers[markers.length]=L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]],{id: data[i].id.replace( /^\D+/g, ''), table: 'occurrences_point', image:data[i].properties.image}).bindPopup(customPopup,customOptions).addTo(map); 
        editableLayers.addLayer(markers[markers.length-1]);
    }
}

function addPolygonToMap(data){
    for(var i=0; i<data.length; i++){
        var customPopup = createPopup(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'};
        var coord='[';
        for(var x=0; x< data[i].geometry.coordinates[0].length;x++){
            if(x>0)
                coord +=', ';
            coord+=`[${data[i].geometry.coordinates[0][x][1]}, ${data[i].geometry.coordinates[0][x][0]}]`;
        }
        coord+=']';
        polygons[polygons.length]=L.polygon(JSON.parse(coord),{id: data[i].id.replace( /^\D+/g, ''), table: 'occurrences_polygon', image:data[i].properties.image }).bindPopup(customPopup,customOptions).addTo(map);
        map.fitBounds(polygons[polygons.length-1].getBounds());
        editableLayers.addLayer(polygons[polygons.length-1]);
    }
}

function addLineToMap(data){
    for(var i=0; i<data.length; i++){
        var customPopup = createPopup(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'};
        var coord='[';
        for(var x=0; x<data[i].geometry.coordinates.length;x++){
            if(x>0)
                coord +=', ';
            coord+=`[${data[i].geometry.coordinates[x][1]}, ${data[i].geometry.coordinates[x][0]}]`;
        }
        coord+=']';
        lines[lines.length]=L.polyline(JSON.parse(coord),{id: data[i].id.replace( /^\D+/g, ''), table: 'occurrences_line' , image:data[i].properties.image}).bindPopup(customPopup,customOptions).addTo(map);
        editableLayers.addLayer(lines[lines.length-1]);
    }
}

function clearTemp(){
    if(temp.length>0)
        temp.forEach(element => {
            editableLayers.removeLayer(element);
        });
}

function removeMarker(){
    if(markers.length>0)
        for(var i=0; i<markers.length; i++){
            map.removeLayer(markers[i]);
            editableLayers.removeLayer(markers[i]);
        }
        markers=[];
}

function removePolygon(){
    if(polygons.length>0)
        for(var i=0; i<polygons.length; i++){
            map.removeLayer(polygons[i]);
            editableLayers.removeLayer(polygons[i]);
        }
    polygons=[];
}

function removeLines(){
    if(lines.length>0)
        for(var i=0; i<lines.length; i++){
            map.removeLayer(lines[i]);
            editableLayers.removeLayer(lines[i]);
        }
    lines=[];
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
        markers[markers.length]=L.marker([lat, lng],{id: data[i].id, table: 'occurrences_point', image:data[i].image }).bindPopup(customPopup,customOptions).addTo(map); 
        editableLayers.addLayer(markers[markers.length-1]);
    }
}

function addPolygonToMapFromQueries(data){
    for(var i=0; i<data.length; i++){
        var customPopup = createPopupFromQueries(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'};
        var coord='[';
        for(var x=0; x<JSON.parse(data[i].geom).coordinates[0].length;x++){
            if(x>0)
                coord +=', ';
            coord+=`[${JSON.parse(data[i].geom).coordinates[0][x][1]}, ${JSON.parse(data[i].geom).coordinates[0][x][0]}]`;
        }
        coord+=']';
        polygons[polygons.length]=L.polygon(JSON.parse(coord),{id: data[i].id, table: 'occurrences_polygon',image:data[i].image }).bindPopup(customPopup,customOptions).addTo(map);
        map.fitBounds(polygons[polygons.length-1].getBounds());
        editableLayers.addLayer(polygons[polygons.length-1]);
    }
}

function addLineToMapFromQueries(data){
    for(var i=0; i<data.length; i++){
        var customPopup = createPopupFromQueries(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'};
        var coord='[';
        for(var x=0; x<JSON.parse(data[i].geom).coordinates.length;x++){
            if(x>0)
                coord +=', ';
            coord+=`[${JSON.parse(data[i].geom).coordinates[x][1]}, ${JSON.parse(data[i].geom).coordinates[x][0]}]`;
        }
        coord+=']';
        lines[lines.length]=L.polyline(JSON.parse(coord),{id: data[i].id, table: 'occurrences_line', image:data[i].image}).bindPopup(customPopup,customOptions).addTo(map);
        editableLayers.addLayer(lines[lines.length-1]);
    }
}

function fillSelectLocalities(data){
    $('#freguesias options').remove();
    for(var i=0; i<data.length; i++){
        $('#freguesias').append(`<option value="${data[i].freguesia}">${data[i].freguesia}</option>`);
    }
    
}