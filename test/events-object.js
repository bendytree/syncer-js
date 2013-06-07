
var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


describe('objects to', function(){
    
    var s;
    
    this.timeout(10);
    
    beforeEach(function(){
        s = syncer({user:{}});
    });
    
    it('string triggers', function(done){
        s.on('user', function(){ done(); });
        s.update({user:'k'});
    });
    
    it('number triggers', function(done){
        s.on('user', function(){ done(); });
        s.update({user:12});
    });
    
    it('boolean triggers', function(done){
        s.on('user', function(){ done(); });
        s.update({user:true});
    });
    
    it('array triggers', function(done){
        s.on('user', function(){ done(); });
        s.update({user:[]});
    });
    
    it('null triggers', function(done){
        s.on('user', function(){ done(); });
        s.update({user:null});
    });
    
    it('similar object does not trigger', function(){
        s.on('user', function(){ throw 'should not trigger'; });
        s.update({user:{}});
    });
    
    it('gone triggers', function(done){
        s.on('user', function(){ done(); });
        s.update({});
    });
    
});
