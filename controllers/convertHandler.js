function ConvertHandler() {

  this.getNum = function (input) {
    // get a whole number
    let match = input.match(/[.\d\/]+/g);
    // check if the input is not a number
    if(!match) {
        result = "1"; 
    } else if (match) {
        result = match[0]
    }
    // fractional number input
    let nums = result.split('/');
    if(nums.length > 2) {
      return undefined;
    }
    if(!nums) return undefined;
    let num1 = nums[0];
    let num2 = nums[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);
    if(isNaN(num1) || isNaN(num2)) {
      return undefined;
    }

    return result;
  };

  this.getUnit = function (input) {
    let result = input.match(/[a-zA-Z]+/)[0];
    result = result.toLowerCase();

    switch (result) {
      case 'km':
        return 'km'
      case 'gal':
        return 'gal'
      case 'lbs':
        return 'lbs'
      case 'mi':
        return 'mi'
      case 'l':
        return 'L';
      case 'kg':
        return 'kg'
      default:
        return undefined;
    }
  };

  this.getReturnUnit = function (initUnit) {
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case 'kg':
        return 'lbs'
      case 'l':
        return 'gal'
      case 'mi':
        return 'km'
      case 'lbs':
        return 'kg'
      case 'gal':
        return 'L'
      case 'km':
        return 'mi'
      default:
        return undefined
    }
  };

  this.spellOutUnit = function (unit) {
    unit = unit.toLowerCase();
    switch (unit) {
      case 'km':
        return 'kilometers'
      case 'gal':
        return 'gallons'
      case 'lbs':
        return 'pounds'
      case 'mi':
        return 'miles'
      case 'l':
        return 'liters'
      case 'kg':
        return 'kilograms'
      default:
        return undefined
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;
    
    switch(unit){
      case 'km':
        result = initNum / miToKm
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'kg':
        result = initNum / lbsToKg
        break
      case 'lbs':
        result = initNum * lbsToKg
        break
      case 'l':
        result = initNum / galToL
        break
      case 'gal':
        result = initNum * galToL
        break
      default:
        result = undefined
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };

}

module.exports = ConvertHandler;