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

		notifySucess: function(eventData) {
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
