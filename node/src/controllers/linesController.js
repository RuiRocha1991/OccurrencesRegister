'use strict';
const fetch = require('node-fetch');
const pool = require('../conn/conn');

exports.create =(req, res, next) =>{
    if(req.files){
        var file = req.files.file,
            filename = file.name;        
        file.mv('./src/static/uploadPhotos/'+filename, function(error){
            if(error){
                res.send(error);
            }else{
            pool.query(`INSERT INTO occurrences_line( name, type, date, line ,image ) VALUES ( '${req.body.description}' ,${req.body.type}, statement_timestamp(),ST_SetSRID(ST_MakeLine(ARRAY[${req.body.points}]),4326), '${filename}')`,(err, result) =>{
                if(err){
                    console.log(err);
                    res.status(500).send({message:'error Insert', error:err});
                }else{
                    res.status(201).send({message:'insert successful', status:201});
                }
            })
            }
        })
    }
}

exports.delete=(req, res, next)=>{

}

exports.update=(req, res, next)=>{
    
}

exports.getHoles = (req, res, next)=>{
    fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_line_holes&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "GET"
    })
    .then(data => data.json())
    .then(json => res.status(200).send(json))
    .catch(error => res.status(500).send({ 
        message:'Falha ao processar requisição',
        error: error
    }))
}

exports.getLights = (req, res, next)=>{
    fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_line_Lights&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "GET"
    })
    .then(data => data.json())
    .then(json => res.status(200).send(json))
    .catch(error => res.status(500).send({ 
        message:'Falha ao processar requisição',
        error: error
    }))
}

exports.getDeadBodies = (req, res, next)=>{
    fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_line_DeadBodies&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "GET"
    })
    .then(data => data.json())
    .then(json => res.status(200).send(json))
    .catch(error => res.status(500).send({ 
        message:'Falha ao processar requisição',
        error: error
    }))
}

exports.getInundation = (req, res, next)=>{
    fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_line_inundation&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "GET"
    }
    ).then(data => data.json())
    .then(json => res.status(200).send(json))
    .catch(error => res.status(500).send({ 
        message:'Falha ao processar requisição',
        error: error
    }))
}

exports.getGarbage = (req, res, next)=>{
    fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_line_garbage&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "GET"
    }).then(data => data.json())
    .then(json => res.status(200).send(json))
    .catch(error => res.status(500).send({ 
        message:'Falha ao processar requisição',
        error: error
    }))
}