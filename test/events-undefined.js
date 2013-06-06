var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


describe('undefined to', function(){
    
    var s;
    
    this.timeout(10);
    
    beforeEach(function(){
        s = syncer({x:undefined});
    });
    
    it('undefined does not trigger', function(){
        s.on('x', function(){ throw 'should not trigger'; });
        s.update({x:undefined});
    });
    
    it('string triggers', function(done){
        s.on('x', function(){ done(); });
        s.update({x:'battle toads'});
    });
    
    it('number triggers', function(done){
        s.on('x', function(){ done(); });
        s.update({x:11});
    });
    
    it('object triggers', function(done){
        s.on('x', function(){ done(); });
        s.update({x:{}});
    });
    
    it('array triggers', function(done){
        s.on('x', function(){ done(); });
        s.update({x:[]});
    });
    
    it('null triggers', function(done){
        s.on('x', function(){ done(); });
        s.update({x:null});
    });
    
    it('gone triggers', function(done){
        s.on('x', function(){ done(); });
        s.update({});
    });
    
});
