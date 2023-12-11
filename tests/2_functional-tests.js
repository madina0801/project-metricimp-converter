const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
	suite('Routing tests', function() {
		// valid input
		test('Convert 10L (valid input)', function(done) {
			chai.request(server).get('/api/convert').query({input: "10L"})
			.end(function(err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.body.initNum, 10);
				assert.equal(res.body.initUnit, "L");
				assert.approximately(res.body.returnNum, 2.64172, 0.1);
				assert.equal(res.body.returnUnit, "gal");
				done();
			})
		});

		// invalid unit
		test('Convert 32g (invalid unit)', function(done) {
			chai.request(server).get('/api/convert').query({input: "32g"})
			.end(function(err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.body.initUnit, undefined);
				done();
			})
		});

		// invalid number
		test('Convert 3/7.2/4 kg (invalid number)', function(done) {
			chai.request(server).get('/api/convert').query({input: "3/7.2/4kg"})
			.end(function(err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.body.initNum, undefined);
				done();
			})
		})

		// invalid number and unit
		test('Convert 3/7.2/4kilomegagram(invalid number and input)', function(done) {
			chai.request(server).get('/api/convert').query({input: "3/7.2/4kilomegagram"})
			.end(function(err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.body.initNum, undefined);
				assert.equal(res.body.initUnit, undefined);
				done();
			})
		});

		// no number
		test('Convert kg(no number)', function(done) {
			chai.request(server).get('/api/convert').query({input: "kg"})
			.end(function(err, res) {
				assert.equal(res.status, 200);
				assert.equal(res.body.initNum, 1);
				assert.equal(res.body.initUnit, "kg");
				assert.approximately(res.body.returnNum, 2.20462, 0.1);
				assert.equal(res.body.returnUnit, "lbs");
				done();
			})
		})
	})
});