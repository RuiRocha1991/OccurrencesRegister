'use strict';
const pool = require('../conn/conn');
const fetch = require('node-fetch');

exports.getPointsByPointAndRadius = (req, res, next)=>{
    pool.query(`SELECT occurrences_point.name, occurrences_point.type, occurrences_point.date, occurrences_point.id, occurrences_point.image,  ST_AsGeoJSON(occurrences_point.point) as geom FROM occurrences_point WHERE ST_Within(occurrences_point.point,ST_Transform(ST_Buffer(ST_Transform(ST_SetSRID(ST_MakePoint(${req.query.point}), 4326), 3857), ${req.query.radius}), 4326))`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getLinesByPointAndRadius = (req, res, next)=>{
    pool.query(`SELECT occurrences_line.name, occurrences_line.type, occurrences_line.date, occurrences_line.id, occurrences_line.image,  ST_AsGeoJSON(occurrences_line.line) as geom FROM occurrences_line WHERE ST_Within(occurrences_line.line,ST_Transform(ST_Buffer(ST_Transform(ST_SetSRID(ST_MakePoint(${req.query.point}), 4326), 3857), ${req.query.radius}), 4326))`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getPolygonsByPointAndRadius = (req, res, next)=>{
    pool.query(`SELECT occurrences_polygon.name, occurrences_polygon.type, occurrences_polygon.date, occurrences_polygon.id, occurrences_polygon.image,  ST_AsGeoJSON(occurrences_polygon.geometry) as geom FROM occurrences_polygon WHERE ST_Within(occurrences_polygon.geometry,ST_Transform(ST_Buffer(ST_Transform(ST_SetSRID(ST_MakePoint(${req.query.point}), 4326), 3857), ${req.query.radius}), 4326))`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getPointsByLocality = (req, res, next)=>{
    pool.query(`SELECT occurrences_point.name, occurrences_point.type, occurrences_point.date, occurrences_point.id, occurrences_point.image,  ST_AsGeoJSON(occurrences_point.point) as geom FROM occurrences_point, regions where ST_Intersects(occurrences_point.point, regions.geom) and regions.freguesia ='${req.query.locality}' and regions.Concelho ='VIANA DO CASTELO'`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getLinesByLocality = (req, res, next)=>{
    pool.query(`SELECT occurrences_line.name, occurrences_line.type, occurrences_line.date, occurrences_line.id, occurrences_line.image,  ST_AsGeoJSON(occurrences_line.line) as geom FROM occurrences_line, regions where ST_Intersects(occurrences_line.line, regions.geom) and regions.freguesia ='${req.query.locality}' and regions.Concelho ='VIANA DO CASTELO'`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getPolygonsByLocality = (req, res, next)=>{
    pool.query(`SELECT occurrences_polygon.name, occurrences_polygon.type, occurrences_polygon.date, occurrences_polygon.id, occurrences_polygon.image,  ST_AsGeoJSON(occurrences_polygon.geometry) as geom FROM occurrences_polygon, regions where ST_Intersects(occurrences_polygon.geometry, regions.geom) and regions.freguesia ='${req.query.locality}' and regions.Concelho ='VIANA DO CASTELO'`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getPointsByDate = (req, res, next)=>{
    pool.query(`SELECT id, name, type, date, ST_AsGeoJSON(point) as geom, image FROM public.occurrences_point where CAST(date AS DATE) >='${req.query.startDate}' and CAST(date AS DATE) <='${req.query.endDate}'`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getLinesByDate = (req, res, next)=>{
    pool.query(`SELECT occurrences_line.name, occurrences_line.type, occurrences_line.date, occurrences_line.id, occurrences_line.image,  ST_AsGeoJSON(occurrences_line.line) as geom FROM occurrences_line where CAST(date AS DATE) >='${req.query.startDate}' and CAST(date AS DATE) <='${req.query.endDate}'`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getPolygonsByDate = (req, res, next)=>{
    pool.query(`SELECT occurrences_polygon.name, occurrences_polygon.type, occurrences_polygon.date, occurrences_polygon.id, occurrences_polygon.image,  ST_AsGeoJSON(occurrences_polygon.geometry) as geom FROM occurrences_polygon where CAST(date AS DATE) >='${req.query.startDate}' and CAST(date AS DATE) <='${req.query.endDate}'`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getLocalities = (req, res, next)=>{
    pool.query(`SELECT freguesia FROM public.regions where concelho='VIANA DO CASTELO' order by freguesia`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getLocalityByMyLocation = (req, res, next)=>{
    pool.query(`SELECT freguesia FROM public.regions where ST_Contains(geom,ST_SetSRID(ST_MakePoint(${req.query.point}),4326))`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getAllRegions = (req, res, next)=>{

    fetch('http://localhost:9090/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=IS_Occurrence_Register%3ACont_AAD_CAOP2018&outputFormat=application%2Fjson&format_options=callback%3AgetJson&fbclid=IwAR2mAIr_eyv_DsKtas5P0VpLXOvgcKx0MzEjBRcyqlGSVGYKLIiPz1JeWn0',
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