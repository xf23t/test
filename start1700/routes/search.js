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

    connection.query('select * from board where board_title like ?;', ["%"+req.body.board_title+"%"], function (err, cursor) {

        if (cursor.length > 0) {
            res.json(cursor);
            console.log("cursor", cursor);
        } else
            res.status(503).json({

                result: false,
                reason: "fail",
            })
   
    });
});

module.exports = router;
