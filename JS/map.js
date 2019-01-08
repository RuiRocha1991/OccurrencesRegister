var map;
var selectedTypes = new Array();
selectedTypes['Point']= new Array();
selectedTypes['Point'].push('getAllPoints');
selectedTypes['Polygon']= new Array();
selectedTypes['Polygon'].push('getAllPolygons');

$(document).ready(function(){
     map= L.map('map',{center: [41.725398, -8.806156], zoom: 10});
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
   /* map.locate({setView: true, maxZoom: 16});
    var MyIcon = L.icon({
        iconUrl: 'img/location-pin.svg',        
        iconSize: [38, 95]       
    });
    function onLocationFound(e) {    
        var radius = e.accuracy / 2; 

        L.marker(e.latlng,{icon: MyIcon}).addTo(map);    
        L.circle(e.latlng, radius).addTo(map); 
    }
    map.on('locationfound', onLocationFound);*/
    getPoints();
    getPolygons();
});


function getPoints(){
    for(var i=0; i< selectedTypes['Point'].length; i++){
        $.ajax({
            url: 'http://localhost/01-Escola/IS/IS_OccurrencesRegister/php/getInformation.php?action='+selectedTypes['Point'][i],
            type:'get',
            dataType:'json',
            contentType:'application/json',
            success: function(response){
                addMarkerToMap(response.features);
            },
            error:function(error){
                console.log(error);
            }

        })
    }
}

function getPolygons(){
    console.log(selectedTypes['Polygon'][0]);
    for(var i=0; i< selectedTypes['Polygon'].length; i++){
        $.ajax({
            url: 'http://localhost/01-Escola/IS/IS_OccurrencesRegister/php/getInformation.php?action='+selectedTypes['Polygon'][i],
            type:'get',
            dataType:'json',
            contentType:'application/json',
            success: function(response){
                addPolygonToMap(response.features);
            },
            error:function(error){
                console.log(error);
            }
        })
    }
}

function getTypeOccurrence(type){
    switch(type){
        case 1:
        return 'Holes'
        case 2:
        return 'Lights';
        case 3: 
        return 'DeadBodies';
        case 4:
        return 'Inundation';
        case 5:
        return 'Garbage';
    }
}

function createPopup(data){
    var type = getTypeOccurrence(data.properties.type);
    return `<table><tr><td colspan="2" ><img src="./uploadPhotos/lixo.jpg" width="100%"></td></tr><tr><td>Date</td><td>${data.properties.date}</td></tr><tr><td>Description</td><td>${data.properties.name}</td></tr><tr><td>Type</td><td>${type}</td></tr></table>`
}

function addMarkerToMap(data){
    console.log(data);
    for(var i=0; i<data.length; i++){
        var customPopup = createPopup(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'}
        L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]]).bindPopup(customPopup,customOptions).addTo(map); 
    }
}

function addPolygonToMap(data){
    console.log(data);
    for(var i=0; i<data.length; i++){
        var customPopup = createPopup(data[i]);
        var customOptions ={ 'maxWidth': '200','className' : 'custom'}
         L.geoJSON(data).bindPopup(customPopup,customOptions).addTo(map);
    }
}
