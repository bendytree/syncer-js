
(function(setExport){
    
    "use strict";
    
    setExport(function(obj){
            
        // Trigger manager
        var TriggerManager = function(callbacks){
            return new (function(){  
                
                var callbacks = [];
                          
                // Setup trigger registration
                this.on = function(path, callback) {
                    callbacks.push({path: path, callback: callback});
                };
                
                // Firing all the triggers
                this.fire = function(obj, triggers) {
                    
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
                                try
                                {
                                    callback.callback();
                                }
                                catch(ex)
                                {
                                    
                                }
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
            if (Object.prototype.toString.call(o) === '[object Date]')
                return 'date';
            return typeof o;
        };
        
        var validateRoot = function(o){
            var type = myType(o);
            
            // Only objects allowed
            if (type !== 'object')
                throw "Root must be an object. Your passed "+type;
        };
        
        var isTypePrimitive = function(type) {
            return ['string', 'boolean', 'number', 'date'].indexOf(type) >= 0;
        };
        
        var getChanges = function (oldVal, newVal)
        {
            // Get the types
            var oldType = myType(oldVal);
            var newType = myType(newVal);
            
            // What has changed?
            var changes = [];
            var typesChanged = oldType != newType;
            var valuesChanged = oldVal != newVal;
            var changed = typesChanged || (valuesChanged && 'string,number,boolean,date'.indexOf(newType) >= 0);
            
            if(oldType === 'object' || newType === 'object')
            {
                if(oldType !== 'object')
                {
                    //Need a change for each property in NEW, so compare against empty
                    oldVal = {};
                }
                
                if(newType !== 'object')
                {
                    //Need a change for each property in OLD, so compare against empty
                    newVal = {};
                }
            
                // Both are objects, compare them
                var c = getChanges_objects(oldVal, newVal);
                changes.push.apply(changes, c);
            }

            if(oldType === 'array' && newType === 'array')
            {
                changed = !areArraysSame(oldVal, newVal);
            }

            if(changed) 
            {
                // root changed
                changes.push('');
            }
            
            return changes;
        };
        
        var getChanges_objects = function (oldO, newO)
        {
            var changes = [];
            
            // Add and update values from the new object
            var newKeys = [];
            for(var key in newO)
            {
                // Track new keys so we know which old ones to delete later
                newKeys.push(key);
                
                // Get the values
                var oldVal = oldO[key];
                var newVal = newO[key];
                
                // Get the changes
                var keyChanges = getChanges(oldVal, newVal);
                
                // Save the changes with our current key
                for(var i=0; i<keyChanges.length; i++)
                {
                    var keyChange = keyChanges[i];
                    changes.push(keyChange ? (key+'.'+keyChange) : key);
                }
            }
            
            // Delete properties from the old object
            for(var key in oldO)
            {
                // Is this key missing from the new object?
                if(newKeys.indexOf(key) === -1)
                {
                    // Queue a notification that this was deleted
                    changes.push(key);
                    
                    // Fire changes for the deleted object
                    var removalChanges = getChanges(oldO[key], undefined);
                    for(var i=0; i<removalChanges.length; i++)
                    {
                        var removalChange = removalChanges[i];
                        changes.push(removalChange ? (key+'.'+removalChange) : key);
                    }
                }
            }
            
            return changes;
        };        
        
        var areArraysSame = function(a, b){
            if(a.length !== b.length)
                return false;
            
            for(var i=0; i<a.length; i++){
                var changes = getChanges(a[i], b[i]);
                if(changes > 0)
                    return false;
            }
            
            return true;
        };
        
        var copyProperties = function(obj, newObj){
            //delete all old props
            for(var key in obj){
                delete obj[key];
            }
            
            //copy new values onto old
            for(var key in newObj){
                obj[key] = newObj[key];
            }
        };
        
        return new (function(){
            
            // Validate (root must be an object)
            validateRoot(obj);
            
            // Expose a reference
            this.obj = obj;
            
            // Initialize local variables
            var triggerManager = new TriggerManager();
            
            // Setup trigger registration
            this.on = function(path, callback) {
                triggerManager.on(path, callback);
            };
            
            // Allow the object to be updated
            this.update = function(newObj){
                
                // Validate (root must be an object)
                validateRoot(newObj);
                
                // Get the changes
                var changes = getChanges(obj, newObj);
                
                // copy the properties to retain root reference
                copyProperties(obj, newObj);
                
                // Run the triggers
                triggerManager.fire(obj, changes);
            };
            
        })();
    });

})(function(x){ module?(module.exports=x):(window.syncer=x)});

