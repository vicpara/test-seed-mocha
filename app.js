const express = require('express')
const fs = require('fs');
const { URL } = require('url');
const util = require('util');

const app = express();

var lockFile = "_lock_file.lock";
var reportFile = "reports/index.html";
var portNumber = 5000;

app.get('/', function(req, res) {
    res.send('Hello World!');
})


app.listen(portNumber, function() {
    console.log(util.format('Example app listening on port %d!', portNumber));
})

app.get('/index', function(req, res) {
    console.error("File job");
    if (fs.existsSync(lockFile)) {
        runningTime()
    } else {
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
    res.send('Hello INDEX World!')
})

function getViewStats() {
    var running = false;
    var reportExists = false;

    Promise.all([fileExists(lockFile)]).then(function(res) {
        console.error("HA AHAHAHAHAHAHA " + res[0]);
    });
    // fileExists(lockFile);
    // fileExists(reportFile);

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
        fs.exists(filename, function(exists) {
            resolve(exists);
        });
    });
}

function reportCreationTime() {
    fs.stat(reportFile, function(err, stats) {
        if (err) return cb2(err);
        return stats.birthtime;
    });
}

function runningTime() {
    fs.stat(lockFile, function(err, stats) {
        if (err) return cb2(err);
        var birth = stats.birthtime;
        var deltaTime = parseInt((new Date().getTime() - birth.getTime()) / 1000 / 60);
        console.error("Here are stats :", deltaTime);
        return deltaTime;
    });
}

function deleteLock() {
    fs.unlink(lockFile, (err) => {
        if (err) throw err;
        console.log(util.format('Successfully deleted %s', lockFile));
    })
}