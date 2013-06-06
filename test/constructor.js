var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');

    
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

