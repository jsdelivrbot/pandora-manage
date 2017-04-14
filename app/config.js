/*global define*/

'use strict';

require.config({

	baseUrl: "/",

	paths: {
		'angular': 'repository.bower/angular/angular',
		'angular-resource': 'repository.bower/angular-resource/angular-resource',
		'angular-sanitize': 'repository.bower/angular-sanitize/angular-sanitize',
		'angular-cookies': 'repository.local/angular-cookies/angular-cookies',
		'angular-animate': 'repository.bower/angular-animate/angular-animate',
		'angular-touch': 'repository.bower/angular-touch/angular-touch',
		'angular-ui-router': 'repository.bower/angular-ui-router/release/angular-ui-router',
		'angular-loading-bar': 'repository.bower/angular-loading-bar/build/loading-bar',
		'angular-ui-bootstrap': 'repository.bower/angular-bootstrap/ui-bootstrap-tpls',
		'angular-ui-utils': 'repository.bower/angular-ui-utils/ui-utils',
		'angular-slider': 'repository.bower/angular-slider/slider',
		'ng-slider': 'repository.bower/ng-slider/dist/ng-slider.min',
		'angularjs-slider': 'repository.bower/angularjs-slider/dist/rzslider',
		'angular-chartjs': 'repository.bower/tc-angular-chartjs/dist/tc-angular-chartjs',
		'angular-aside': 'repository.bower/angular-aside/dist/js/angular-aside',
		'angular-idle': 'repository.bower/ng-idle/angular-idle',
		'angular-busy': 'repository.bower/angular-busy/dist/angular-busy',
		'checklist-model': 'repository.bower/checklist-model/checklist-model',
		"moment": 'repository.bower/moment/moment',
		"async": 'repository.bower/async/lib/async',
		"lodash": "repository.bower/lodash/lodash",
		"jquery": 'repository.bower/jquery/dist/jquery',
		"chartjs": 'repository.bower/Chart.js/Chart',
		"icheck": 'repository.bower/icheck/icheck',
		'domready': 'repository.bower/requirejs-domready/domReady',
		'requirejs-i18n': 'repository.bower/requirejs-i18n/i18n',
		'angular-translate': 'repository.bower/angular-translate/angular-translate',
		'angular-i18n': 'repository.bower/angular-i18n/angular-i18n',
		"text": 'repository.bower/requirejs-text/text',
		"q": 'repository.bower/q/q',
		'angular-file-upload': 'repository.bower/angular-file-upload/angular-file-upload',
		'ng-image-cropper': 'repository.local/ng-image-cropper/dist/angular-image-cropper',
		'ez-plus': 'repository.bower/ez-plus/src/jquery.ez-plus',
		'ng-ez-plus': 'repository.bower/angular-ez-plus/js/angular-ezplus',
		'venturocket-angular-slider': 'repository.bower/venturocket-angular-slider/build/angular-slider'
	},

	bundles: {},

	shim: {
		angular: {
			deps: ["jquery"],
			exports: 'angular',
			init: function attachjQueryToAngular($) {
			}
		},
		'angular-resource': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ngResource'};
			}
		},
		'angular-sanitize': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ngSanitize'};
			}
		},
		'angular-cookies': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ngCookies'};
			}
		},
		'angular-animate': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ngAnimate'};
			}
		},
		'angular-touch': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ngTouch'};
			}
		},
		'angular-ui-router': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ui.router'};
			}
		},
		'angular-loading-bar': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'chieffancypants.loadingBar'};
			}
		},
		'angular-ui-bootstrap': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ui.bootstrap'};
			}
		},
		'angular-ui-utils': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ui.utils'};
			}
		},
		'ng-slider': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ngSlider'};
			}
		},
		'angular-slider': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ui.slider'};
			}
		},

		'angular-chartjs': {
			deps: ['angular', 'chartjs'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'tc.chartjs'};
			}
		},
		'angular-aside': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ngAside'};
			}
		},
		'angular-idle': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ngIdle'};
			}
		},
		'angular-busy': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'cgBusy'};
			}
		},
		'checklist-model': {
			deps: ['angular'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'checklist-model'};
			}
		},
		'icheck': {
			deps: ['jquery'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'icheck' };
			}
		},
		'ng-ez-plus': {
			deps: ['angular', 'jquery', 'ez-plus'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'ez-plus' };
			}
		},
		'venturocket-angular-slider': {
			deps: ['angular', 'jquery', 'angular-touch'],
			exports: undefined,
			init: function angularModuleInfo() {
				return { moduleId: 'vr.directives.slider' };
			}
		}
	},

	scriptType: "text/javascript",

	waitSeconds: 7,

	map: {
		'*': { 'test': 'noconflict!test', 'confey' : 'settings'}
	},

	enforceDefine: false,

	config: {
		'ga': {
			GoogleAnalyticsObject: 'gax'
		}
	}

});

define("config", function(){});

require(["main"]);
