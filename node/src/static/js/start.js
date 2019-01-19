var drawPluginOptions;
var drawControl;
var editableLayers;
var map;
var markers= new Array();
var selectedTypes = new Array();
selectedTypes['Point']= new Array();
selectedTypes['Polygon']= new Array();

$(document).ready(function(){
    map= L.map('map',{center: [41.725398, -8.806156], zoom: 18});
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    map.locate({setView: true, maxZoom: 20});
    editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);
    insertToolbarEdit();
    initDrawControl();
    initFunctionPoints();
    initFunctionPolygons();
    initVariablesModalInsertPoint();
});

function initDrawControl(){
// Initialise the draw control and pass it the FeatureGroup of editable layers
    drawControl = new L.Control.Draw(drawPluginOptions);
    map.addControl(drawControl);
    map.on('draw:created', function(e) {
        var type = e.layerType,
            layer = e.layer;
        if (type === 'marker') {
            layer.bindPopup('A popup!');
            onMarkerMapClick(layer);
            map.removeLayer(layer);
        }
        if (type === 'polygon') {
            layer.bindPopup('A popup!');   
            onPolygonMapClick(layer)
        }
        if (type === 'polyline') {
            layer.bindPopup('A popup!');   
            onPolylineMapClick(layer)
        }
        if (type === 'circle') {
            layer.bindPopup('A popup!');   
            console.log(layer)
        }
        editableLayers.addLayer(layer);
    });
}

function insertToolbarEdit(){
    drawPluginOptions = {
    position: 'topright',
    draw: {
        polygon: {
            allowIntersection: true, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
                color: '#00004d'
            }
        },
        // disable toolbar item by setting it to false
        polyline: true,
        circle: true, // Turns off this drawing tool
        rectangle: false,
        marker: true,
        },
        edit: {
            featureGroup: editableLayers, //REQUIRED!!
            remove: false
        }
    };
}

function initVariablesModalInsertPoint(){
    $('#btn-submit').click(function(){
        var typeOccurrence = $('#id-occurrence').find('option:selected').val();
        var description = $('#description').val();
        var lat_lng = $('#lat_lng').val();
        var photo = $('#input-photos')[0].files[0];
        var data = new FormData();
        if(typeOccurrence !=='Occurrence'){
            if(typeOccurrence !== undefined && description !==''&& photo!==undefined){
                data.append('file',$('#input-photos')[0].files[0]);
                data.append('description', description);
                data.append('latLng', lat_lng);
                data.append('type', typeOccurrence);
                insertNewPoint(data);                
            }
        }
    });
}

function onMarkerMapClick(e) {
    $('#modalCreatePoint').modal('show');
    $('#lat_lng').val(e._latlng.lng+','+e._latlng.lat);
}

function onPolygonMapClick(e) {
    $('#modalCreatePolygon').modal('show');
    var points = "";
    for(var i=0;i<e._latlngs[0].length; i= i+2){
        points += e._latlngs[0][i].lng + ' ' + e._latlngs[0][i].lat + ', ';
    }
    points += e._latlngs[0][0].lng + ' ' + e._latlngs[0][0].lat;
}

function onPolylineMapClick(e) {
    $('#modalCreatePolyline').modal('show');
    var points = "";
    for(var i=0;i<e._latlngs.length-1; i= i+2){
        points += 'ST_MakePoint('+e._latlngs[i].lng + ', ' + e._latlngs[i].lat + '),';
    }
    points += 'ST_MakePoint('+e._latlngs[e._latlngs.length-1].lng + ', ' + e._latlngs[e._latlngs.length-1].lat + ')';
    console.log(points);
}

/* function activeInsertPoint(){
    if(!isActiveInsertPoint){
        isActiveInsertPoint=true;
        map.on('click', onMapClick);
        $('#map').css( 'cursor', 'url(./img/iconMouse.png), auto    ' );
    }
} */

function initFunctionPoints(){
    $('.allPoints').click(function(){
        if($(this).prop('checked')){
            $('#allPoints').prop('checked',false);
            selectedTypes['Point'].push($(this).data('method'));
        }else{
            var a = selectedTypes['Point'].indexOf($(this).data('method'));
            selectedTypes['Point'].splice(a,1);
        }
        getPoints();
    });

    $('#allPoints').click(function(){
        selectedTypes['Point']=[];
        if($(this).prop('checked')){
            $('.allPoints').prop('checked',true);
            selectedTypes['Point'].push('getHoles');
            selectedTypes['Point'].push('getLights');
            selectedTypes['Point'].push('getDeadBodies');
            selectedTypes['Point'].push('getInundation');
            selectedTypes['Point'].push('getGarbage');
        }else{
            $('.allPoints').prop('checked',false);
        }
        getPoints();
    });
}

function initFunctionPolygons(){
    $('.allPolygons').click(function(){
        if($(this).prop('checked')){
            $('#allPolygons').prop('checked',false);
            selectedTypes['Polygon'].push($(this).data('method'));
        }else{
            var a = selectedTypes['Polygon'].indexOf($(this).data('method'));
            selectedTypes['Polygon'].splice(a,1);
        }
        getPolygons();
    });

    $('#allPolygons').click(function(){
        selectedTypes['Polygon']=[];
        if($(this).prop('checked')){
            $('.allPolygons').prop('checked',true);
            selectedTypes['Polygon'].push('getHoles');
            selectedTypes['Polygon'].push('getGarbage');
            selectedTypes['Polygon'].push('getLights');
            selectedTypes['Polygon'].push('getDeadBodies');
            selectedTypes['Polygon'].push('getInundation');
        }else{
            $('.allPolygons').prop('checked',false);
        }
        getPolygons();
    });
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