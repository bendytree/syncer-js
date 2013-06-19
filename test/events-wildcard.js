var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');
    

describe('wildcard events', function(){
    
    this.timeout(10);
    
    it('any event fires the wildcard', function(){
        var count = 0;
        var s = syncer({});
        s.on('*', function(){ count += 1; });
        s.update({x:1});
        count.should.equal(2);
    });
    
    it('multiple events only fire wildcard once per event', function(){
        var count = 0;
        var s = syncer({});
        s.on('*', function(){ count += 1; });
        s.update({x:1, y:2});
        count.should.equal(3);
    });
    
});
