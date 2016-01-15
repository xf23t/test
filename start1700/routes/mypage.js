var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({

    host: 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    user: 'user',
    database: 'server',
    password: 'password'
});

router.get('/:user_idx', function (req, res, next) {

    var id = req.params.user_idx;
    connection.query('select count(*) myBoardCount from board where user_idx = ?;', [id], function (error, cursor) {

        if (error == null)
            myBoardCount = cursor[0].myBoardCount;
        else
            res.status(503).json({
                result: false,
                reason: "er",
            });
    });
    connection.query('select count(*) myReplyBoardCount from board, comment where board.board_idx = comment.board_idx and comment.user_idx = ?;', [id], function (error, cursor) {

        if (error == null)
            myReplyBoardCount = cursor[0].myReplyBoardCount;
        else
            res.status(503).json({
                result: "false",
                reason: "err",
            });
    });

    connection.query('select u.user_nick, u.user_id_email, u.user_pic, u.user_point, m.middleClass_name from user u, middleClass m where u.user_middleClass_idx = m. middleClass_idx and u.user_idx = ?;', [req.params.user_idx], function (err, cursor) {

        if (cursor.length > 0) {

            res.json({
                user_nick: cursor[0].user_nick,
                user_id_email: cursor[0].user_id_email,
                user_pic: cursor[0].user_pic,
                user_point: cursor[0].user_point,
                middleClass_name: cursor[0].middleClass_name,
                myBoardCnt: myBoardCount,
                myReplyBoardCnt: myReplyBoardCount,
            });

        } else

            res.status(503).json({

            result: false,
            reason: "error",
        });
    });
});

module.exports = router;
