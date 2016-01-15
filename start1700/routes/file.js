var express = require('express');
var router = express.Router();

var multer = require('multer'), //for handling multipart/form-data
fs = require('fs'),
S3FS = require('s3fs'), //abstraction over Amazon S3's SDK
s3fsImpl = new S3FS('appjammms0112', {
       accessKeyId: 'AKIAIWPF6U2G6HU45EIA',
       secretAccessKey: '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'
        });


// POST a new Path 
router.post('/', [ multer(), function(req, res) {
        var file = req.files.file;
        console.log(file);

/* Output:
{ 
        fieldname: 'file',
        originalname: 'ice-boxes.jpg',
        name: '2658a8f666e33ab1ec39dc8b7b20970b.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        path: 'public/uploads/2658a8f666e33ab1ec39dc8b7b20970b.jpg',
        extension: 'jpg',
        size: 88076,
        truncated: false,
        buffer: null 
 }
*/

        //Create a file stream
   var stream = fs.createReadStream(file.path);

   //writeFile calls putObject behind the scenes
   s3fsImpl.writeFile(file.name, stream).then(function () {
        fs.unlink(file.path, function (err) {
            if (err) {
                console.error(err);
            }
            else
                res.status(503).json({
                    result : false,
                    reason : "fail",
                });
        });
        res.status(200).end();
    });

}]);


module.exports = router;

