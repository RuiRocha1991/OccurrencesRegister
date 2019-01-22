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

function uploadFile(){
    console.log('chegou')
    var data = new FormData();
    data.append('file',$('#inputFile')[0].files[0]);
    $.ajax({
        url:'http://localhost:3000/uplaodFile',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', 
        dataType:'xml',
        success: function (res) {
            console.log('___________')
            console.log(res);
            getFromKML(res)
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function getFromKML(data){
    var x = data.getElementsByTagName('Placemark')
     console.log(x)
    for(var i=0; i<x.length; i++){
        console.log(x[i].children[0].textContent)
        console.log(x[i].children[2].textContent)
        var str = x[i].children[3].textContent.toString()
        if((x[i].children[3].textContent.search('Inundation') != -1)){
            console.log('Inundation')
            var image = getImage(str);
            console.log(image)
        } else if(x[i].children[3].textContent.search('DeadBodies') != -1){
            console.log('DeadBodies')
            var image = getImage(str);
            console.log(image)
            
        } else if(x[i].children[3].textContent.search('Holes') != -1){
            console.log('Holes')
            var image = getImage(str);
            console.log(image)
        }else if(x[i].children[3].textContent.search('Lights') != -1){
            console.log('Lights')
            var image = getImage(str);
            console.log(image)
        }else if(x[i].children[3].textContent.search('Garbage') != -1){
            console.log('Garbage')
            var image = getImage(str);
            console.log(image)
        }
        if(x[i].children[3].textContent.search('img'))
        var stringCoordinates = x[i].children[4].textContent
        var coord = getCoordinates(stringCoordinates)
        /* var sqlString = getSqlString(coord) */
        var sqlString = getSqlStringPoints(coord)
    }
    

}

function getImage(str){
    var imagePath = str.split("="); 
    imagePath = imagePath[1]
    imagePath = imagePath.substring(1,imagePath.length)
    var myPath = imagePath.split('"')
    myPath = myPath[0]
    var image = myPath.split('/')
    image = image[1]
    return image
}

function getCoordinates(str){
    var coord = str.split(",")
    var newCoord = ''
    if(coord[0]){
        newCoord = coord[0].substring(4,coord[0].length)
        coord[0] = newCoord
    }
    for(var i=2; i<coord.length; i= i+2){
            newCoord = coord[i].substring(2,coord[0].length)
            coord[i] = newCoord
    }
    return coord

}

function getSqlStringPolygon(data){
    var str = ''
    for(var i=0; i<data.length-1; i= i+2){
        if(i+1 != data.length-2){
            str = str + data[i] + ' ' + data[i+1] + ','
        }else{
            str = str + data[i] + ' ' + data[i+1]   
        } 
    }
    console.log(str)
}

function getSqlStringPolyline(data){
    var str = ''
    for(var i=0; i<data.length-1; i= i+2){
        if(i+1 != data.length-2){
            str = str + 'ST_MakePoint('+data[i] + ' ,' + data[i+1] + '),'
        }else{
            str = str + 'ST_MakePoint('+data[i] + ' ,' + data[i+1] + ')'
        } 
    }
    console.log(str)
}

function getSqlStringPoints(data){
    /* ST_MakePoint(-8.847596 ,41.695263) */
    var str = 'ST_MakePoint(' + data[0] + ' ,' + data[1] + ')'
    console.log(str)
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

function deletePoint(data){
    $.ajax({
        url:'http://localhost:3000/points/',
        data: data,
        type: 'DELETE', 
        dataType:'json',
        success: function (res) {
            if(res.status==200)
                alert('Delete successful')
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function deletePolygon(data){
    $.ajax({
        url:'http://localhost:3000/polygons/',
        data: data,
        type: 'DELETE', 
        dataType:'json',
        success: function (res) {
            if(res.status==200)
                alert('Delete successful')
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function deleteLine(data){
    $.ajax({
        url:'http://localhost:3000/lines/',
        data: data,
        type: 'DELETE', 
        dataType:'json',
        success: function (res) {
            if(res.status==200)
                alert('Delete successful')
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function updatePoint(data){
    $.ajax({
        url:'http://localhost:3000/points/',
        data: data,
        type: 'put', 
        dataType:'json',
        success: function (res) {
            if(res.status==200)
                alert('Update successful');
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function updatePolygon(data){
    $.ajax({
        url:'http://localhost:3000/polygons/',
        data: data,
        type: 'put', 
        dataType:'json',
        success: function (res) {
            if(res.status==200)
                alert('Update successful');
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}

function updateLine(data){
    $.ajax({
        url:'http://localhost:3000/lines/',
        data: data,
        type: 'put', 
        dataType:'json',
        success: function (res) {
            if(res.status==200)
                alert('Update successful');
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
}