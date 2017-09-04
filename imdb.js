/*==============================================================================*/
/* Casper generated Fri Sep 01 2017 23:56:13 GMT+0100 (BST) */
/*==============================================================================*/

var x = require('casper').selectXPath;
casper.options.viewportSize = { width: 1615, height: 930 };
casper.on('page.error', function(msg, trace) {
    this.echo('Error: ' + msg, 'ERROR');
    for (var i = 0; i < trace.length; i++) {
        var step = trace[i];
        this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
    }
});
casper.test.begin('Resurrectio test', function(test) {
    casper.start('http://www.imdb.com/title/tt0200276/?ref_=login');
    casper.waitForSelector("form#navbar-form input[name='q']",
        function success() {
            test.assertExists("form#navbar-form input[name='q']");
            this.click("form#navbar-form input[name='q']");
        },
        function fail() {
            test.assertExists("form#navbar-form input[name='q']");
        });
    casper.waitForSelector("input[name='q']",
        function success() {
            this.sendKeys("input[name='q']", "the west wing");
        },
        function fail() {
            test.assertExists("input[name='q']");
        });
    casper.waitForSelector(".poster.highlighted .suggestionlabel",
        function success() {
            test.assertExists(".poster.highlighted .suggestionlabel");
            this.click(".poster.highlighted .suggestionlabel");
        },
        function fail() {
            test.assertExists(".poster.highlighted .suggestionlabel");
        });
    casper.waitForSelector("form#navbar-form input[name='q']",
        function success() {
            test.assertExists("form#navbar-form input[name='q']");
            this.click("form#navbar-form input[name='q']");
        },
        function fail() {
            test.assertExists("form#navbar-form input[name='q']");
        });
    casper.waitForSelector("input[name='q']",
        function success() {
            this.sendKeys("input[name='q']", "the west wing");
        },
        function fail() {
            test.assertExists("input[name='q']");
        });
    casper.waitForSelector(".magnifyingglass.navbarSprite",
        function success() {
            test.assertExists(".magnifyingglass.navbarSprite");
            this.click(".magnifyingglass.navbarSprite");
        },
        function fail() {
            test.assertExists(".magnifyingglass.navbarSprite");
        });
    /* submit form */
    casper.waitForSelector(x("//a[normalize-space(text())='The West Wing']"),
        function success() {
            test.assertExists(x("//a[normalize-space(text())='The West Wing']"));
            this.click(x("//a[normalize-space(text())='The West Wing']"));
        },
        function fail() {
            test.assertExists(x("//a[normalize-space(text())='The West Wing']"));
        });
    casper.waitForSelector(x("//*[contains(text(), \'Allison Janney\')]"),
        function success() {
            test.assertExists(x("//*[contains(text(), \'Allison Janney\')]"));
        },
        function fail() {
            test.assertExists(x("//*[contains(text(), \'Allison Janney\')]"));
        });
    casper.then(function() {
        test.assertTitle('The West Wing (TV Series 1999–2006) - IMDb');
    });
    casper.waitForSelector(x("//*[contains(text(), \'7\')]"),
        function success() {
            test.assertExists(x("//*[contains(text(), \'7\')]"));
        },
        function fail() {
            test.assertExists(x("//*[contains(text(), \'7\')]"));
        });
    casper.waitForSelector(x("//*[contains(text(), \'Producer\')]"),
        function success() {
            test.assertExists(x("//*[contains(text(), \'Producer\')]"));
        },
        function fail() {
            test.assertExists(x("//*[contains(text(), \'Producer\')]"));
        });

    casper.run(function() { test.done(); });
});