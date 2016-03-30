/* tiny-event-js v1.0.0 Wed Mar 30 2016 12:29:50 GMT-0400 (EDT) */(function(w){w.UsrLib=w.UsrLib||{};})(window);(function(UsrLib){var FUNCTION_APPLY = function(func, parent, args) {
	(function() {
		func.apply(parent, arguments);
	})( args );
},

EMPTY_FUNCTION = function() {},

IS_FUNCTION = function( fn ) {
	return typeof fn === "function";
},

IS_OBJECT = function( obj ) {
	return typeof obj === "object";
};

var onRegister = "onRegister", 
	onRemove = "onRemove", 
	onSuccess = "onSuccess", 
	onError = "onError", 
	runOnce = "_runOnce", 
	count = "length";

/**
 * This class can be sub-classed to represent a <code>TinyEvent</code> 
 * object for triggering state changes and transmitting data.
 * <p>
 * TinyEvent retains the scope of the listener object by applying it 
 * to the function along with data propagated with the event transaction.
 * <p>
 * This is a powerful feature as it enables listener callbacks to execute 
 * within the scope of the listener to trigger state changes and transmit 
 * data in an Object-oriented pattern.
 * <p>
 * A TinyEvent object can have one or more listeners. A listener is an 
 * object which implements any or all of the following handlers:
 * onRegister() - Invoked when the listener is successfully registered.
 * onSuccess() - Invoked when notifySuccess() is called.
 * onError() - Invoked when notifyError() is called.
 * onRemove() - Invoked when the listener is successfully removed.
 * <p>
 * Invoking <code>TinyEvent</code>'s <code>notifySuccess()</code>
 * method causes all of its listeners to be notified with a call
 * to their onSuccess() method.
 * <p>
 * Similarly, invoking notifyError() results in a call
 * to a listener's onError() method.
 *
 * @author  Roger Paul
 * @see     java.util.Observable
 */
UsrLib.TinyEvent = function() {
	var listeners = [],

	add = function(listener) {
		if (!IS_OBJECT(listener)) {
			throw("Listener not a valid Object");
		}

		listeners.push(listener);

		if (IS_FUNCTION(listener[onRegister])) {
			listener[onRegister]();
		}

		if (!IS_FUNCTION(listener[onSuccess])) {
			listener[onSuccess] = EMPTY_FUNCTION;
		}

		if (!IS_FUNCTION(listener[onError])) {
			listener[onError] = EMPTY_FUNCTION;
		}
	},

	remove = function(listener) {
		for (var x = 0, size = listeners[count]; x < size; x++) {
			if (listeners[x] === listener) {
				listeners.splice(x, 1);

				if (IS_FUNCTION(listener[onRemove])) {
					listener[onRemove]();
				}

				break;
			}
		}
	},

	notify = function(eventName, eventData) {
		var runOnceListeners = [];

		for (var x = 0, size = listeners[count]; x < size; x++) {
			var listener = listeners[x];

			FUNCTION_APPLY(listener[eventName], listener, eventData);

			if (listener[runOnce]) {
				runOnceListeners.push(listener);
			}
		}

		// Remove single execution listeners
		for (x = 0, size = runOnceListeners[count]; x < size; x++) {
			remove(runOnceListeners[x]);
		}
	};

	return {
		addListener: function(listener) {
			listener[runOnce] = false;
			add(listener);

			return listeners[count];
		},

		addListenerOnce: function(listener) {
			// Set to true for single execution
			listener[runOnce] = true;
			add(listener);

			return listeners[count];
		},

		removeListener: function(listener) {
			remove(listener);
			return listeners[count];
		},

		notifySuccess: function(eventData) {
			notify(onSuccess, eventData);
		},

		notifyError: function(eventData) {
			notify(onError, eventData);
		},

		getCount: function() {
			return listeners[count];
		}
	};
};
UsrLib.version='1.0.0';})(UsrLib);