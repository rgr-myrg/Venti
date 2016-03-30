describe( "UsrLib.TinyEvent", function() {

	it( "TinyEvent should be a Constructor Function", function() {
		expect( typeof UsrLib.TinyEvent ).toBe( typeof function(){} );
	});

	var event = new UsrLib.TinyEvent();

	it( "TinyEvent Constructor should return a valid Object", function() {
		expect( typeof event ).toBe( typeof {} );
		expect( typeof event.addListener ).toBe( typeof function(){} );
	});

	var mock_listener = {
		onRegister: function() {},
		onRemove: function() {},
		onSuccess: function(data) {
		},
		onError: function() {}
	};

	it( "TinyEvent.addListener should properly register a listener", function() {
		spyOn( mock_listener, "onRegister" ).and.callThrough();

		event.addListener( mock_listener );

		expect( mock_listener.onRegister ).toHaveBeenCalled();
		expect( event.getCount() ).toEqual( 1 );
	});

	it( "TinyEvent.notifySuccess should dispatch data to the listener", function() {
		spyOn( mock_listener, "onSuccess" ).and.callThrough();

		var testData = "data point";

		event.notifySuccess( testData );

		expect( mock_listener.onSuccess ).toHaveBeenCalledWith(testData);
	});

	it( "TinyEvent.notifyError should dispatch error data to the listener", function() {
		spyOn( mock_listener, "onError" ).and.callThrough();

		var testData = "error message";

		event.notifyError( testData );

		expect( mock_listener.onError ).toHaveBeenCalledWith(testData);
	});

	it( "TinyEvent.removeListener should successfully remove the listener", function() {
		spyOn( mock_listener, "onRemove" ).and.callThrough();

		event.removeListener( mock_listener );

		expect( mock_listener.onRemove ).toHaveBeenCalled();
		expect( event.getCount() ).toEqual( 0 );
	});

	it( "TinyEvent.addListenerOnce should properly register for single execution listener", function() {
		spyOn( mock_listener, "onRegister" ).and.callThrough();
		spyOn( mock_listener, "onSuccess" ).and.callThrough();
		spyOn( mock_listener, "onRemove" ).and.callThrough();

		event.addListenerOnce( mock_listener );
		event.notifySuccess();

		expect( mock_listener.onRegister ).toHaveBeenCalled();
		expect( mock_listener.onSuccess ).toHaveBeenCalled();
		expect( mock_listener.onRemove ).toHaveBeenCalled();
		expect( event.getCount() ).toEqual( 0 );
	});

});
