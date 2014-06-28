describe('penceToCoins', function () {

  var p2c = require('../js/penceToCoins.js');

  it('should convert 200 to [200]', function () {
    expect(p2c(200)).toEqual([200]);
  });

  it('should convert 100 to [100]', function () {
    expect(p2c(100)).toEqual([100]);
  });

  it('should convert 50 to [50]', function () {
    expect(p2c(50)).toEqual([50]);
  });

  it('should convert 20 to [20]', function () {
    expect(p2c(20)).toEqual([20]);
  });

  it('should convert 10 to [10]', function () {
    expect(p2c(10)).toEqual([10]);
  });

  it('should convert 5 to [5]', function () {
    expect(p2c(5)).toEqual([5]);
  });

  it('should convert 2 to [2]', function () {
    expect(p2c(2)).toEqual([2]);
  });

  it('should convert 1 to [1]', function () {
    expect(p2c(1)).toEqual([1]);
  });

  it('should convert 350 to [200, 100, 50]', function () {
    expect(p2c(350)).toEqual([200, 100, 50]);
  });

  it('should return correct array', function () {
    expect(p2c(573)).toEqual([200, 200, 100, 50, 20, 2, 1]);
  });

});
