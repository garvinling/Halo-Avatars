import React from 'react';
import ReactDOM from 'react-dom';




if(Meteor.isClient) {


	console.log('Welcome');

	Meteor.call('getWeeklyBounties','valued soldier',(err,res) => {
			
			console.log(res);

	});


	Meteor.startup(() => {
		ReactDOM.render(<HaloUI />,document.getElementById('render-target'));
	});
}