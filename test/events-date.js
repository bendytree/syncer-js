var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');
    

describe('date to', function(){
    
    var date = new Date();
    var s;
    
    this.timeout(10);
    
    beforeEach(function(){
        s = syncer({updated:date});
    });
    
    it('same date does not trigger', function(){
        s.on('updated', function(){ throw 'should not trigger'; });
        s.update({updated:date});
    });
    
    it('different date triggers', function(done){
        s.on('updated', function(){ done(); });
        s.update({updated:new Date()});
    });
    
    it('number triggers', function(done){
        s.on('updated', function(){ done(); });
        s.update({updated:7});
    });
    
    it('boolean triggers', function(done){
        s.on('updated', function(){ done(); });
        s.update({updated:true});
    });
    
    it('string triggers', function(done){
        s.on('updated', function(){ done(); });
        s.update({updated:'today'});
    });
    
    it('object triggers', function(done){
        s.on('updated', function(){ done(); });
        s.update({updated:{}});
    });
    
    it('array triggers', function(done){
        s.on('updated', function(){ done(); });
        s.update({updated:[]});
    });
    
    it('null triggers', function(done){
        s.on('updated', function(){ done(); });
        s.update({updated:null});
    });
    
    it('undefined triggers', function(done){
        s.on('updated', function(){ done(); });
        s.update({updated:undefined});
    });

    it('gone triggers', function(done){
        s.on('updated', function(){ done(); });
        s.update({});
    });
    
});

