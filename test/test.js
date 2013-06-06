var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


describe('syncer', function(){
    
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
