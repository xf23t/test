var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'server',
});

router.post('/', function (req, res, next) {

    connection.query('delete from comment where comment_idx = ? and user_idx = ? ;', [req.body.comment_idx, req.body.user_idx], function (err, cursor) {

        
           if (info.affectedRows == 1){ 
            res.status(201).json({
                
                result : true,
            });
        }
                
       /* if (cursor.length > 0)
            res.status(503).json({
                result: false,
                reason: "cannot find",
            });
            */
        else
            res.status(503).json({

                result: false,
            });

    });
});

module.exports = router;



