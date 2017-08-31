var assert = chai.assert;

describe('hooks', function() {

    before(function() {
        // runs before all tests in this block
    });

    after(function() {
        // runs after all tests in this block
    });

    beforeEach(function() {
        // runs before each test in this block
    });

    afterEach(function() {
        // runs after each test in this block
    });

    // test cases
});

function add() {
    return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
        return prev + curr;
    }, 0);
}


describe('a suite of tests', function() {
    this.timeout(500);

    it('should take less than 500ms', function(done) {
        setTimeout(done, 300);
    });

    it('should take less than 500ms as well', function(done) {
        setTimeout(done, 250);
    });

    it('should take less than 500ms', function(done) {
        this.timeout(500);
        setTimeout(done, 300);
    });
})

describe('add()', function() {
    var tests = [
        { args: [1, 2], expected: 3 },
        { args: [1, 2, 3], expected: 6 },
        { args: [1, 2, 3, 4], expected: 10 }
    ];

    tests.forEach(function(test) {
        it('correctly adds ' + test.args.length + ' args', function() {
            var res = add.apply(null, test.args);
            assert.equal(res, test.expected);
        });
    });
});

describe('api', function() {
    describe('GET /api/users', function() {
        it('respond with an array of users', function() {
            // ...
        });
    });
});

describe('app', function() {
    describe('GET /users', function() {
        it('respond with an array of users', function() {
            // ...
        });
    });
});