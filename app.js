const express = require('express')
const fs = require('fs');
const ps = require('child_process');
const util = require('util');

const app = express();

var lockFile = "_lock_file.lock";
var reportFile = "package.json";
var portNumber = 5000;
var lastRun = 0;

app.listen(portNumber, function () {
    console.log(util.format('Example app listening on port %d!', portNumber));
    updateState();
})

app.get('/', function (req, res) {
    res.send('Hello World!');
})

app.get("/test/updates", (req, res) => {
    getViewStats().catch(err => {
        console.error(err);
    }).then(updates => {
        res.json(updates);
    })
})

app.post("/run", (req, res) => {
    var lastRunDelta = new Date() - Math.max(0, lastRun);
    if (fileExists(lockFile)) {
        //process running
        if (lastRunDelta < 1100) {
            // quick double click => force restart
            console.error("Forced TEST restart");
            startTest();
        }
    } else {
        console.error("  .... TEST start");
        startTest();
    }
    res.status(200).send();
})

app.get('/index', function (req, res) {
    console.error("File job");

    if (fs.existsSync(lockFile)) {
        runningTime()
    } else {

    }
    res.send('Hello INDEX World!')
})

function updateState() {
    if (lastRun == 0) {
        reportCreationTime()
            .then((lastReportTime) => {
                lastRun = lastReportTime.getTime();
            })
    }
}

function startTest() {
    var child = child_process.spawn('scripts/start-node.sh', {
        detached: true
    });
    child.pid
}

function getViewStats() {
    var running = false;
    var reportExists = false;

    // Promise
    //     .all([fileExists(lockFile), fileExists(reportFile), runningTime(), reportCreationTime()])
    //     .then(function (res) {
    //         console.error("HA AHAHAHAHAHAHA " + res[0] + " " + res[1] + " " + res[2] + " " + res[3]);
    //     });

    return Promise.all(
        [fileExists(lockFile), runningTime(), fileExists(reportFile), reportCreationTime()]
    ).then(function (res) {
        return {
            "running": res[0],
            "runningTime": res[1],
            "hasReport": res[2],
            "reportCreated": res[3]
        }
    });
}

function isRunning() {

}

function fileExists(filename) {
    return new Promise(function (resolve, reject) {
        fs.exists(filename, (exists) => {
            resolve(exists);
        });
    });
}

function reportCreationTime() {
    return fileExists(reportFile)
        .then((exists) => {
            return new Promise(function (resolve, reject) {
                if (!exists) {
                    resolve(new Date("January 1, 1970 00:00:00"));
                } else
                    fs.stat(reportFile, function (err, stats) {
                        if (err) {
                            console.error(err);
                            resolve(new Date("January 1, 1970 00:00:00"));
                        };
                        resolve(stats.birthtime);
                    });
            });
        });
}

function runningTime() {
    return new Promise(function (resolve, reject) {
        fs.stat(lockFile, function (err, stats) {
            if (err) reject(err);
            var birth = stats.birthtime;
            var deltaTime = parseInt((new Date().getTime() - birth.getTime()) / 1000 / 60);
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