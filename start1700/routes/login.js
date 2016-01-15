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
    var id = req.body.user_id_email;
    var pw = req.body.user_pw;

    connection.query('select count(*) cnt from user where user_id_email=? AND user_pw=?;', [id, pw], function (error, info) {
        if (error) console.error('error', error);
        console.log('info', info);
        var cnt = info[0].cnt;
        if (cnt == 1) {     //아이디와 비밀번호가 존재하면, 

            connection.query('select * from user where user_id_email=?;', [id], function (err, cursor) {  //해당하는 아이디의 정보를 불러온다.

                if (cursor.length > 0) {   // (확인)
		
		res.json({
			user_idx : cursor[0].user_idx
		});

                }

            });
        } else {            // cnt ==0 일치하는 정보가 없다면
            res.status(503).json({
                result: false,
                reason: "Cannot login",
            });
        }
    });

});


module.exports = router;
