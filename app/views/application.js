import Ember from 'ember';

export default Ember.View.extend({


	didInsertElement: function () {
		Ember.$('#myModal').on('shown.bs.modal', function () {
		  Ember.$('#barcode-input').focus();
		});;
		var that = this;

	   Ember.$("body").keydown(function(key) {
		if (key.keyCode === 113) {
			Ember.$('#myModal').modal('show');
		}
		if (key.keyCode === 27) {
			Ember.$('#myModal').modal('hide');
		}
	  });
	}
});
