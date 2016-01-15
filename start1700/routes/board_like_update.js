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
    var board_idx = req.body.board_idx;

    connection.query('select count(*) cnt from boardLike where user_idx = ? and board_idx = ?;', [user_idx, board_idx], function (error, cursor) {
        
        var cnt = cursor[0].cnt;
        
        if (cnt == 1) { //이미 있으면 없애고 count -1

//            connection.query('delete from boardLike where user_idx = ? and board_idx = ?;', [user_idx, board_idx], function (err,info) {

  //              if (err == null) {
//                    connection.query('update board set board_like_count = board_like_count - 1 where board_idx = ?;', [board_idx]);
//                } else
//			console.log("cursor",cursor);
                    res.status(501).json({
                        result: 0,
                        reason: "Already Click",
                    });
//            });
        }

        else { //없으면 추가 하고 count+1

            connection.query('INSERT INTO boardLike(user_idx, board_idx) VALUES (?, ?) ;', [user_idx, board_idx], function (err, info) {
                if (err == null) {

			
                    connection.query('update board set board_like_count = board_like_count + 1 where board_idx = ?', [board_idx]);
			res.status(200).json({
			result : 1,
			});
			
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
