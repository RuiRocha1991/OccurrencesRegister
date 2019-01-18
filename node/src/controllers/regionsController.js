'use strict';
const fetch = require('node-fetch');
const pool = require('../conn/conn');

exports.getRegion = (req, res, next)=>{
    pool.query("select * from regions where distrito_='VIANA DO CASTELO'", (error, result)=>{
        if(error){
            res.status(500).send({message:'error Select', error:error});
        }else{
            res.status(200).send({status:200, result: result});
        }
    })
}