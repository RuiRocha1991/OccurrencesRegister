'use strict';
const fetch = require('node-fetch');
const pool = require('../conn/conn');

exports.create = (req, res, next) =>{

}

exports.delete = (req, res, next) =>{
    
}

exports.update = (req, res, next) =>{
    
}


exports.getHoles = (req, res, next)=>{
    try{
        fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon_holes&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "GET"
        }
        )
        .then(data => data.json())
        .then(function(data){
            res.send(data);
        })
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição',
            error: e
        });
    }
}

exports.getLights = (req, res, next)=>{
    try{
        fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon_lights&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "GET"
        }
        )
        .then(data => data.json())
        .then(function(data){
            res.send(data);
        })
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição',
            error: e
        });
    }
}

exports.getDeadBodies = (req, res, next)=>{
    try{
        fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon_deadBodies&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "GET"
        }
        )
        .then(data => data.json())
        .then(function(data){
            res.send(data);
        })
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição',
            error: e
        });
    }
}

exports.getInundations = (req, res, next)=>{
    try{
        fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon_inundation&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "GET"
        }
        )
        .then(data => data.json())
        .then(function(data){
            res.send(data);
        })
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição',
            error: e
        });
    }
}

exports.getGarbage = (req, res, next)=>{
    try{
        fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3Aoccurrences_polygon_garbage&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "GET"
        }
        )
        .then(data => data.json())
        .then(function(data){
            res.send(data);
        })
    }catch(e){
        res.status(500).send({
            message:'Falha ao processar requisição',
            error: e
        });
    }
}