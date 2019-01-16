'use strict';
const fetch = require('node-fetch');
const pool = require('../conn/conn');


exports.getHoles = (req, res, next)=>{
 
    /*pool.query('SELECT * FROM "occurrences_point"',(error, result) =>{
      console.log(result);
        res.status(200).send(result.rows);
    })*/
    try{
        fetch('http://localhost/01-Escola/IS/IS_OccurrencesRegister/node/src/static/php/getInformation.php?action=getAllPoints',
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
            message:'Falha ao processar requisição'
        });
    }
}