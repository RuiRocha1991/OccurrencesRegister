function getPoints(){
    removeMarker();
    for(var i=0; i< selectedTypes['Point'].length; i++){
        $.ajax({
            url: 'http://localhost:3000/points/'+selectedTypes['Point'][i],
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
    for(var i=0; i< selectedTypes['Polygon'].length; i++){
        $.ajax({
            url: 'http://localhost:3000/polygons/'+selectedTypes['Polygon'][i],
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

function insertNewPoint(data){
    $.ajax({
        url:'http://localhost:3000/points/',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', 
        dataType:'json',
        success: function (res) {
            console.log(res);
            if(res.status==201){
                map.off('click', onMapClick);
                $('#map').css( 'cursor', 'grab' );
                $('#modalCreatePoint').modal('hide')
            }
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}