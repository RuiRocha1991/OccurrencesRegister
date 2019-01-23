function uploadFile(){
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
            getFromKML(res)
        },
        error: function (errorMessage) {
            console.log(errorMessage);
        }
    });
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
            console.log(res);
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