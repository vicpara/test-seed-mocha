var chai = require('chai');
var assert = chai.assert;
var expect = require('expect.js');
var cp = require('child_process').exec;
var PingLite = require('ping-lite');
var request = require('request');



var host = 'zhkpdo01.practice.linklaters.net';
var hostGoogle = 'google.com';
var hostUrl = 'https://zhkpdo01.practice.linklaters.net:8000/';

describe("DBS server", function () {

    var hostToTest = host;
    describe(hostToTest + ' should be up and running', function () {
        this.timeout(2400);

        var ping = new PingLite(hostToTest);
        it('reply to the first ping', function (done) {
            ping.send(function (err, ms) {
                console.log("\t" + hostToTest + ' responded in ' + ms + ' ms.');
                expect(ms).to.not.be(null);
                expect(typeof ms).to.be.equal(typeof 3);
                expect(Number.isInteger(ms)).to.be(true);
                expect(ms).to.be.lessThan(300);
                done();
            });
        });

        it('reply to the second ping', function (done) {
            ping.send(function (err, ms) {
                console.log("\t" + hostToTest + ' responded in ' + ms + ' ms.');
                expect(ms).to.not.be(null);
                expect(typeof ms).to.be.equal('number');
                expect(Number.isInteger(ms)).to.be(true);
                expect(ms).to.be.lessThan(300);
                done();
            });
        });

        it('reply to the third ping', function (done) {
            ping.send(function (err, ms) {
                console.log("\t" + hostToTest + ' responded in ' + ms + ' ms.');
                expect(ms).to.not.be(null);
                expect(typeof (ms)).to.be.equal(typeof 3);
                expect(Number.isInteger(ms)).to.be(true);
                expect(ms).to.be.lessThan(300);
                done();
            });
        });
    });

    describe(hostToTest + " should load the landing page", function () {
        var hostUrl = 'https://' + hostToTest + ':8000/';
        var options = {
            url: hostUrl,
            strictSSL: false,
            rejectUnauthorized: false,
            headers: {
                "iv-user": "TestUser",
                "iv-groups": "testRequester@yahoo.com",
                "dbsadid": "testuser@yahoo.com"
            }
        };

        it("should reply in a timely manner", function (done) {
            request(options, callback);

            function callback(error, response, body) {
                console.error(body);

                expect(error).to.be(null);
                expect(response.statusCode).to.be(200);
                expect(response.timings.response).lessThan(400);
                expect(response.elapsedTime).lessThan(400);

                expect(body.indexOf("login")).not.equal(-1);
                expect(body.indexOf("submit")).not.equal(-1);
                expect(body.indexOf("<title>Project Nakhodaxxx</title>")).not.equal(-1);
                done();
            }
        });
    });
});