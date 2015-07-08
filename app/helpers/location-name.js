import Ember from 'ember';

function locationName(locationId) {
	var location = locationId;//applicationController.getLocationObject(locationId);

	if (location) {
		return locationId;//location.get("nameSv");
	}
	else {
		return "missing location: " + locationId;
	}
}	

export {
  locationName
};

export default Ember.Handlebars.makeBoundHelper(locationName);
