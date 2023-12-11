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
	});


	suite('Function convertHandler.convert(num, unit)', function() {
		// gal to l
		test('Gal to L', function(done) {
			let input = [7, "gal"];
			let output = 26.4979;
			assert.approximately(convertHandler.convert(input[0], input[1]),
			output, 0.1);
			done();
		});

		// l to gal
		test('L to Gal', function(done) {
			let input = [7, "l"];
			let output = 1.8492;
			assert.approximately(convertHandler.convert(input[0], input[1]),
			output, 0.1);
			done();
		});

		// mi to km
		test('Mi to Km', function(done) {
			let input = [7, "mi"];
			let output = 11.2654;
			assert.approximately(convertHandler.convert(input[0], input[1]),
			output, 0.1);
			done();
		});

		// km to mi
		test('Km to Mi', function(done) {
			let input = [7, "km"];
			let output = 4.3496;
			assert.approximately(convertHandler.convert(input[0], input[1]),
			output, 0.1);
			done();
		});

		// lbs to kg
		test('Lbs to Kg', function(done) {
			let input = [7, "lbs"];
			let output = 3.17515;
			assert.approximately(convertHandler.convert(input[0], input[1]),
			output, 0.1);
			done();
		});

		// kg to lbs
		test('Kg to Lbs', function(done) {
			let input = [7, "kg"];
			let output = 15.4324;
			assert.approximately(convertHandler.convert(input[0], input[1]),
			output, 0.1);
			done();
		})
	});
});