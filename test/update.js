var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


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
    
    it('adds new sub objects', function(){
        var s = syncer({});
        s.update({user:{name:'josh'}});
        s.obj.user.name.should.equal('josh');
    });
    
    it('removes old sub objects', function(){
        var s = syncer({user:{name:'josh'}});
        s.update({});
        (typeof s.obj.user).should.equal('undefined');
    });
    
});