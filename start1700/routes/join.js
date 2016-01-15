var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'server',

});

router.post('/', function (req, res, next) { //아이디 중복확인 
    var id = req.body.user_id_email; //id 라고 변경함
    var pw = req.body.user_pw;

    connection.query('select count(*) cnt from user where user_id_email=?;', [id], function (error, info) {
        //        if (error) console.error('error', error);
        console.log('info', info);
        var cnt = info[0].cnt;
        if (cnt == 0) {

            res.status(200).json({
                result : true,
            });
            
            
        } else
            res.status(503).json({
                result: false,
                reason: "error-2"
            });
    });
});

module.exports = router;

