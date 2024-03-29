import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		if (Ember.$("body")) {
			Ember.$("body").addClass("loading");
		}
	},
	model: function() {
		var temp = this.controllerFor("fjarr-in.list").get("firstLoad");
		if (temp === true) {
			this.controllerFor("fjarr-in.list").set("firstLoad", false);
			return null;
		}
		else {
			var filter = null;
			if (this.controllerFor("fjarr-in.list")) {
				filter = this.controllerFor("fjarr-in.list").get("filterToServer");
			}
			var result =  this.store.find('order', filter);	
			return result;
			
		}
	},
	afterModel: function() {
		if (Ember.$("body")) {
			Ember.$("body").removeClass("loading");
		}
	},

	setupController: function(controller, model) {
		controller.set("model", model);
		//var meta = controller.get("model.meta");
		if (typeof controller.get("currentLocation") === 'undefined') {
			controller.set("currentLocation", this.controllerFor('application').get("defaultLocation").toString());
		}
		if (!controller.get("currentStatusGroup")) {
			controller.set("currentStatusGroup", this.controllerFor('application').get("defaultStatusGroup"));
		}

		if (!controller.get("currentLocationSource")) {
			controller.set("currentLocationSource", null);
		}
		if (typeof controller.get("currentOrderType") === 'undefined') {
			controller.set("currentOrderType", 0);
		}
	}
});
