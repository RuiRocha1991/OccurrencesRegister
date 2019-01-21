'use strict';
const pool = require('../conn/conn');

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
    pool.query(`SELECT occurrences_point.name, occurrences_point.type, occurrences_point.date, occurrences_point.id, occurrences_point.image,  ST_AsGeoJSON(occurrences_point.point) as geom FROM occurrences_point, regions where ST_Intersects(occurrences_point.point, regions.geom) and regions.distrito ='${req.quert.locality}'`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getLinesByLocality = (req, res, next)=>{
    pool.query(`SELECT occurrences_line.name, occurrences_line.type, occurrences_line.date, occurrences_line.id, occurrences_line.image,  ST_AsGeoJSON(occurrences_line.line) as geom FROM occurrences_line, regions where ST_Intersects(occurrences_line.line, regions.geom) and regions.distrito ='${req.quert.locality}'`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}

exports.getPolygonsByLocality = (req, res, next)=>{
    pool.query(`SELECT occurrences_polygon.name, occurrences_polygon.type, occurrences_polygon.date, occurrences_polygon.id, occurrences_polygon.image,  ST_AsGeoJSON(occurrences_polygon.geometry) as geom FROM occurrences_polygon, regions where ST_Intersects(occurrences_polygon.geometry, regions.geom) and regions.distrito ='${req.quert.locality}'`, (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result.rows});
        }
    })
}