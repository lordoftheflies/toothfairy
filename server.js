var express = require("express");
var multer = require('multer');
var jsonfile = require('jsonfile')
var fs = require('fs');
var path = require('path');

var app = express();
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './temp');
    },
    filename: function (req, file, callback) {
//        
//        console.log('------------------------------');
//        console.log(file);
//        console.log('------------------------------');
//        console.log(req);
//        console.log('------------------------------');

        var manifestFile = './temp/' + file.originalname + '.manifest';
        var obj = {
            version: 1,
            enableSceneOffline: true,
            enableTexturesOffline: true
        }

        jsonfile.writeFile(manifestFile, obj, {spaces: 2}, function (err) {
            console.error(err)
        });

        callback(null, file.originalname);


//        callback(null, file.originalName);
    }
});
var url = require('url');
var upload = multer({storage: storage}); //.array('temp');

/** Permissible loading a single file, 
 the value of the attribute "name" in the form of "recfile". **/
var type = upload.single('file');

//var upload = multer({dest: 'temp/'}).single('temp');
var fs = require('fs');

/** Permissible loading a single file, 
 the value of the attribute "name" in the form of "recfile". **/
//var type = upload.single('recfile');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/list', function (req, res) {

    var dir = __dirname + "/temp";
    var result = new Array();
    console.log('list files ...');
    fs.readdir(dir, (err, files) => {
        files.forEach(file => {
            console.log('-', file);
            if (file.indexOf('manifest') === -1) result.push(file);
        });

        console.log('Result', result);
        res.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify(result);
        res.end(json);
    })

});

//
app.get('/file/:fileName', function (req, res) {
    var fileName = req.params.fileName;

    var file = __dirname + "/temp/" + fileName;
    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

//    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    res.sendFile(file);
});

app.put('/upload', type, function (req, res) {
    console.log('Upload new file ...');
//    
//    console.log(req);
    console.log(req.file.originalname);
//    console.log(req.file.originalname);

//    
//    upload(req, res, function (err) {
//        if (err) {
//            console.error('Error uploading file.', err);
//            return res.end("Error uploading file.");
//        }
//        console.log("File is uploaded");

//    });

    /** When using the "single"
     data come in "req.file" regardless of the attribute "name". **/
//    console.log(req.file);
//    
//    var tmp_path = req.file.path;
//
//    /** The original name of the uploaded file
//     stored in the variable "originalname". **/
//    var target_path = 'temp/' + req.file.originalname;
//
//    /** A better way to copy the uploaded file. **/
//    var src = fs.createReadStream(tmp_path);
//    var dest = fs.createWriteStream(target_path);
//    src.pipe(dest);
//    src.on('end', function () {
    console.log("File is uploaded");

    res.writeHead(200, {"Content-Type": "application/json"});
    var json = JSON.stringify({
        name: req.file.originalname
    });
    res.end(json);


//    res.writeHead(200);
//    res.write(req.file.originalname);
//
//    res.end("File is uploaded");
//    res.sendFile(req.file[0]);

//    });
//    src.on('error', function (err) {
//        console.error('Error uploading file.', err);
//        res.render('error');
//    });
});

app.listen(3000, function () {
    console.log("Working on port 3000");
});
//
////var express = require('express');
//var app = express();
//var path = require('path');
//var formidable = require('formidable');
//var fs = require('fs');
//
//app.use(express.static(path.join(__dirname, 'temp')));
//

//
////app.get('/', function(req, res){
////  res.sendFile(path.join(__dirname, 'views/index.html'));
////});
//
//app.post('/', function (req, res) {
//    console.log('Upload bodymodel ...');
//
//    // create an incoming form object
//    var form = new formidable.IncomingForm();
//
//    // specify that we want to allow the user to upload multiple files in a single request
//    form.multiples = true;
//
//    // store all uploads in the /temp directory
//    form.uploadDir = path.join(__dirname, '/temp');
//
//    // every time a file has been uploaded successfully,
//    // rename it to it's orignal name
//    form.on('file', function (field, file) {
//        fs.rename(file.path, path.join(form.uploadDir, file.name));
//    });
//
//    // log any errors that occur
//    form.on('error', function (err) {
//        console.log('An error has occured: \n' + err);
//    });
//
//    // once all the files have been uploaded, send a response to the client
//    form.on('end', function () {
//        res.end('success');
//    });
//
//    // parse the incoming request containing the form data
//    form.parse(req);
//
//});
//
//var server = app.listen(3000, function () {
//    console.log('Server listening on port 3000');
//});