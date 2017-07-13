var CronJob = require('cron').CronJob;
var fs = require("fs");
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var myBucket = 'etg-bucket';
var myKey = 'requests.gor';

getS3Stuff();
var job  = new CronJob({
    cronTime: '00 30 11 * * 1-5',
    onTick: function() {
        console.log('discovering goreplay file...');
        getGorFile(function(data) {
            stuffS3With(data);
        });
        /*
        * Runs every weekday (Monday through Friday)
        * at 11:30:00 AM. It does not run on Saturday
        * or Sunday.
        */
    },
    start: false,
    timeZone: 'America/Los_Angeles'
});

function getGorFile(callback) {
    var data;
    fs.readFile( "./" + "requests.gor","utf8", function (err, data) {
        if (err) console.log('no requests.gor file found yet');
        callback(data);
    });
}

function getS3Stuff() {
    var s3 = new AWS.S3();
    var params = {Bucket: myBucket, Key: myKey};
    var file = require('fs').createWriteStream('./requests.gor');
    s3.getObject(params).createReadStream().pipe(file);
}

function stuffS3With(data) {
    params = {Bucket: myBucket, Key: myKey, Body: data};
    s3.putObject(params, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log("Successfully uploaded data to myBucket/myKey");
        }
    });
}

module.exports = {
    start: function() {
        job.start();
    }
};