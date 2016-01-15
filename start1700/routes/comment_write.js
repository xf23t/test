var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'server',
});

router.post('/', function(req, res ,next){
    
    connection.query('insert into comment(user_idx, board_idx, comment_contents) values (?,?,?);',[req.body.user_idx, req.body.board_idx, req.body.comment_contents], function(error, info){
        
        if(error == null){
            
            connection.query('select * from comment where comment_idx = ? ;', [info.insertId], function(err, cursor){
                if(cursor.length >0){
                    
                    console.log("cursor",cursor);
                    res.json(cursor);
                }
            });
        }
        else
            res.status(503).json({
                
                result : false,
                reason : "Error",
            });
    });
});
module.exports = router;

