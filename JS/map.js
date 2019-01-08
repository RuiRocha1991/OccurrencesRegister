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
                addMarkerToMap(response.features[0]);
            },
            error:function(error){
                console.log(error);
            }

        })
    }
}

function getPolygons(){
    for(var i=0; i< selectedTypes['Polygon'].length; i++){
        $.ajax({
            url: 'http://localhost/01-Escola/IS/IS_OccurrencesRegister/php/getInformation.php?action='+selectedTypes['Polygon'][i],
            type:'get',
            dataType:'json',
            contentType:'application/json',
            success: function(response){
                console.log(response.features[0]);
            },
            error:function(error){
                console.log(error);
            }
        })
    }
}

function createPopup(data){
    
    `<table style="width:100%">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th> 
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td> 
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td> 
      <td>94</td>
    </tr>
  </table>`
}

function addMarkerToMap(data){
    var marker = L.marker([data.geometry.coordinates[1], data.geometry.coordinates[0]]).addTo(map); 
}
