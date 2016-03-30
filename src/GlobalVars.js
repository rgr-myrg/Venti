var FUNCTION_APPLY = function(func, parent, args) {
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
