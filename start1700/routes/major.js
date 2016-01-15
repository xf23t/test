var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'server',
});



//전공 고른거 보낼때 idx를 보낼건지 이름을 보낼건지지
router.post('/major', function (req, res, next) {
        connection.query('insert into bigClass(bigClass_idx) values (?);' [req.body.body.bigClass_name] //, req.body.middleClass_name], function (error, cursor)
        })

)


