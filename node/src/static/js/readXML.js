async function getFromKML(result){
    var x = result.getElementsByTagName('Placemark');
    var files = $('#inputFilePhoto')[0].files;
    for(var i=0; i<x.length; i++){
        var description = x[i].children[0].textContent;
        var date = x[i].children[2].textContent.substring(0, 10);
        var table = x[i].children[4].nodeName;
        var type , image, points, file;
        var data =  new FormData(); 
        var str = x[i].children[3].textContent.toString()
        if((x[i].children[3].textContent.search('Inundation') != -1)){
            type =4;
            image = getImage(str);
            file =await getImageByName(image, files);
        } else if(x[i].children[3].textContent.search('DeadBodies') != -1){
            type = 3;
            image = getImage(str);
            file =await getImageByName(image, files);
        } else if(x[i].children[3].textContent.search('Holes') != -1){
            type = 1;
            image = getImage(str);
            file =await getImageByName(image, files);
        }else if(x[i].children[3].textContent.search('Lights') != -1){
            type =2;
            image = getImage(str);
           file =await getImageByName(image, files);
        }else if(x[i].children[3].textContent.search('Garbage') != -1){
            type =5;
            image = getImage(str);
            file =await getImageByName(image, files);
        }
        data.append('file',file);
        data.append('description', description);
        data.append('type', type);
        data.append('date',date);
        var coord = getCoordinates(x[i].children[4].textContent);
        if(table === 'Point'){
            points= getSqlStringPoints(coord);
            data.append('latLng', points);
            insertNewPoint(data); 
        }else if(table === 'LineString'){
            points = getSqlStringPolyline(coord);
            data.append('points', points);
            insertNewLine(data);
        }else{
            points = getSqlStringPolygon(coord);
            data.append('points', points);
            insertNewPolygon(data); 
        }
    }
    setTimeout(getAllElements, 3000);
}

function getAllElements(){
    selectedTypes['Point'].push('getHoles');
    selectedTypes['Point'].push('getLights');
    selectedTypes['Point'].push('getDeadBodies');
    selectedTypes['Point'].push('getInundation');
    selectedTypes['Point'].push('getGarbage');
    selectedTypes['Polygon'].push('getHoles');
    selectedTypes['Polygon'].push('getGarbage');
    selectedTypes['Polygon'].push('getLights');
    selectedTypes['Polygon'].push('getDeadBodies');
    selectedTypes['Polygon'].push('getInundation');
    selectedTypes['Line'].push('getHoles');
    selectedTypes['Line'].push('getGarbage');
    selectedTypes['Line'].push('getLights');
    selectedTypes['Line'].push('getDeadBodies');
    selectedTypes['Line'].push('getInundation');
    getPoints();
    getPolygons();
    getLines();
}

function getImageByName(name, files){
    for(var i=0; i< files.length; i++){
        if(files[i].name == name)
            return files[i];
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
        newCoord = coord[0].substring(4,coord[0].length);
        coord[0] = newCoord;
    }
    for(var i=2; i<coord.length; i= i+2){
            newCoord = coord[i].substring(2,coord[0].length);
            coord[i] = newCoord;
    }
    return coord;

}

function getSqlStringPolygon(data){
    var str = '';
    for(var i=0; i<data.length-1; i= i+2){
        if(i+1 != data.length-2){
            str = str + data[i] + ' ' + data[i+1] + ', ';
        }else{
            str = str + data[i] + ' ' + data[i+1]+', ';
        } 
    }
    str=str + data[0] + ' ' + data[1];
    return str;
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
    return str;
}

function getSqlStringPoints(data){
    return data[0] + ' ,' + data[1];
}