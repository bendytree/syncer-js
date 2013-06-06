var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');

    
describe('object access', function(){
    
    it('exposes the object reference', function(){
        var obj = {};
        var s = syncer(obj);
        should.strictEqual(obj, s.obj);
    });
    
});
