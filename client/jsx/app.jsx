import React from 'react';
import ReactDOM from 'react-dom';




if(Meteor.isClient) {


	console.log('Welcome');

	Meteor.startup(() => {
		ReactDOM.render(<HaloUI />,document.getElementById('render-target'));
	});
}