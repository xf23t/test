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
/*router.get('/', function(req, res, next) {

    res.redirect('/board');

});*/

router.get('/:board_idx', function(req,res,next){

   
//중분류,사용자닉네임,게시판제목,게시판내용,게시판글작성날짜,게시판좋아요몇개맏았는지 불러옴
        connection.query('select c.comment_idx, u.user_pic, u.user_nick, c.comment_contents, c.comment_regdate, u.user_idx , c.comment_like_count  from comment c,board b,user u  where c.user_idx = u.user_idx and c.board_idx=b.board_idx and c.board_idx=?;',[req.params.board_idx], function (err, cursor) {
           if (cursor.length > 0) {

//              res.json(cursor[0]);
               
            res.json(cursor);
/*              result: true,

              UserNick: cursor[0].user_nick,
              CommentContents: cursor[0].comment_contents,
             CommentRegdate: cursor[0].comment_regdate,
                CommentLike : cursor[0].commentLike_idx,
*/

            
        }   else
            res.status(503).json({
                result: false,
                reason: "Error"
            });


 
        });

});

module.exports = router;
