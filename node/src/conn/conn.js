const {Client}= require ('pg');

const pool = new Client({
    user:'postgres',
    host:'localhost',
    database:'IS_OccurrencesRegister',
    password:'dados2018',
    port:5432,
})
pool.connect();
module.exports=pool;