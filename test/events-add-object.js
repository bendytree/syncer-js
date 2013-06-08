
var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


describe('add object', function(){
    
    this.timeout(10);
    
    it('triggers properties', function(){
        var calls = 0;
        var s = syncer({});
        s.on('*', function(){ calls += 1; });
        s.on('user', function(){ calls += 1; });
        s.on('user.name', function(){ calls += 1; });
        s.on('user.age', function(){ calls += 1; });
        s.update({user:{name:'josh',age:30}});
        calls.should.equal(4);
    });
    
});
