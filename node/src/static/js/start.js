var isActiveInsertPoint=false;
var map;
var markers= new Array();
var selectedTypes = new Array();
selectedTypes['Point']= new Array();
selectedTypes['Polygon']= new Array();

$(document).ready(function(){
    map= L.map('map',{center: [41.725398, -8.806156], zoom: 18});
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    map.locate({setView: true, maxZoom: 20});

    initFunctionPoints();
    initFunctionPolygons();
    initVariablesModal();
});

function initVariablesModal(){
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
                var coord = lat_lng.split(","); 
                markers[markers.length]=L.marker([coord[1],coord[0]]).addTo(map);
            }
        }
        

    })
}

function onMapClick(e) {
    $('#modalCreatePoint').modal('show');
    $('#lat_lng').val(e.latlng.lng+','+e.latlng.lat);
    isActiveInsertPoint=false;
}

function activeInsertPoint(){
    if(!isActiveInsertPoint){
        isActiveInsertPoint=true;
        map.on('click', onMapClick);
        $('#map').css( 'cursor', 'url(./img/iconMouse.png), auto    ' );
    }
}

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



