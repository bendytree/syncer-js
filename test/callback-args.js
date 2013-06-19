var assert = require('assert');
var should = require('should');
var syncer = require('../syncer');


describe('callback arguments', function(){
    
    this.timeout(10);
    
    describe('path', function(){
    
        it('the path is given in the event argument', function(done){
            var s = syncer({});
            s.on('x', function(e){ 
                e.path.should.equal('x');
                done();
            });
            s.update({x:1});
        });
    
        it('the path is given on wildcards', function(done){
            var count = 0;
            var s = syncer({});
            s.on('*', function(e){
                if(e.path == 'x') count += 1;
                if(e.path == 'x.y') count += 2;
                if(e.path == '*') count += 3;
                if(count >= 6)
                    done();
            });
            s.update({x:{y:1}});
        });
        
    });
    
});
