var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');
    
describe('events - repetition', function(done){
    
    this.timeout(10);
    
    it('should call triggers once per update', function(){                
        var timesCalled = 0;
        var s = syncer({name:'x'});
        s.on('name', function(){ timesCalled += 1; });
        s.update({name:'y'});
        s.update({name:'z'});
        timesCalled.should.equal(2);
    });
    
});
