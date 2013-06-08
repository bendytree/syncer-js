
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

Notice that you are updating the root object graph and that triggers the events.  For example, changing the original object does not trigger events. That is not the goal of this library.

    var user = { name: 'josh' };
    var s = syncer(user);
    user.name = 'sunny'; //does not trigger

    s.update({name:'sunny'}); //does trigger

This becomes useful when you are receiving a stream of data from an api or a web socket and want to be notified of the changes only.

You can also register for the wildcard event which triggers any time any change happens.
    
    var s = syncer({});

    s.on("*", function(){
	    alert('something changed');
	});

Last off, syncer exposes the object and never changes the root reference. So if you get a handle on the object from elsewhere in the code, you always have a reference to the latest version:

    var s = syncer({name:'josh'});

    alert(s.obj.name); // 'josh'

    var ref = s.obj;

    syncer.update({name:'sunny'});

    alert(ref.name); // 'sunny'
	
Tweet at me @BendyTree if you have a question.