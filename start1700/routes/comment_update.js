var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({

    host: 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    user: 'user',
    database: 'server',
    password: 'password'
});


router.get('/:comment_idx', function(req, res, next) {
    connection.query('select * from comment where comment_idx=?;', [req.params.comment_idx], function (error, cursor) {
        if (cursor.length > 0){
            res.json(cursor[0]);
    
        }
        
        
        else
            res.status(503).json({ result : false, reason : "글을 찾을 수 없습니다." });
    });
});



router.post('/', function(req, res, next) {
      

         connection.query('update comment set comment_contents=? where comment_idx=? ;', [req.body.comment_contents,req.body.comment_idx], function (error, info) {
        if (error == null) {
            connection.query('select * from comment where comment_idx=?;', [req.body.comment_idx], function (err, cursor) {
                if (cursor.length > 0) {
                    res.json({
                        result : true,
                        
                        Usernick : cursor[0].user_idx,
                        
                        CommentRegdate: cursor[0].commentregdate,
                        CommentContents : cursor[0].comment_contents,
                    });
                }
                else
                    res.status(503).json({ result : false, reason : "Cannot post article" });
            });
        }
        else
            res.status(503).json(error);
    });
});

module.exports = router;
