var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var aws = require('aws-sdk');
var multer = require('multer');
AWS.config.region = 'us-west-2';
var connection = mysql.createConnection({

    host: 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    user: 'user',
    database: 'server',
    password: 'password'
});


var accessKeyId =  process.env.AWS_ACCESS_KEY || "AKIAJIDNL3TIGCIZOQAQ";
var secretAccessKey = process.env.AWS_SECRET_KEY || "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";

AWS.config.update({
    accessKeyId: 'AKIAJIDNL3TIGCIZOQAQ',
    secretAccessKey:'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'
});

var s3 = new AWS.S3();

app.use(multer({ // https://github.com/expressjs/multer
  dest: './public/uploads/', 
  limits : { fileSize:100000 },
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase();  },
    
  onFileUploadData: function (file, data, req, res) {
    // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
    var params = {
        
      Bucket: 'appjammms0112t',
      ContentType : 'file type',//파일 타입
      ACL : 'public-read',//접근 권한
      Key: 'object key',//경로
      Body: 'file',//파일 본문
    };

    s3.putObject(params, function (perr, pres) {
      if (perr) {
        console.log("Error uploading data: ", perr);
      } else {
        console.log("Successfully uploaded data to myBucket/myKey");
      }
    });
  }
}));

app.post('/upload', function(req, res){
    if(req.files.image !== undefined){ // `image` is the field name from your form
        res.redirect("/uploads"); // success
    }else{
        res.send("error, no file chosen");
    }
});

module.exports=router;
