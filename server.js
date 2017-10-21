var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var path = require('path');
var app = express()
const fs = require("fs"); //Load the filesystem module


app.use('/', express.static(path.join(__dirname, 'views')));



var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

app.post('/api/file', function(req, res) {
	var upload = multer({
		storage: storage
	}).single('userFile');
	upload(req, res, function(err) {
		var filename = req['file']['filename']
	 var stats = fs.statSync('./uploads/'+filename)
    var fileSizeInBytes = stats["size"]
		res.json({success:true,
			message:'File Is Uploaded',
			filesize_in_bytes:fileSizeInBytes
		})
	})
})
 

app.get('/',function(req,res){
res.sendFile('index.html');
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
