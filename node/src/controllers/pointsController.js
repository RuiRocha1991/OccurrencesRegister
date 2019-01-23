'use strict';
var fs = require('fs');
const fetch = require('node-fetch');
const pool = require('../conn/conn');

exports.create =(req, res, next) =>{
    if(req.files){
        var file = req.files.file,
            filename = Math.floor((Math.random() * 100000000) + 200000);        
        file.mv('./src/static/uploadPhotos/'+filename, function(error){
            if(error){
                console.log(error);
                res.send(error);
            }else{
            var date = req.body.date ? `to_date('${req.body.date}','YYYYMMDD')` : 'statement_timestamp()';
            pool.query(`INSERT INTO occurrences_point( name, type, date, point,image ) VALUES ( '${req.body.description}' ,${req.body.type}, ${date},ST_SetSRID(ST_MakePoint(${req.body.latLng}),4326), '${filename}')`,(err, result) =>{
                if(err){
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
    pool.query(`DELETE FROM occurrences_point WHERE id=${req.body.id}`,(err, result) =>{
        if(err){
            res.status(500).send({message:'error Delete', error:err});
        }else{
            var filePath = './src/static/uploadPhotos/'+req.body.image; 
            fs.unlinkSync(filePath);
            res.status(200).send({message:'Deleted successful', status : 200});
        }
    })
}

exports.update=(req, res, next)=>{
    pool.query(`UPDATE public.occurrences_point SET point=ST_SetSRID(ST_MakePoint(${req.body.points}),4326) WHERE id= ${req.body.id};`,(err, result) =>{
        if(err){
            res.status(500).send({message:'error Update', error:err});
        }else{
            res.status(200).send({message:'Updated successful', status:200});
        }
    })  
}

exports.getHoles = (req, res, next)=>{
    fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_point_holes&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
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
    fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_point_lights&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
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
    fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_point_deadBodies&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
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
    fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_point_inundation&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
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
    fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_point_garbage&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
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