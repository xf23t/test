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
    connection.query('select * from user where user_idx=?;', [req.params.user_idx], function (error, cursor) {

        if (cursor.length > 0) {

            res.json({
              result: true,
              userName: cursor[0].user_nick,
            userEmail: cursor[0].user_id_email,
            });
        } else
            res.status(503).json({
                result: false,
                reason: "Error"
            });
    });
});
module.exports = router;
