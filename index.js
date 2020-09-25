var express = require('express')
  // , routes = require('./routes')
  , path = require('path'),
	fileUpload = require('express-fileupload'),
	app = express(),
	mysql      = require('mysql'),
  bodyParser=require("body-parser");
  var cloudinary =require('cloudinary').v2;

  cloudinary.config({
    cloud_name:'dxvvkcteo',
    api_key:'786551342827425',
    api_secret:'-vOsD7OLUoOJ_AmAgh4VR4w6zIM'
  });
	
var connection = mysql.createConnection({
	host     : 'remotemysql.com',
	user     : 'qqKUHdjXWR',
	password : 'BR2sJtVZyE',
	database : 'qqKUHdjXWR'
});
 
// connection.connect();
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  useTempFiles: true
}));
 
// development only
 
// app.get('/', routes.index);//call for main index page
app.post('/insert', (req,res)=> {

	var post  = req.body;
      var fname= post.first_name;
      var lname= post.last_name;
      var email= post.email;
      var position= post.position;
      var github= post.github;
      var linkedin= post.linkedin;
      var website= post.website;
      var file = req.files.uploaded_image;
		
 
	  if (!req.files)
				return res.status(400).send('No files were uploaded.');
 
		
 
	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/upload_images/'+file.name, function(err) {
                             
	              if (err)
 
                  return res.status(500).send(err);
              // const file= req.files.uploaded_image;
               cloudinary.uploader.upload('public/images/upload_images/'+file.name,function(err, result){
                if (err)
 
                  return res.status(501).send(err);
                  var img_name=result.url;
               
              



      					var sql = "INSERT INTO form(`first_name`,`last_name`,`email`,`position`, `github` ,`linkedin`,`website`,`image`) VALUES ('" + fname + "','" + lname + "','" + email + "','" + position + "','" + github + "','" + linkedin + "','" + website + "','" + img_name + "')";
 
    						var query = db.query(sql, function(err, result) {
                        if (err) {
                           return res.status(500).send(err);
                       }
                        res.send("updated succesfully");
                                
                                
    						});
             });
            });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.js',{message: message});
          }
          
        
        });





        app.get('/fetch', (req,res)=> {

          var sql = "select* from form";
         
          var query = db.query(sql, function(err, result) {
                  if (err) {
                     return res.status(500).send(err);
                 }
                  res.send(result);
                          
                          
          });

       
                
                });

app.listen(8000)