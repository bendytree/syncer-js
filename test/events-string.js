var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');
    

describe('string to', function(){
    
    var s;
    
    this.timeout(10);
    
    beforeEach(function(){
        s = syncer({name:'bob'});
    });
    
    it('same string does not trigger', function(){
        s.on('name', function(){ throw 'should not trigger'; });
        s.update({name:'bob'});
    });
    
    it('different string triggers', function(done){
        s.on('name', function(){ done(); });
        s.update({name:'peter'});
    });
    
    it('number triggers', function(done){
        s.on('name', function(){ done(); });
        s.update({name:7});
    });
    
    it('boolean triggers', function(done){
        s.on('name', function(){ done(); });
        s.update({name:true});
    });
    
    it('object triggers', function(done){
        s.on('name', function(){ done(); });
        s.update({name:{}});
    });
    
    it('array triggers', function(done){
        s.on('name', function(){ done(); });
        s.update({name:[]});
    });
    
    it('null triggers', function(done){
        s.on('name', function(){ done(); });
        s.update({name:null});
    });
    
    it('undefined triggers', function(done){
        s.on('name', function(){ done(); });
        s.update({name:undefined});
    });

    it('gone triggers', function(done){
        s.on('name', function(){ done(); });
        s.update({});
    });
    
});
        