/*global define*/
'use strict';

define([], function () {

	function sessionStorageFactory() {

	    return {
	    	get: function(key){
	    		return sessionStorage.getItem(key);
	    	},
	    	set: function(key, val) {
	    		return sessionStorage.setItem(key, val);
	    	},
	    	unset: function(key) {
	    		return sessionStorage.removeItem(key);
	    	}
	    }
	}

	return {'sessionStorageService': [sessionStorageFactory]};
});
