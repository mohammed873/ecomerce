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
 app.get('/', function(req, res) {
    var sql = "SELECT * FROM category ; select product.product_id ,product.product_name  , product.product_price ,category.category_name FROM product INNER JOIN category ON product.category_id = category.category_id";
    db.query(sql, function(err, result, fields)  {
        if(err){
           console.log(err)
        }
        else{
            console.log(result[0]);
            console.log(result[1]);

        }
        
        res.render('home',{category:result[0],product:result[1]});
        
   });
 });


//adding new product
app.post('/addProduct', function(req, res) {
    var product_id = uuidv4(); 
    var product_name  = req.body.product_name;
    var product_price  = req.body.product_price;
    var category_id  = req.body.category_id;
    console.log(product_price)
    var sql = "INSERT INTO product (`product_id`,`product_name`, `product_price`,`category_id`) VALUES ('"+product_id+"', '"+product_name+"','"+product_price+"', '"+category_id+"')";
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
})
app.get('/update/:id',(req,res)=>{
    var sql = "select * from category where category_id='"+req.params.id+"'";
    db.query(sql,(err,data)=>{
        if(err) throw err
        res.render('update',{data:data})
    })
    
})


//updatting categories
app.post('/update', function(req, res) {
    var sql = "UPDATE category SET category_name = ? where category_id =?";
    db.query(sql, [req.body.category_name,req.body.category_id],(err,result)=>{
        if(err){
            console.log(err)
         }
         else{
             console.log(result);
         }
         res.redirect('/')
    })  
       
   });

app.get('/delete/:id',(req, res) => {
    var sql = "DELETE from category where category_id = ?";
    db.query(sql,[req.params.id],(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});





//starting the server
app.listen(3001, () => console.log("server is running on port 3001"));


