
# Syncer

Syncer is a javascript library that sends you notifications when an object graph changes.

    var userSyncer = syncer({
	    name: 'Josh',
	    age: 30,
	    address: { zip: '37212' }
	});
	
	userSyncer.on('age', function(){
		alert("age changed");
	});
	
	userSyncer.on('address.zip', function(){
		alert("zip code changed");
	});
	
	// triggers both events because age & zip changed
	userSyncer.update({
	    name: 'Josh',
	    age: 31,
	    address: { zip: '73069' }
	});

Notice that you are re-setting the object graph and that triggers the events.  For example, changing the original object does not trigger events. That is not the goal of this library.

    var user = { name: 'josh' };
    var s = syncer(user);
    user.name = 'sunny'; //does not trigger

    s.update({name:'sunny'}); //does trigger

This becomes useful when you are receiving a stream of data from an api or a web socket and want to be notified of the changes only.

