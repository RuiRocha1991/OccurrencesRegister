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
    removePolygon();
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

function getLines(){
    removeLines();
    for(var i=0; i< selectedTypes['Line'].length; i++){
        $.ajax({
            url: 'http://localhost:3000/lines/'+selectedTypes['Line'][i],
            type:'get',
            dataType:'json',
            contentType:'application/json',
            success: function(response){
                addLineToMap(response.features);
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
            if(res.status==201)
                $('#modalCreatePoint').modal('hide');
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function insertNewPolygon(data){
    $.ajax({
        url:'http://localhost:3000/polygons/',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', 
        dataType:'json',
        success: function (res) {
            if(res.status==201)
                $('#modalCreatePolygon').modal('hide');
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}  

function insertNewLine(data){
    $.ajax({
        url:'http://localhost:3000/lines/',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', 
        dataType:'json',
        success: function (res) {
            if(res.status==201)
                $('#modalCreatePolyline').modal('hide');
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}  

function getPointsByPointAndRadius(data){
    $.ajax({
        url:'http://localhost:3000/queries/getPointsByPointAndRadius',
        data: data,
        type:'get',
        dataType:'json',
        contentType:'application/json',
        success: function (res) {
            if(res.status==200 && res.result.length>0){
                removeMarker();
                addMarkerToMapFromQueries(res.result);
            }
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function getLinesByPointAndRadius(data){
    $.ajax({
        url:'http://localhost:3000/queries/getLinesByPointAndRadius',
        data: data,
        type:'get',
        dataType:'json',
        contentType:'application/json',
        success: function (res) {
            if(res.status==200 && res.result.length>0){
                removeLines();
                addLineToMapFromQueries(res.result);
            }
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function getPolygonsByPointAndRadius(data){
    $.ajax({
        url:'http://localhost:3000/queries/getPolygonsByPointAndRadius',
        data: data,
        type:'get',
        dataType:'json',
        contentType:'application/json',
        success: function (res) {
            if(res.status==200 && res.result.length>0){
                removePolygon();
                addPolygonToMapFromQueries(res.result);
            }
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}