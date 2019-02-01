var fs = require('fs');
var path = require('path');
var xmlReader = require('read-xml');

exports.post =(req, res, next)=>{
    if(req.files){
        var file = req.files.file;      
        file.mv('./xml.kml', function(error){
            if(error){
                res.send({message:'error occured', error:error});
            }else{
                var FILE = path.join(__dirname, '../../xml.kml');
                var decodedXMLStream = fs.createReadStream(FILE).pipe(xmlReader.createStream());
                decodedXMLStream.on('data', function(xmlStr) {
                    fs.unlinkSync('./xml.kml');
                    res.send(xmlStr);
                });
            }
        })
    }
}