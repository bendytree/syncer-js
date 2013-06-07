var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');
    

describe('wildcard events', function(){
    
    this.timeout(10);
    
    it('any event fires the wildcard', function(done){
        var s = syncer({});
        s.on('*', function(){ done(); });
        s.update({x:1});
    });
    
    it('multiple events only fire wildcard once', function(done){
        var s = syncer({});
        s.on('*', function(){ done(); });
        s.update({x:1, y:2});
    });
    
});
