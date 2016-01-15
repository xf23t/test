var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({

    host: 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    user: 'user',
    database: 'server',
    password: 'password'
});

router.post('/', function (req, res, next) {
    var board_idx = req.board_idx;

    connection.query('delete from board where board_idx=?;', [req.body.board_idx], function (error, info) {
        if (info.affectedRows == 1) {
	
		console.log("info",info);
            res.status(201).json({
                result: true,
            });


        } else{
		console.log("error",error);
            res.status(503).json({

                result: false,
                reason: "error",
            });
}
    });
});



module.exports = router;
