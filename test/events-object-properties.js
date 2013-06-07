
var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


describe('sub objects', function(){
    
    this.timeout(10);
    
    it('adding property triggers property', function(done){
        var s = syncer({user:{}});
        s.on('user.name', function(){ done(); });
        s.update({user:{name:'josh'}});
    });
    
    it('removing property triggers property', function(done){
        var s = syncer({user:{name:'josh'}});
        s.on('user.name', function(){ done(); });
        s.update({user:{}});
    });
    
    it('changing property triggers property', function(done){
        var s = syncer({user:{name:'josh'}});
        s.on('user.name', function(){ done(); });
        s.update({user:{name:'sunny'}});
    });
    
    it('changing property triggers parent', function(done){
        var s = syncer({user:{name:'josh'}});
        s.on('user', function(){ done(); });
        s.update({user:{name:'sunny'}});
    });
    
    it('unchanged double sub object does not trigger', function(){
        var s = syncer({user:{address:{zip:'37212'}}});
        s.on('*', function(){ throw 'should not be called'; });
        s.update({user:{address:{zip:'37212'}}});
    });
    
    it('changed double sub object fires all paths', function(){
        var calls = 0;
        var s = syncer({user:{address:{zip:'37212'}}});
        s.on('*', function(){ calls += 1; });
        s.on('user', function(){ calls += 1; });
        s.on('user.address', function(){ calls += 1; });
        s.on('user.address.zip', function(){ calls += 1; });
        s.update({user:{address:{zip:'90212'}}});
        calls.should.equal(4);
    });
    
    it('two changes on double sub object fires all paths once', function(){
        var calls = 0;
        var s = syncer({user:{address:{zip:'37212'}}});
        s.on('*', function(){ calls += 1; });
        s.on('user', function(){ calls += 1; });
        s.on('user.address', function(){ calls += 1; });
        s.on('user.address.zip', function(){ calls += 1; });
        s.on('user.address.city', function(){ calls += 1; });
        s.update({user:{address:{zip:'90212', city:'Awesomeville'}}});
        calls.should.equal(5);
    });
    
});
