const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('Function convertHandler.getNum()', function () {
		test('Whole number input', function (done) {
			let input = '55L'
			assert.equal(convertHandler.getNum(input), 55)
			done()
		})
		test('Decimal number input', function (done) {
			let input = '55.5L'
			assert.equal(convertHandler.getNum(input), 55.5)
			done()
		})
		test('Fractional number input', function (done) {
			let input = '55/5L'
			assert.equal(convertHandler.getNum(input), 55 / 5)
			done()
		})
		test('Fractional number input with decimal', function (done) {
			let input = '55/5.5L'
			assert.equal(convertHandler.getNum(input), 55 / 5.5)
			done()
		})
		test('Return an error on a double-fraction', function (done) {
			let input = '5/5/5L'
			assert.equal(convertHandler.getNum(input), undefined)
			done()
		})
		test('Non numerical input', function (done) {
			let input = 'L'
			assert.equal(convertHandler.getNum(input), 1)
			done()
		})
	});

	suite('Function convertHandler.getUnit()', function () {
		test('Read each valid input', function (done) {
			let input = [
				"gal",
				"L",
				"mi",
				"km",
				"lbs",
				"kg",
				"GAL",
				"l",
				"MI",
				"KM",
				"LBS",
				"KG",
			];
			let output = [
				"gal",
				"L",
				"mi",
				"km",
				"lbs",
				"kg",
				"gal",
				"L",
				"mi",
				"km",
				"lbs",
				"kg",
			];

			input.forEach((el, i) => {
				assert.equal(convertHandler.getUnit(el), output[i])
			});
			done();
		});

		test('Invalid unit input', function (done) {
			assert.equal(convertHandler.getUnit("55miles"), undefined);
			done();
		});
	});

	suite('Function convertHandler.getReturnUnit()', function () {
		test('Return the correct unit', function (done) {
			let input = [
				"kg",
				"l",
				"mi",
				"lbs",
				"gal",
				"km"
			]
			let output = [
				"lbs",
				"gal",
				"km",
				"kg",
				"L",
				"mi"
			]

			input.forEach((el, i) => {
				assert.equal(convertHandler.getReturnUnit(el), output[i]);
			});
			done();
		});
	});

	suite('Function convertHandler.spellOutUnit()', function() {
		test('Spell units correctly', function(done) {
			let input = [
				"kg",
				"l",
				"mi",
				"lbs",
				"gal",
				"km"
			];
			let output = [
				"kilograms",
				"liters",
				"miles",
				"pounds",
				"gallons",
				"kilometers"
			]

			input.forEach(function(el, i) {
				assert.equal(convertHandler.spellOutUnit(el), output[i]);
			})
			done();
		})
	})
});