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

function getPointsToClusterControl(){
    removeMarker();
    for(var i=0; i< selectedTypes['Point'].length; i++){
        $.ajax({
            url: 'http://localhost:3000/points/'+selectedTypes['Point'][i],
            type:'get',
            dataType:'json',
            contentType:'application/json',
            success: function(response){
                addMarkerToCluster(response.features);
            },
            error:function(error){
                console.log(error);
            }
        })
    }
}

function getPolygonsToClusterControl(){
    removePolygon();
    for(var i=0; i< selectedTypes['Polygon'].length; i++){
        $.ajax({
            url: 'http://localhost:3000/polygons/'+selectedTypes['Polygon'][i],
            type:'get',
            dataType:'json',
            contentType:'application/json',
            success: function(response){
                addPolygonToCluster(response.features);
            },
            error:function(error){
                console.log(error);
            }
        })
    }
}

function getLinesToClusterControl(){
    removeLines();
    for(var i=0; i< selectedTypes['Line'].length; i++){
        $.ajax({
            url: 'http://localhost:3000/lines/'+selectedTypes['Line'][i],
            type:'get',
            dataType:'json',
            contentType:'application/json',
            success: function(response){
                addLineToCluster(response.features);
            },
            error:function(error){
                console.log(error);
            }
        })
    }
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

function searchByDate(){
    var data= {startDate: $('#datepickerStart').val(), endDate: $('#datepickerEnd').val()};
    removeMarker();
    removePolygon();
    removeLines();
    getPointsByDate(data);
    getLinesByDate(data);
    getPolygonsByDate(data);
  
}

function getPointsByDate(data){
    $.ajax({
        url:'http://localhost:3000/queries/getPointsByDate',
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

function getLinesByDate(data){
    $.ajax({
        url:'http://localhost:3000/queries/getLinesByDate',
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

function getPolygonsByDate(data){
    $.ajax({
        url:'http://localhost:3000/queries/getPolygonsByDate',
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

function getLocalities(){
    $.ajax({
        url:'http://localhost:3000/queries/getLocalities',
        type:'get',
        dataType:'json',
        contentType:'application/json',
        success: function (res) {
            if(res.status==200 && res.result.length>0){
                fillSelectLocalities(res.result);
            }
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function getLocalityByMyLocation(data){
    $.ajax({
        url:'http://localhost:3000/queries/getLocalityByMyLocation',
        data: data,
        type:'get',
        dataType:'json',
        contentType:'application/json',
        success: function (res) {
            if(res.status==200 && res.result.length>0){
                getOccurrencesByLocality({locality:res.result[0].freguesia});
            }
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function getOccurrencesByLocality(data){
    getPointsByLocality(data);
    getLinesByLocality(data);
    getPolygonsByLocality(data);
}

function getPointsByLocality(data){
    $.ajax({
        url:'http://localhost:3000/queries/getPointsByLocality',
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

function getLinesByLocality(data){
    $.ajax({
        url:'http://localhost:3000/queries/getLinesByLocality',
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

function getPolygonsByLocality(data){
    $.ajax({
        url:'http://localhost:3000/queries/getPolygonsByLocality',
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

function getAllRegionsToCluster(){
    $.ajax({
        url:'http://localhost:3000/queries/getAllRegions',
        type:'get',
        dataType:'json',
        contentType:'application/json',
        success: function (res) {
            L.geoJSON(res, {
                onEachFeature: function(feature, layer){
                    layer.bindPopup("<p>"+ decodeURIComponent(escape(feature.properties.Freguesia)) +"</p>");
                    layer.addTo(regionsCluster);
                }
            })
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}


