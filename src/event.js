(function(Venti){
	Venti.Event = function(){
		var listeners = [];
		return {
			add : function(fn, ob){
				if(typeof fn === 'function'){
					listeners.push(new Venti.Listener(fn, ob));
				}
			},
			remove : function(fn){
				var size = listeners.length;
				for(var x=0; x < size; x++){
					var listener = listeners[x];
					if(listener.getCallback() === fn){
						listener.remove();
					}
				}
			},
			notify : function(){
				var size = listeners.length;
				for(var x=0; x < size; x++){
					var listener = listeners[x];
					listener.notify(arguments);
				}
			}
		};
	};
})(Venti);

