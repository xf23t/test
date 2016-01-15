var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'server',
});

router.post('/', function (req, res, next) { //닉네임 중복확인 
    var nick = req.body.user_nick; //id 라고 변경함
//    var idx = req.body.user_idx;

    connection.query('select count(*) cnt from user where user_nick=?;', [nick], function (error, cursor) {
        //      if (error) console.error('error', error);
        
        console.log('cursor', cursor);
        var cnt = cursor[0].cnt;
        if (cnt == 0) {
            
            res.status(201).json({
                
                result : true,
            })
        
       //중복이 없을 경우 닉네임,  서버에 저장(올바른 데이터일 경우)
			
            /*
            connection.query('update user set user_nick = ? where user_idx= ? ;', [nick, idx], function (error, info) {
                if (error == null) {

                    connection.query('select * from user where user_idx=?;', [idx], function (error, cursor) {

                        if (cursor.length > 0) {

                            res.json({
                                result: true,
                                nick: cursor[0].user_nick,
                            
                            });
                        } else
                            res.status(503).json({
                                result: false,
                                reason: "인덱스가 유효하지 않습니다 ",	//인덱스 에러일경우
                            });

                    });
                } else {
                    res.status(503).json({
                        result: false,
                        reason: "This nick is already exist",
                    });
                }

            });*/
        } 
        else
            res.status(503).json({
                result: false,
                reason: "닉네임이 중복됩니다",	// 닉네임 중복일때 알려주는 에러

        });
    });
});


module.exports = router;
                                            

