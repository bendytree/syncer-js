
(function(setExport){
    
    "use strict";
    
    setExport(function(obj){
        return new (function(){
            
            // Expose a reference
            this.obj = obj;
            
            // Validation
            var validateRootObject = function(o){
                // Only objects allowed
                if (typeof o !== 'object')
                    throw "syncer requires an object in the constructor. Your passed a "+(typeof o);
                
                // Object must be truthy
                if (!o)
                    throw "syncer requires an object in the constructor. Your passed null.";
            
                // No arrays allowed
                if (Object.prototype.toString.call(o) === '[object Array]')
                    throw "syncer requires an object in the constructor. Your passed an array.";
            };
            validateRootObject(obj);
            
            // Initialize local variables
            var callbacks = [];
            var queuedTriggers = [];
            
            // // Setup trigger queueing
            // var queueTrigger = function(key, val)
            // {
            //     for(var i=0; i<callbacks.length; i++)
            //     {
            //         if(callbacks[i].key === key)
            //         {
            //             pendingTriggers.push({
            //                 callback: callbacks[i].callback,
            //                 args: [val]
            //             });
            //         }
            //     }
            // };
            
            // this.on = function(key, callback){
            //     callbacks.push({key: key, callback: callback});
            // };
            
            
            this.update = function(newObj){
                
                // Validate the new data
                validateRootObject(newObj);
                
                
                // queuedTriggers = [];
                
                // Add and update values from the new object
                var newKeys = [];
                for(var key in newObj)
                {
                    // Track new keys so we know which old ones to delete later
                    newKeys.push(key);
                    
                    // Has the value changed?
                    var newVal = newObj[key];
                    if(obj[key] != newVal)
                    {
                        // Save the new value
                        obj[key] = newVal;
                        //queueTrigger(key, newVal);
                    }
                }
                
                // Delete objects from the old object
                for(var key in obj)
                {
                    // Is this key missing from the new object?
                    if(newKeys.indexOf(key) === -1)
                    {
                        // Delete the old value
                        delete obj[key];
                        
                        //queueTrigger(key, undefined);
                    }
                }
                
                // for(var i=0; i<queuedTriggers.length; i++){
                //     var trigger = queuedTriggers[i];
                //     trigger.callback.apply(obj, trigger.args);
                // }
            };
        })();
    });

})(function(x){ module?(module.exports=x):(window.syncer=x)});

