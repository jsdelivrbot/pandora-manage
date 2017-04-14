/*global define*/
'use strict';

define(['jquery', 'lodash', 'settings', 'webadmin-ui'], function ($, _, adminAppSettings, core) {

	if(adminAppSettings.debug) {
		console.log("Loading App...");
	}

	core.bootstrap();

});
