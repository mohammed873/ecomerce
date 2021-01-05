const { json } = require('body-parser');
const mysql = require ('mysql');
// require('../.env/.env');

var connection = mysql.createConnection({
    //db properties
    host: 'localhost' ,
    port: 3306,
    user: 'root',
    password: '',
    database: 'ecomerce'
});

connection.connect((error)=>{
  if(!error){
    console.log("DB connection done")
  }else{
    console.log("DB connection failed")
  }
})


module.exports = connection;