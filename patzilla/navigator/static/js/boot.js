// -*- coding: utf-8 -*-
// (c) 2013-2017 Andreas Motl, Elmyra UG


/**
 * --------------------
 * Bootstrap foundation
 * --------------------
 */

console.info('Load foundation');

// Patches to make the old Backbone Marionette 1.1.0 work with Webpack
Backbone.$   = window.jQuery;
Marionette.$ = window.jQuery;


// Application core
console.info('Load application');
require('patzilla.app.main');
require('patzilla.app.ui');


// Application components
console.info('Load application components');

// Semi-essential application components
require('patzilla.navigator.components.document');
// TODO: Currently, quite some core machinery relies on the querybuilder. Improve that!
require('patzilla.navigator.components.querybuilder');

// Keywords, comments and rating
require('patzilla.navigator.components.storage');
require('patzilla.navigator.components.project');
require('patzilla.navigator.components.keywords');
require('patzilla.navigator.components.basket');
require('patzilla.navigator.components.comment');

// Optional application components
require('patzilla.navigator.components.analytics');
require('patzilla.navigator.components.crawler');
require('patzilla.navigator.components.export');
require('patzilla.navigator.components.hotkeys');
require('patzilla.navigator.components.permalink');
require('patzilla.navigator.components.reading');
require('patzilla.navigator.components.viewport');
require('patzilla.navigator.components.waypoints');


// Bootstrap the application after registering all components
opsChooserApp.addInitializer(function(options) {
    this.listenToOnce(this, 'application:init', function() {
        this.trigger('application:boot');
    });
});
