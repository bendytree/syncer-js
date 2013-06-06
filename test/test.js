var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


describe('syncer', function(){
    
    this.timeout(10);
    
    describe('constructor', function(){
        
        it('accepts an object', function(){
            (function(){ syncer({}); }).should.not.throw();
        });
        
        it('does not accept no args', function(){
            (function(){ syncer(); }).should.throw();
        });
        
        it('does not accept a string', function(){
            (function(){ syncer('x'); }).should.throw();
        });
        
        it('does not accept a number', function(){
            (function(){ syncer(123); }).should.throw();
        });
        
        it('does not accept an array', function(){
            (function(){ syncer([]); }).should.throw();
        });
        
        it('does not accept undefined', function(){
            (function(){ syncer(undefined); }).should.throw();
        });
        
        it('does not accept null', function(){
            (function(){ syncer(null); }).should.throw();
        });
    
    });
    
    
    describe('object access', function(){
        
        it('exposes the object reference', function(){
            var obj = {};
            var s = syncer(obj);
            should.strictEqual(obj, s.obj);
        });
        
    });
    
    
    describe('update', function(){
        
        it('by calling update with new data', function(){
            var s = syncer({});
            s.update({name:'x'});
            s.obj.name.should.equal('x');
        });
        
        it('validates new data', function(){
            var s = syncer({});
            (function(){ s.update(); }).should.throw();
        });
        
        it('does not change root object reference', function(){
            var obj = {};
            var s = syncer(obj);
            s.update({name:'x'});
            should.strictEqual(obj, s.obj);
        });
        
        it('adds new properties', function(){
            var s = syncer({});
            s.update({name:'x'});
            s.obj.name.should.equal('x');
        });
        
        it('removes old properties', function(){
            var s = syncer({name:'x'});
            s.update({});
            should.not.exist(s.obj.name);
        });
        
        it('updates old properties', function(){
            var s = syncer({name:'x'});
            s.update({name:'y'});
            s.obj.name.should.equal('y');
        });
        
    });
    
    
    describe('events -', function(){
        
        
        describe('repetition', function(done){
            
            it('should call triggers once per update', function(){                
                var timesCalled = 0;
                var s = syncer({name:'x'});
                s.on('name', function(){ timesCalled += 1; });
                s.update({name:'y'});
                s.update({name:'z'});
                timesCalled.should.equal(2);
            });
            
        });
        
        
        describe('number to', function(){
            
            var s;
            
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
        
        
        describe('objects', function(){
        
            it('does not trigger if object values stayed the same', function(){
                var s = syncer({user:{}});
                s.on('user', function(){ throw 'should not trigger'; });
                s.update({user:{}});
            });
            
        });
        
        
    });
    
    
});


// 
// var s = syncer({ name: 'josh', age: 30, color: 'red' });
// 
// s.on('name', function(name){
//     alert('name changed to: '+name);
// });
// 
// s.on('color', function(color){
//     alert('color changed to: '+color);
// });
// 
// s.update({ name: 'jenny', age: 30 });
