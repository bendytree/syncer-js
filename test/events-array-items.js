
var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


describe('array items', function(){
    
    this.timeout(10);
    
    it('same blank does not trigger', function(){
        var calls = 0;
        var s = syncer({users:[]});
        s.on('*', function(){ calls += 1; });
        s.update({users:[]});
        calls.should.equal(0);
    });
    
    it('same 1 does not trigger', function(){
        var calls = 0;
        var s = syncer({users:[{name:'josh'}]});
        s.on('*', function(){ calls += 1; });
        s.update({users:[{name:'josh'}]});
        calls.should.equal(0);
    });
    
    it('adding from 0 triggers', function(){
        var calls = 0;
        var s = syncer({users:[]});
        s.on('users', function(){ calls += 1; });
        s.update({users:[{name:'josh'}]});
        calls.should.equal(1);
    });
    
    it('adding from 1 triggers', function(){
        var calls = 0;
        var s = syncer({users:[{name:'josh'}]});
        s.on('users', function(){ calls += 1; });
        s.update({users:[{name:'josh'},{name:'sunny'}]});
        calls.should.equal(1);
    });
    
    it('removing from 1 triggers', function(){
        var calls = 0;
        var s = syncer({users:[{name:'josh'}]});
        s.on('users', function(){ calls += 1; });
        s.update({users:[]});
        calls.should.equal(1);
    });
    
    it('removing from 2 triggers', function(){
        var calls = 0;
        var s = syncer({users:[{name:'josh'},{name:'sunny'}]});
        s.on('users', function(){ calls += 1; });
        s.update({users:[{name:'josh'}]});
        calls.should.equal(1);
    });
    
});
