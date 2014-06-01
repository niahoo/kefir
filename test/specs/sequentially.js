var Kefir = require('../../dist/kefir.js');
var helpers = require('../test-helpers');
var sinon = require('sinon');




describe("Kefir.sequentially()", function(){

  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    clock.restore();
  });

  it("ok", function(){

    var stream = Kefir.sequentially(30, [2, 4]);

    var result = helpers.getOutput(stream);

    expect(result.xs).toEqual([]);

    clock.tick(10);
    expect(result.xs).toEqual([]);

    clock.tick(21);
    expect(result.xs).toEqual([2]);

    clock.tick(30);
    expect(result.xs).toEqual([2, 4]);
    expect(result.ended).toEqual(true);

  });


});
