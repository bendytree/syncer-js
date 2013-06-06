var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');
    

describe('boolean to', function(){
    
    var s;
    
    this.timeout(10);
    
    beforeEach(function(){
        s = syncer({smart:false});
    });
    
    it('same boolean does not trigger', function(){
        s.on('smart', function(){ throw 'should not trigger'; });
        s.update({smart:false});
    });
    
    it('different boolean triggers', function(done){
        s.on('smart', function(){ done(); });
        s.update({smart:true});
    });
    
    it('string triggers', function(done){
        s.on('smart', function(){ done(); });
        s.update({smart:'kinda'});
    });
    
    it('number triggers', function(done){
        s.on('smart', function(){ done(); });
        s.update({smart:11});
    });
    
    it('object triggers', function(done){
        s.on('smart', function(){ done(); });
        s.update({smart:{}});
    });
    
    it('array triggers', function(done){
        s.on('smart', function(){ done(); });
        s.update({smart:[]});
    });
    
    it('null triggers', function(done){
        s.on('smart', function(){ done(); });
        s.update({smart:null});
    });
    
    it('undefined triggers', function(done){
        s.on('smart', function(){ done(); });
        s.update({smart:undefined});
    });

    it('gone triggers', function(done){
        s.on('smart', function(){ done(); });
        s.update({});
    });
    
});
        