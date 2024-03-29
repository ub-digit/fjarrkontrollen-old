import Ember from 'ember';

function trimString(passedString) {
    if (passedString) {
    	//alert(passedString + ':' + passedString.length);
    	if (passedString.length < 28) {
    		return passedString;
    	}
        else { 
     		return new Ember.Handlebars.SafeString(passedString.substring(0,25)+'...');
    	}
    }
    else {
    	return new Ember.Handlebars.SafeString('');
    }
}

export {
  trimString
};

export default Ember.Handlebars.makeBoundHelper(trimString);
