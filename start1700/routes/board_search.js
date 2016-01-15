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

router.get('/', function(req,res,next){
    
        connection.query('SELECT * FROM board WHERE middleClass='' AND ( board_title LIKE '%?%' OR board_contents LIKE '%?%') ORDER BY board_ids DESC;',[req.params.board_idx, req.params.board_contents], function (err, cursor) {
           if (cursor.length > 0) {

//              res.json(cursor[0]);
               
            res.json({
              result: true,
              Class: cursor[0].middleClass_name,
            userName: cursor[0].user_nick,
             BoardTitle: cursor[0].board_title,
                BoardContents: cursor[0].board_contents,
                BoardRegdate: cursor[0].board_regdate,
                BoardHit : cursor[0].board_like_count,


            });
        }   else
            res.status(503).json({
                result: false,
                reason: "Error"
            });


 //           connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });

});

module.exports = router;
