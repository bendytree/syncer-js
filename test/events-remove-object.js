
var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


describe('remove object', function(){
    
    this.timeout(10);
    
    it('triggers properties', function(){
        var calledRoot = false;
        var calledUser = false;
        var calledUserName = false;
        var calledUserAge = false;
        
        var s = syncer({user:{name:'josh',age:30}});
        s.on('*', function(){ calledRoot = true; });
        s.on('user', function(){ calledUser = true; });
        s.on('user.name', function(){ calledUserName = true; });
        s.on('user.age', function(){ calledUserAge = true; });
        s.update({});
        
        calledRoot.should.equal(true, 'should call *');
        calledUser.should.equal(true, 'should call user');
        calledUserName.should.equal(true, 'should call user.name');
        calledUserAge.should.equal(true, 'should call user.age');
    });
    
    it('double deep triggers properties', function(){
        var calls = 0;
        
        var s = syncer({user:{cart:{items:2}}});
        s.on('*', function(){ calls++; }); //calls 4 times
        s.on('user', function(){ calls++; });
        s.on('user.cart', function(){ calls++; });
        s.on('user.cart.items', function(){ calls++; });
        s.update({});
        
        calls.should.equal(7);
    });
    
});
