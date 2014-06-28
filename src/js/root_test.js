describe('root', function () {

  require('./root.js');

  it('should create window.app', function () {
    expect(window.app).toBeDefined();
  });

});
