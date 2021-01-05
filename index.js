const express = require ('express');
const { v4: uuidv4 } = require('uuid');
var bodyParser = require('body-parser');

//require the db module
const db = require ('./moduls/db_config.js');

//initialize express 
const app = express();

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

//specfy the style path
app.use('/styles' ,express.static(__dirname +'/styles'));

app.get('/', function(req, res) {
    res.render('home');
});

//adding new category
app.post('/', function(req, res) {
    var category_id = uuidv4(); 
    var category_name  = req.body.category_name;
   
    var sql = "INSERT INTO category (`category_id`,`category_name`) VALUES ('"+category_id+"', '"+category_name+"')";
    db.query(sql, function(err, result)  {
        if(err){
            console.log(err);
        }
        else{
            console.log("table created");
            console.log(result);
            res.redirect('/')
        }
       
   });
});


//getting categories
app.get('/data', function(req, res) {
    var sql = "SELECT * FROM category";
    db.query(sql, function(err, result, fields)  {
        if(!err){
           console.log(result)
           products : result;
        }
        else{
            console.log(err);
        }
   });
});


//adding new product
app.post('/', function(req, res) {
    var product_id = uuidv4(); 
    var product_name  = req.body.product_name;
    var product_price  = req.body.product_price;
    var category_name  = req.body.category_name;
   
    var sql = "INSERT INTO product (`product_id`,`product_name`, `product_price`,`category_name`) VALUES ('"+product_id+"', '"+product_name+"','"+product_price+"', '"+category_name+"')";
    db.query(sql, function(err, result)  {
        if(err){
            console.log(err);
        }
        else{
            console.log("table created");
            console.log(result);
            res.redirect('/')
        }
       
   });
});








//starting the server
app.listen(3001, () => console.log("server is running on port 3001"));


