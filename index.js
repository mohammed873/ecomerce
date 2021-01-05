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
app.post('/', (req, res) =>{
    var sql = "INSERT INTO category (`category_name`) VALUES (?)";
db.query(sql, [req.body.category_name] ,function(err, result)  {
        if(err) throw err;
        res.redirect('/');
   });
});


//getting categories
 app.get('/', (req, res)=> {
    var sql = "SELECT * FROM category ; select product.product_id ,product.product_name  , product.product_price ,category.category_name FROM product INNER JOIN category ON product.category_id = category.category_id";
    db.query(sql, function(err, result, fields)  {
        if(err){
           console.log(err)
        }
        else{
           //done
        }
        res.render('home',{category:result[0],product:result[1]});
   });
});

//get data and redirect to update form
app.get('/update/:id',(req,res) =>{
    var sql = "select * from category where category_id= ?";
    db.query(sql,[req.params.id],(err,data)=>{
        if(err) throw err
        res.render('update',{data:data})
    })
    
})


//updatting categories
app.post('/update', (req, res) => {
    var sql = "UPDATE category SET category_name = ? where category_id = ?";
    db.query(sql, [req.body.category_name,req.body.category_id],(err,result)=>{
        if(err) throw err;
        res.redirect('/');
    })      
});


//delete category   
app.get('/delete/:id',(req, res) => {
    var sql = "DELETE from category where category_id = ?";
    db.query(sql,[req.params.id],(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});


//adding new product
app.post('/addProduct', (req, res) => {
    var sql = "INSERT INTO product (`product_name`, `product_price`,`category_id`) VALUES ( ?,?,?)";
    db.query(sql, [req.body.product_name,req.body.product_price,req.body.category_id],function(err, result)  {
        if(err) throw err;
        res.redirect('/');
   });
})

//get data to be set in the form fields
app.get('/updateProduct/:id',(req,res)=>{
    var sql = "select * from product where product_id =?; select * from category"
    db.query(sql,[req.params.id],(err,result)=>{
        if(err) throw err
        res.render('updateProduct',{product:result[0], category:result[1]})
    })
    
})

//update product
app.post('/updateProduct',(req,res)=>{
 var sql ="UPDATE product SET product_name = ?, product_price = ?, category_id = ? WHERE product_id = ? ";
 db.query(sql,[req.body.product_name, req.body.product_price, req.body.category_id,  req.body.product_id],(err,data)=>{
    if(err) throw err;
    res.redirect('/')
 })
});


//delete product   
app.get('/deleteProduct/:id',(req, res) => {
    var sql = "DELETE from product where product_id  = ?";
    db.query(sql,[req.params.id],(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});


//starting the server
app.listen(3001, () => console.log("server is running on port 3001"));