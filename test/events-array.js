
var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


describe('array to', function(){
    
    var s;
    
    this.timeout(10);
    
    beforeEach(function(){
        s = syncer({users:[]});
    });
    
    it('string triggers', function(done){
        s.on('users', function(){ done(); });
        s.update({users:'all'});
    });
    
    it('number triggers', function(done){
        s.on('users', function(){ done(); });
        s.update({users:12});
    });
    
    it('boolean triggers', function(done){
        s.on('users', function(){ done(); });
        s.update({users:true});
    });
    
    it('object triggers', function(done){
        s.on('users', function(){ done(); });
        s.update({users:{}});
    });
    
    it('null triggers', function(done){
        s.on('users', function(){ done(); });
        s.update({users:null});
    });
    
    it('similar array does not trigger', function(){
        s.on('users', function(){ throw 'should not trigger'; });
        s.update({users:[]});
    });
    
    it('gone triggers', function(done){
        s.on('users', function(){ done(); });
        s.update({});
    });
    
});
