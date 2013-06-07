
(function(setExport){
    
    "use strict";
    
    setExport(function(obj){
            
        // Trigger manager
        var TriggerManager = function(callbacks){
            return new (function(){  
                
                var triggers = [];
                          
                // Setup trigger queueing
                this.queue = function(path) {
                    triggers.push(path);
                };
                
                // Firing all the triggers
                this.fire = function(obj) {
                    
                    // Expand triggers (ie. user.name => user)
                    var allTriggers = [];
                    for(var i=0; i<triggers.length; i++)
                    {
                        // Original trigger (ie. user.name)
                        var trigger = triggers[i];
                        
                        // Break it into (user, name)
                        var pieces = trigger.split('.');
                        for(var j=0; j<pieces.length; j++)
                        {
                            // recreate each length of the trigger
                            var subTrigger = pieces.slice(0, j+1).join('.');
                            
                            // if the trigger hasn't been added yet, add it
                            if(allTriggers.indexOf(subTrigger) == -1)
                                allTriggers.push(subTrigger);
                        }
                    }
                    
                    // Bail if no triggers
                    if(allTriggers.length == 0)
                        return;
                    
                    // Add the wildcard
                    allTriggers.push('*');
                    
                    // Trigger all callbacks for each path
                    for(var i=0; i<allTriggers.length; i++)
                    {
                        // Find callbacks for each trigger
                        var trigger = allTriggers[i];
                        for(var j=0; j<callbacks.length; j++)
                        {
                            // If the callback matches the trigger, fire
                            var callback = callbacks[j];
                            if(callback.path === trigger)
                            {
                                callback.callback();
                            }
                        }
                    }
                };
                
                
            })();
        };
                
        // helpful functions
        var myType = function(o){
            if (typeof o === 'undefined')
                return 'undefined';
            if (o === null)
                return 'null';
            if (Object.prototype.toString.call(o) === '[object Array]')
                return 'array';
            return typeof o;
        };
        
        var validate = function(o){
            var type = myType(o);
            
            // Only objects allowed
            if (type !== 'object')
                throw "syncer requires an object in the constructor. Your passed a "+type;
        };
        
        var isTypePrimitive = function(type) {
            return ['string', 'boolean', 'number'].indexOf(type) >= 0;
        };
        
        return new (function(){
            
            // Validate
            validate(obj);
            
            // Expose a reference
            this.obj = obj;
            
            // Initialize local variables
            var callbacks = [];
            var triggers;
            
            var update = function(path, oldO, newO){
                
                // Add and update values from the new object
                var newKeys = [];
                for(var key in newO)
                {
                    // Track new keys so we know which old ones to delete later
                    newKeys.push(key);
                    
                    // Get the values
                    var oldVal = oldO[key];
                    var newVal = newO[key];
                    var newPath = path ? (path+'.'+key) : key;
                    
                    // Get the types
                    var oldType = myType(oldVal);
                    var newType = myType(newVal);
                    
                    // What has changed?
                    var typesChanged = oldType != newType;
                    var valuesChanged = oldVal != newVal;
                    var changed = typesChanged || (valuesChanged && 'string,number,boolean'.indexOf(newType) >= 0);
                    
                    if(oldType === 'object' && newType === 'object')
                    {
                        // Both are objects, compare them
                        update(newPath, oldVal, newVal);
                    }
                    else if(changed)
                    {
                        // Save the new value
                        oldO[key] = newVal;
                        
                        // Queue a notification that this changed
                        triggers.queue(newPath, newVal);
                    }
                }
                
                // Delete objects from the old object
                for(var key in oldO)
                {
                    // Is this key missing from the new object?
                    if(newKeys.indexOf(key) === -1)
                    {
                        // Delete the old value
                        delete oldO[key];
                        
                        // Queue a notification that this was deleted
                        var newPath = path ? (path+'.'+key) : key;
                        triggers.queue(newPath);
                    }
                }
            };
            
            // Setup trigger registration
            this.on = function(path, callback) {
                callbacks.push({path: path, callback: callback});
            };
            
            // Allow the object to be updated
            this.update = function(newObj){
                
                // Validate the new data
                validate(newObj);
                
                // Restart triggers
                triggers = new TriggerManager(callbacks);
                
                // Start the update
                update('', obj, newObj);
                
                // Run the triggers
                triggers.fire(obj);
            };
            
        })();
    });

})(function(x){ module?(module.exports=x):(window.syncer=x)});

