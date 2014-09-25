
/*
 * GET home page.
 */
var fs = require('fs');
var AWS = require('aws-sdk');

//Read config values from a JSON file.
var config = fs.readFileSync('./app_config.json', 'utf8');
config = JSON.parse(config);

//Create DynamoDB client and pass in region.
var db = new AWS.DynamoDB({region: config.AWS_REGION});

exports.index = function(req, res){
  //readdata(req, res);
  //console.log(signdata);
  res.render('index', { appTitle: '890 Cloud Computing Demo'});
};

//Add read from database to local
var readdata = function(req, res) {
  var formData = {
    TableName: config.STARTUP_SIGNUP_TABLE,
    Select: 'ALL_ATTRIBUTES',
  };
  db.scan(formData, function (err, data) {
    if (err) {
      console.log('Error read database', err);
    } else {
      var sr = new ServiceResult ('success');
      sr = data.rows;
      res.send(sr);
      // document.getElementById("datatable").innerHTML = "XXX";
      //signdata = data;
      //console.log(data['Items']);
    }
  });
};

function ServiceResult (status){
    this.ts = new Date();
    this.status = status;
    this.output = new Array();
}
