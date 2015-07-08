import Ember from 'ember';

function statusName(statusId, statuses) {
	var status = statuses.findBy('idInt', parseInt(statusId));	
	if (status) {
		return status.get("nameSv");
	}
	else {
		return "missing status: " + statusId;
	}
}	

export {
  statusName
};

export default Ember.Handlebars.makeBoundHelper(statusName);
