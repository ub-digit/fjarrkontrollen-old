import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],
	firstLoad: true, 
	showOk: true, 
	extraFilterVisible: false, 
	latestOrderViewed: null,

	zeroOrdersFound: function() {
		if (this.get("model.length") === 0) {
			return true;
		}
	}.property('model.@each'),

	/* setup for filter params to server */
	filterToServer: {
		search_term: '',
		currentLocation: 1,
		status_group: 1,
		mediaType: 0,
		user: null,
		sortfield: 'order_number',
		sortdir: 'DESC',
		delivery_source: null,
		is_archived: null,
		to_be_invoiced: null,
		page: 1
	},
	currentPage: 1, 

	user: {
		active:false,
	},
	queryReady: '',

	query: '', 

	currentArchivedFilter: false, 

	currentToBeInvoicedFilter: null, 


	timeout: null,


	currentPageChanged: function() {
		this.set("filterToServer.page", this.get("currentPage"));
		this.transitionToRoute("fjarr-in.index");
	}.observes('currentPage'),


	currentStatusChanged: function() {
		if (dataLayer) {
			dataLayer.push({'event': 'filterType', 'eventLabel':this.get("currentStatus")});
		}

	}.observes('currentStatus'),

	queryChanged: function() {
		var that = this;
		  if (this.timeout) {  
		    clearTimeout(this.timeout);
		  }
		  this.timeout = setTimeout(function() {
		     that.set("queryReady", that.get("query"));
		  }, 500);
	}.observes('query'),

	sortCols: {
		ordernumber: Ember.Object.create({id:1, sortfield: "order_number", active: true, sortDir: 'DESC'}),
		customer: Ember.Object.create({id:2, sortfield: "name", active: false, sortDir: 'ASC'}),
		type: Ember.Object.create({id:3,sortfield: 'order_type_id' ,active: false, sortDir: 'ASC'}),
		title: Ember.Object.create({id:4, sortfield: 'title', active: false, sortDir: 'ASC'}),
		status: Ember.Object.create({id:5, active: false, sortfield: 'status_id', sortDir: 'ASC'})
	},



	triggerFilter : function() {
		this.set("filterToServer.mediaType", this.get('currentOrderType'));

		this.set("filterToServer.currentLocation",this.get('currentLocation'));
		
		if (this.currentStatus === '0') {
			this.set("filterToServer.status_group", "");
		}
		else {
			this.set("filterToServer.status_group", this.get('currentStatusGroup'));
		}

		if (this.get("query")) {
			this.set("filterToServer.search_term", this.get("query"));
		}
		else {
			this.set("filterToServer.search_term", '');
		}

		if (this.get("currentLocationSource")) {
			this.set("filterToServer.delivery_source", this.get("currentLocationSource"));
		}
		else {
			this.set("filterToServer.delivery_source", null);
		}


		this.set("filterToServer.is_archived", this.get("currentArchivedFilter"));

		if (this.get("currentToBeInvoicedFilter")) {
    		this.set("filterToServer.to_be_invoiced", this.get("currentToBeInvoicedFilter"));
		}
		else {
			this.set("filterToServer.to_be_invoiced", null);
		}


		if (this.get("user.active") === true) {
			if (this.get("session.content.secure.userid")) {
				this.set("filterToServer.user", this.get("session.content.secure.userid"));
			}	
		}
		else {
			this.set("filterToServer.user", null);
		}
		this.set("filterToServer.page", 1);
		
		this.convertFilterVars();

		this.transitionToRoute("fjarr-in.index");
	//	console.log("search_term: " + this.filterToServer.search_term + " currentLocation: " + this.filterToServer.currentLocation + " mediatypes: " + this.filterToServer.mediaType + " user: " + this.filterToServer.user + "status_group: " + this.filterToServer.status_group + " sortOrder: " + this.sortOrder);
	}.observes('sortCols.@each.active', 'sortCols.@each.sortDir', 'folder.@each.active','user.active','queryReady', 'currentLocation', 'currentOrderType', 'currentStatusGroup', 'sortOrder', 'currentLocationSource', 'currentArchivedFilter', 'currentToBeInvoicedFilter'),
	

	convertFilterVars: function() {
		// convert a zero of status id to null for server to not trigger any filter on this
		if (this.get("filterToServer.status_group") === "0") {
			this.set("filterToServer.status_group", null);
		}

	},


	turnOnLoading: function(id) {
		Ember.$("#" + id).addClass("loading");
	},

	turnOffLoading: function(id) {
		Ember.$("#" + id).removeClass("loading");
	},

	actions: {
		toogleExtraFilter: function() {
			if (this.get("extraFilterVisible")) {
				this.set("extraFilterVisible", false);
			}
			else {
				this.set("extraFilterVisible", true);
			}			
		},
		resetFilter: function() {
			this.set("currentLocation", this.controllerFor('application').get("defaultLocation"));
			this.set("currentStatusGroup", this.controllerFor('application').get("defaultStatusGroup"));
			this.set("user.active", false);
			this.set("currentArchivedFilter", false);
			this.set("currentToBeInvoicedFilter", null);
			this.set("currentLocationSource", null);
			this.set("query", '');
			this.set("currentOrderType", null);


		},
		clearSearch: function() {
			this.set("query", '');
		},
		removeOwner: function(orderNumber) {
			this.turnOnLoading(orderNumber);
			var self = this;
			this.store.find("order", orderNumber).then(function(item) {
				item.set("userId", null);
				var onError = function(error) {
					console.log(error);
				};
				var onSuccess = function() {
					self.triggerFilter();
				//	self.transitionToRoute("fjarr-in.list");
					//self.set("controllers.application.message", "Handläggaren har tagits bort från ordern med nummer " + orderNumber);
					self.turnOffLoading(orderNumber);
				};
				item.save().then(onSuccess, onError);
			});
		},

		sortMe: function(sortObject) {
			if (sortObject.active) {
				if (sortObject.sortDir === 'ASC') {
					sortObject.set('sortDir', 'DESC');
					this.set('filterToServer.sortdir', 'DESC');
				}
				else {
					sortObject.set("sortDir", 'ASC');
					this.set('filterToServer.sortdir', 'ASC');
				}
			}
			else {
				// reset all 
				this.set("sortCols.ordernumber.active", false);
				this.set("sortCols.customer.active", false);
				this.set("sortCols.type.active", false);
				this.set("sortCols.title.active", false);
				this.set("sortCols.status.active", false);

				sortObject.set("active", true);
				this.set('filterToServer.sortfield', sortObject.get("sortfield"));
				sortObject.set("sortDir", 'ASC');
				this.set('filterToServer.sortdir', 'ASC');
			}

			this.triggerFilter();
		}, 


		switchOwner: function(orderNumber, newUserId) {
			this.turnOnLoading(orderNumber);
			var self = this;
			this.store.find("order", orderNumber).then(function(item) {
				item.set("userId", newUserId);

				var onError = function(error) {
					console.log(error);
				};
				var onSuccess = function(/*item*/) {
					self.turnOffLoading(orderNumber);
					self.triggerFilter();
			//		self.set("controllers.application.message", "Ordern med nummer " + orderNumber + " har bytt Handläggare till " + userId);
					//self.transitionToRoute("fjarr-in.list");
				};

				item.save().then(onSuccess, onError);
				
			});
		}
	}
});
