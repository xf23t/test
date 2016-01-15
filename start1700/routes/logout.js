var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'server',
});

router.get('/logout',function(req, res){
    req.session.destroy(function(error){
        if(error) console.error('error',error);
//        res.send('<script>alert("로그아웃!");location.href="/";</script>');
        console.log(error);
    });
});

module.exports = router;