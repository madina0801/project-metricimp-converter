const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
	suite('Function convertHandler.getNum', function() {
		test('Whole number input', function(done) {
			let input = '55L'
			assert.equal(convertHandler.getNum(input), 55)
			done()
		})
		test('Decimal number input', function(done) {
			let input = '55.5L'
			assert.equal(convertHandler.getNum(input), 55.5)
			done()
		})
		test('Fractional number input', function(done) {
			let input = '55/5L'
			assert.equal(convertHandler.getNum(input), 55 / 5)
			done()
		})
		test('Fractional number input with decimal', function(done) {
			let input = '55/5.5L'
			assert.equal(convertHandler.getNum(input), 55 / 5.5)
			done()
		})
		test('Return an error on a double-fraction', function(done) {
			let input = '5/5/5L'
			assert.equal(convertHandler.getNum(input), undefined)
			done()
		})
		test('Non numerical input', function(done) {
			let input = 'L'
			assert.equal(convertHandler.getNum(input), 1)
			done()
		})
	})
});