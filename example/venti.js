/**
 * Copyright (c) 2012 Roger Myrg http://devshop.me/
 * Released under the MIT license:
 * https://github.com/rgr-myrg/Venti/raw/master/MIT-LICENSE
 */
(function(a){a.Venti=typeof a.Venti==="object"?a.Venti:{}})(window);(function(a){a.Listener=function(a,d){var b=a;return{notify:function(a){a!==void 0?b.apply(d,a):b.apply(d)},remove:function(){b=function(){}},getCallback:function(){return b}}}})(Venti);(function(a){a.Event=function(){var c=[];return{add:function(d,b){typeof d==="function"&&c.push(new a.Listener(d,b))},remove:function(a){for(var b=c.length,e=0;e<b;e++){var f=c[e];f.getCallback()===a&&f.remove()}},notify:function(){for(var a=c.length,b=0;b<a;b++)c[b].notify(arguments)}}}})(Venti);
