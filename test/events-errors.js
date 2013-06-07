var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


describe('errors', function(){
    
    it('are handled', function(){
        var s = syncer({});
        s.on('name', function(){ throw 'should be handled'; });
        s.update({name:'bob'});
    });
    
});

