var urlGeoserverWms='http://localhost:9090/geoserver/IS_Occurrence_Register/wms';
$(document).ready(function(){
    var map = L.map('map',{center: [41.725398, -8.806156], zoom: 10});
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    map.locate({setView: true, maxZoom: 16});
    var MyIcon = L.icon({
        iconUrl: 'img/location-pin.svg',        
        iconSize: [38, 95]       
    });
    function onLocationFound(e) {    
        var radius = e.accuracy / 2; 

        L.marker(e.latlng,{icon: MyIcon}).addTo(map);    
        L.circle(e.latlng, radius).addTo(map); 
    }
    map.on('locationfound', onLocationFound);
    uploadData();
});

function uploadData(){
    
            $.ajax(urlGeoserverWms, {
                type: 'GET',
                data: {
                    service: 'WFS',
                    version: '1.1.0',
                    request: 'GetFeature',
                    typename: 'occurrences_point',
                    srsname: 'EPSG:4326',
                    bbox: extent.join(',') + ',EPSG:4326'
                }
            }).done(function (response) {
                console.log(response);
                /*formatWFS = new ol.format.WFS();
                sourceVector_ParkingSpots.addFeatures(formatWFS.readFeatures(response));*/
            });

}

