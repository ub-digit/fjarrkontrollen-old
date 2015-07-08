import Ember from 'ember';

function orderName(orderTypeId, ordertypes) {
	var ordertype = ordertypes.findBy('idInt', parseInt(orderTypeId));
	if (ordertype) {
		return ordertype.get("nameSv");
	}
	else {
		return "missing status: " + orderTypeId;
	}
}	

export {
  orderName
};

export default Ember.Handlebars.makeBoundHelper(orderName);
