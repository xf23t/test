var AWS = require('aws-sdk');
AWS.config.region = 'us-wet-2';
AWS.config.accessKeyId = 'AKIAJIDNL3TIGCIZOQAQ';
AWS.config.secretAccessKey = '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';
var s3 = new AWS.S3();
var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var fse = require('fs-extra');
var pathUtil = require('path');
var date_utils = require('date-utils');
//var easyimg = require('easyimage');
var router = express.Router();
//var pool = require('./dbConnection');
var body_parser = require('body-parser');
var async = require('async');
var ejs = require('ejs');

var mysql = require('mysql');
var connection = mysql.createConnection({

    host: 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    user: 'user',
    database: 'server',
    password: 'password'
});

/* 글쓰기 */
router.post('/', function (req, res, next) {
    //fse.emptyDirSync(__dirname+'/upload');
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = __dirname + '/upload';
    //var thumbnailDir = __dirname + '/thumbnail';
    //form.multiples = true;
    form.keepExtentions = true;
    form.parse(req, function (err, cusor, info) {

        //connection.connect(function(errn,conn)       
        //      pool.getConnection(function(err,conn){        
        /*         var mem_id = cursor['mem_id'];
                 var post_content = cursor['post_content'];
                 var keyword1 = cursor['keyword1'];
                 var keyword2 = cursor['keyword2'];
                 var keyword3 = cursor['keyword3']; */
        var post_check = "false";

        var file = info.post_photo;
        var fileName = file.name;
        var filePath = file.path;
        var contentType = file.type;

        var newFileName = user_idx + "_" + Data.now();
        var bucketname = 'appjammms0112';
        var params = {
            Bucket: bucketname,
            Key: newFileName,
            ACL: 'public-read',
            ContentType: contentType,
            Body: fs.createReadStream(filePath)
        };
        s3.putObject(params, function (err, data) {
            if (err == null) {

                connection.query('update user set user_pic = ? where user_idx = ?;', ["http://" + bucketname + ".s3-website.ap-northeast-2.amazonaws.com" + newFileName, req.body.user_idx], function (error, info) {

                    if (error = null) {
                        res.status(201).json({
                            result: true,

                        });
                    } else {
                        console.log("error", error);
                        res.status(501).json({
                            result: false,
                            reason: "no",
                        });
                    }
                });
            } else {
                console.log("err", err);
                res.status(503).json({
                    result: false,
                    reason: "nono",
                });
            }
        });
    });
});



/*               console.log('error:'+err);
               res.statusCode = 404;
               res.end("error");
            }
            else{
               var sql1 = "insert into post(post_date, post_content, post_photo, keyword1, keyword2, keyword3, mem_id, post_check) values (?,?,?,?,?,?,?,?)";
               var data1 = [getCurrentTime(),post_content,"http://"+s3.endpoint.host+"/"+bucketname+'/todak_image/'+newFileName, keyword1, keyword2, keyword3,mem_id,post_check];
               conn.query(sql1, data1,function(err,result1){
                  if (err){
                     console.log('error:'+err);
                     res.statusCode = 404;
                     res.end("error");
                  }
                  else {
                     res.json({'result':"success"});
                  }
               });
            }
            
            // else
         }); //putObject
         conn.release(); //waterfall
       }); //pool
   }); // form parse
});
*/
