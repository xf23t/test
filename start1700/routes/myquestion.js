var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'server',
});

router.get('/:user_idx', function (req, res, next) {

    connection.query('select * from board where user_idx = ? ;', [req.params.user_idx], function (err, cursor) {
        console.log("cursor", cursor);
        res.json(cursor);
    });
});

module.exports = router;