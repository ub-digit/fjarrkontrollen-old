import Ember from 'ember';

function userName(userId, users) {
	var user = users.findBy('idInt', parseInt(userId));
	if (user) {
		return user.get("xkonto");
	}
	else {
		return "missing user";
	}
}	

export {
  userName
};

export default Ember.Handlebars.makeBoundHelper(userName);
