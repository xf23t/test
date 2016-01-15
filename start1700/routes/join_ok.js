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
    var nick = req.body.user_nick;
    var middle = req.body.middleClass_idx;

    connection.query('insert into user(user_id_email, user_pw, user_nick, user_middleClass_idx) values(?, ?, ?, ?);', [id, pw, nick,middle], function (error, info) {
        if (error == null) {

            connection.query('insert into interestedClass(user_idx, middleClass_idx) values(?, ?);', [info.insertId, middle], function (er, inf) {

                connection.query('select user_nick from user where user_idx = ?;', [info.insertId], function (err,cursor) {

                    if (cursor.length > 0) {

                        res.status(200).json({

                            result: true,
                        });
                    } else
                        res.status(503).json({
                            result: false,
                            reason: "error",
                        });
                });
            });

        } else
            res.status(504).json({

                result: false,
                reason: "error-2",
            });
    });
});

module.exports = router;
