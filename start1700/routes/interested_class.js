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

    var id = req.body.user_idx;
    var middle = req.body.middleClass_idx;

    connection.query('select count(*) cnt from interestedClass where user_idx = ?  and middleClass_idx = ?;', [id, middle], function (er, cur) {
        var cnt = cur[0].cnt;
        if (cnt == 0) {
            connection.query('insert into interestedClass(user_idx, middleClass_idx) values (?,?) ;', [id, middle], function (err, info) {

                if (err == null) {

                    connection.query('select * from interestedClass where user_idx = ?;', [info.insertId], function (error,cursor) {

                        console.log("cursor", cursor);

                        if (cursor.length > 0) {

                            res.json(cursor);
                        } else
                            res.status(503).json({
                                result: false,
                                reason: "error",
                            });
                    });
                } else
                    res.status(504).json({
                        result: false,
                        reason: "error -2",
                    });
            });
        }
        else
        res.status(505).json({
            result: false,
            reason: "error -3",
        });
    });
});

module.exports = router;
