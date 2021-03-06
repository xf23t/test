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

    var user_idx = req.body.user_idx;
    var comment_idx = req.body.comment_idx;

    connection.query('select count(*) cnt from commentLike where user_idx = ? and comment_idx = ?;', [user_idx, comment_idx], function (error, cursor) {

        var cnt = cursor[0].cnt;

        if (cnt == 1) { //이미 있으면 없애고 count -1

            connection.query('delete from commentLike where user_idx = ? and comment_idx = ?;', [user_idx, comment_idx], function (err, info) {

                if (err == null) {
                    connection.query('update comment set comment_like_count = comment_like_count - 1 where comment_idx = ?;', [comment_idx]);
                } else
                    res.status(501).json({
                        result: false,
                        reason: "update fail",
                    });
            });
        } else { //없으면 추가 하고 count+1

            connection.query('INSERT INTO commentLike(user_idx, comment_idx) VALUES (?, ?) ;', [user_idx, comment_idx], function (err, info) {
                if (err == null) {

                    connection.query('update comment set comment_like_count = comment_like_count + 1 where comment_idx = ?', [comment_idx]);
                } else
                    res.status(502).json({

                        result: false,
                        reason: "update fail2",
                    });
            });
        }


    });
});
module.exports = router;
