var express = require("express");
var app     = express();
var path    = require("path");
var multer  =   require('multer');
var favicon = require('serve-favicon');
var sharp = require('sharp');
var colors = require('colors');

var debug = true;


// var mongoose = require('mongoose');
// require('./models/db');

// var Img = mongoose.model('Imagery')



var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname+ '/public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, 'efarrari' + '-' + Date.now() + getExtension(file.originalname));
  },

});

var upload = multer({ storage : storage});
var uploadia = upload.single('userPhoto');

app.post('/api/photo', upload.single('userPhoto'), function (req, res) {

  sharp(req.file.path)
    .resize(512, 288)
    .toFile('./public/uploads'+'/efarrari_thumb'+ '-' +req.file.filename , function(err) {
      // output.jpg is a 300 pixels wide and 200 pixels high image
      // containing a scaled and cropped version of input.jpg
    });

  // Img.create(
  //   {
  //   name: req.body.name,
  //   sensor: req.body.sensor,
  //   date: req.body.date,
  //   pack: req.body.pack,
  //   url : stripPublic(req.file.path),
  //   thumb: '/uploads'+'/efarrari_thumb'+ '-' +req.file.filename,
  //   location: req.body.location
  //   }
  //   , null);


  uploadia(req,res,function(err) {
         if(err) {
             return res.end("Error uploading file.");
         }
         res.end("File is uploaded");
     });
});


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '/img')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/css'));




app.get('/',function(req,res){
  console.log(colors.white.bgCyan(req.headers));
  // console.log(res);
      res.sendFile(__dirname + "/views/index.html");
});

app.get('/efarrari',function(req,res){
  res.sendFile(path.join(__dirname+'/views/efarrari.html'));
  //__dirname : It will resolve to your project folder.
});

  app.get('/software',function(req,res){
    res.sendFile(path.join(__dirname+'/views/software.html'));
    //__dirname : It will resolve to your project folder.
  });


  app.get('/design',function(req,res){
    res.sendFile(path.join(__dirname+'/views/design.html'));
    //__dirname : It will resolve to your project folder.
  });

  app.get('/myngo',function(req,res){
    res.sendFile(path.join(__dirname+'/views/myngo.html'));
    //__dirname : It will resolve to your project folder.
  });

  app.get('/hd_project',function(req,res){
    res.sendFile(path.join(__dirname+'/views/hd_project.html'));
    //__dirname : It will resolve to your project folder.
  });


app.get('/efarrari/source',function(req,res){
  console.log(colors.white.bgCyan(humanReadableDate()));
  // res.sendFile(path.join(__dirname+'/views/efarrari.html'));

  var locations = [];

// Img.find(null, null, null, function (err, docs) {
//   console.log(docs);

// locations.push(docs);
  docs.forEach(function(doc) {
        //  locations.push(doc)
        locations.push(
          doc
      // distance: theEarth.getDistanceFromRads(doc.dis),
      // name: doc.name
      // address: doc.obj.address,
      // rating: doc.obj.rating,
      // facilities: doc.obj.facilities,
      // _id: doc.obj._id

);
})
sendJsonResponse(res, 200, locations);
  //__dirname : It will resolve to your project folder.
});

});
app.get('/efarrari/upload',function(req,res){
  res.sendFile(path.join(__dirname+'/views/upload.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));

});

app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.sendFile(path.join(__dirname+'/views/not_found.html'));
  // next(err);
});

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// Loc.create({
//   name: req.body.name,
//   address: req.body.address,
//   facilities: req.body.facilities.split(","),
//   coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
//   openingTimes: [{
//     days: req.body.days1,
// opening: req.body.opening1,
// closing: req.body.closing1,
// closed: req.body.closed1,
// }, {
// days: req.body.days2,
// opening: req.body.opening2,
// closing: req.body.closing2,
//     closed: req.body.closed2,
//   }]
// }, function(err, location) {
//   if (err) {
//     sendJsonResponse(res, 400, err);
//   } else {
//     sendJsonResponse(res, 201, location);
//   }
// });


app.listen(3000,function(){
    console.log("Working on port 3000");
});

function getExtension(filename) {

  if(debug)
  console.log(filename);
  while (filename.substring(1).indexOf('.') !== -1)
    filename = filename.substring(1).substring(filename.indexOf('.'));

    return filename; //returns extention of the file;
}

function stripPublic(path){
  //TODO: this is what's causing the images to be inaccessible


  var varia = path;

  // console.log(varia);

  var cutIndex = varia.indexOf("public") + "public".length;

  // console.log(varia.substring(cutIndex));

  return varia.substring(cutIndex);

}

function humanReadableDate(){
  var time = new Date();
  var year = time.getFullYear();
  var month = time.getMonth()+1;
  var date1 = time.getDate();
  var hour = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  return "Accessed at: "+  year + "-" + month+"-"+date1+" "+hour+":"+minutes+":"+seconds;

}
