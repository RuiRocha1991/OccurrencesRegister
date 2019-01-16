const {Pool}= require ('pg');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'IS_OccurrencesRegister',
    password:'dados2018',
    port:5432,
})
module.exports=pool;