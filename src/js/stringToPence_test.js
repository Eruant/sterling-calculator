describe('stringToPence', function () {

  var s2p = require('./stringToPence.js');

  it('should return the correct number', function () {
    expect(s2p('4')).toEqual(4);
  });

  it('should return the correct number', function () {
    expect(s2p('85')).toEqual(85);
  });

  it('should return the correct number', function () {
    expect(s2p('197p')).toEqual(197);
  });

  it('should return the correct number', function () {
    expect(s2p('2p')).toEqual(2);
  });

  it('should return the correct number', function () {
    expect(s2p('1.87')).toEqual(187);
  });

  it('should return the correct number', function () {
    expect(s2p('£1.23p')).toEqual(123);
  });

  it('should return the correct number', function () {
    expect(s2p('£2')).toEqual(200);
  });

  it('should return the correct number', function () {
    expect(s2p('£10')).toEqual(1000);
  });

  it('should return the correct number', function () {
    expect(s2p('£1.87p')).toEqual(187);
  });

  it('should return the correct number', function () {
    expect(s2p('£1p')).toEqual(100);
  });

  it('should return the correct number', function () {
    expect(s2p('£1.p')).toEqual(100);
  });

  it('should return the correct number', function () {
    expect(s2p('001.41p')).toEqual(141);
  });

  it('should return the correct number', function () {
    expect(s2p('4.325')).toEqual(433);
  });

  it('should return the correct number', function () {
    expect(s2p('£1.257422457p')).toEqual(126);
  });

  it('should return the correct number', function () {
    expect(s2p('')).toEqual(0);
  });

  it('should return the correct number', function () {
    expect(s2p('1x')).toEqual(0);
  });

  it('should return the correct number', function () {
    expect(s2p('£1x.0p')).toEqual(0);
  });

  it('should return the correct number', function () {
    expect(s2p('£p')).toEqual(0);
  });

});
