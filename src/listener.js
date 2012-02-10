(function(Venti){
	Venti.Listener = function(fn, ob){
		var	callback = fn,
			parent   = ob;
		return {
			notify : function(){
				if(arguments[0] !== undefined){
					callback.apply(parent, arguments[0]);
				}else{
					callback.apply(parent);
				}
			},
			remove : function(){
				callback = function(){};
			},
			getCallback : function(){
				return callback;
			}
		};
	};
})(Venti);

