var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');
    

describe('null to', function(){
    
    var s;
    
    this.timeout(10);
    
    beforeEach(function(){
        s = syncer({x:null});
    });
    
    it('null does not trigger', function(){
        s.on('x', function(){ throw 'should not trigger'; });
        s.update({x:null});
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
    
    it('undefined triggers', function(done){
        s.on('x', function(){ done(); });
        s.update({x:undefined});
    });

    it('gone triggers', function(done){
        s.on('x', function(){ done(); });
        s.update({});
    });
    
});
