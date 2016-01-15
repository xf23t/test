var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({

    host: 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    user: 'user',
    database: 'server',
    password: 'password'
});

router.get('/', function(req,res,next){

  
//중분류,사용자닉네임,게시판제목,게시판내용,게시판글작성날짜,게시판좋아요몇개맏았는지 불러옴
        connection.query('select m.middleClass_name, b.board_idx, b.board_title, b.board_like_count from middleClass m, board b where m.middleClass_idx = b.middleClass_idx order by b.board_like_count desc limit 0,3;', function (err, cursor) {


  
        res.json(cursor);
    });
});

module.exports =router;
