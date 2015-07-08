import Ember from 'ember';

function sourceName(sourceId) {
 	var applicationController = this.get("controllers.application");
	var source = sourceId;//applicationController.getSourceObject(sourceId);
	if (source) {
		return source;//source.get("name");
	}
	else {
		return "Ingen källa är vald";
	}
}	

export {
  sourceName
};

export default Ember.Handlebars.makeBoundHelper(sourceName);
