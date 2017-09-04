const express = require('express')
const fs = require('fs');
const { URL } = require('url');
const util = require('util');

const app = express();

var lockFile = "_lock_file.lock";
var statsFile = "reports/index.html";
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

function runningTime() {
    fs.stat(lockFile, function(err, stats) {
        if (err) return cb2(err);
        var birth = stats.birthtime;
        var deltaTime = parseInt((new Date().getTime() - birth.getTime()) / 1000 / 60);
        console.error("Here are stats :", deltaTime);
        return deltaTime
    });
}

function deleteLock() {
    fs.unlink(lockFile, (err) => {
        if (err) throw err;
        console.log(util.format('Successfully deleted %s', lockFile));
    })
}