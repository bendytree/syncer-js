var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');
    

describe('number to', function(){
    
    var s;
    
    this.timeout(10);
    
    beforeEach(function(){
        s = syncer({age:30});
    });
    
    it('same number does not trigger', function(){
        s.on('age', function(){ throw 'should not trigger'; });
        s.update({age:30});
    });
    
    it('different number triggers', function(done){
        s.on('age', function(){ done(); });
        s.update({age:'30'});
    });
    
    it('string triggers', function(done){
        s.on('age', function(){ done(); });
        s.update({age:'30'});
    });
    
    it('boolean triggers', function(done){
        s.on('age', function(){ done(); });
        s.update({age:true});
    });
    
    it('date triggers', function(done){
        s.on('age', function(){ done(); });
        s.update({age:new Date()});
    });
    
    it('object triggers', function(done){
        s.on('age', function(){ done(); });
        s.update({age:{}});
    });
    
    it('array triggers', function(done){
        s.on('age', function(){ done(); });
        s.update({age:[]});
    });
    
    it('null triggers', function(done){
        s.on('age', function(){ done(); });
        s.update({age:null});
    });
    
    it('undefined triggers', function(done){
        s.on('age', function(){ done(); });
        s.update({age:undefined});
    });

    it('gone triggers', function(done){
        s.on('age', function(){ done(); });
        s.update({});
    });
    
});
        