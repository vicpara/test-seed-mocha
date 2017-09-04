const express = require('express')
const fs = require('fs');
const { URL } = require('url');
const util = require('util');

const app = express();

var lockFile = "_lock_file.lock";
var reportFile = "package.json";
var portNumber = 5000;

app.get('/', function(req, res) {
    res.send('Hello World!');
})


app.listen(portNumber, function() {
    console.log(util.format('Example app listening on port %d!', portNumber));
})

app.get('/index', function(req, res) {
    console.error("File job");
    getViewStats();
    if (fs.existsSync(lockFile)) {
        runningTime()
    } else {

    }
    res.send('Hello INDEX World!')
})

function getViewStats() {
    var running = false;
    var reportExists = false;

    Promise
        .all([fileExists(lockFile), fileExists(reportFile), runningTime(), reportCreationTime()])
        .then(function(res) {
            console.error("HA AHAHAHAHAHAHA " + res[0] + " " + res[1] + " " + res[2] + " " + res[3]);
        });

    Promise.all(
        [fileExists(lockFile), runningTime(), fileExists(reportFile), reportCreationTime()]
    ).then(function(res) {
        return {
            "running": res[0],
            "runningTime": res[1],
            "hasReport": res[2],
            "reportCreated": res[3]
        }
    });
}

function fileExists(filename) {
    return new Promise(function(resolve, reject) {
        fs.exists(filename, (exists) => { resolve(exists); });
    });
}

function reportCreationTime() {
    fileExists(reportFile).then((exists) => {
        console.error(" >>> HERE WE HAAAAAAVVVEEE: " + exists)
        return new Promise(function(resolve, reject) {
            resolve(10);
            // try {
            //     resolve(fs.statSync(reportFile).birth);
            // } catch (ex) { reject(ex) }
            // fs.stat(reportFile, function (err, stats) {
            //     if (err) reject(err);
            //     resolve(stats.birthtime);
            // });
        });
    });
}


function runningTime() {
    return new Promise(function(resolve, reject) {
        fs.stat(lockFile, function(err, stats) {
            if (err) reject(err);
            var birth = stats.birthtime;
            var deltaTime = parseInt((new Date().getTime() - birth.getTime()) / 1000 / 60);
            console.error("Here are stats :", deltaTime);
            resolve(deltaTime);
        });
    });
}

function createLock() {
    fs.open(lockFile, 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error(lockFile + ' myfile already exists');
                return;
            }
            throw err;
        }
    });
}

function deleteLock() {
    fs.unlink(lockFile, (err) => {
        if (err) throw err;
        console.log(util.format('Successfully deleted %s', lockFile));
    })
}