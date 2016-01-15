var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({

    host: 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    user: 'user',
    database: 'server',
    password: 'password'
});

/* GET users listing. */
router.get('/', function(req, res, next) {

    res.redirect('/board');
});

router.get('/:board_idx', function(req,res,next){

        connection.query('select m.middleClass_name,b.board_hit,b.board_pic,b.board_contents,u.user_pic, u.user_nick, b.board_title, b.board_regdate, b.board_like_count,b.board_comment_count from middleClass m,board b,user u where m.middleClass_idx=b.middleClass_idx and b.user_idx=u.user_idx and b.board_idx = ?  ;',[req.params.board_idx], function (err, cursor) {
           if (cursor.length > 0) {

//              res.json(cursor[0]);
               
            res.json({
              result: true,
		middleClass_name: cursor[0].middleClass_name,
                user_nick: cursor[0].user_nick,
                user_pic : cursor[0].user_pic,
                board_title: cursor[0].board_title,
                board_contents: cursor[0].board_contents,
                board_pic : cursor[0].board_pic,
                board_regdate: cursor[0].board_regdate,
                board_hit : cursor[0].board_hit,
                board_like_count : cursor[0].board_like_count,
                board_comment_count : cursor[0].board_comment_count,

            });
        }   else
            res.status(503).json({
                result: false,
                reason: "Error"
            });

        });

});

module.exports = router;
