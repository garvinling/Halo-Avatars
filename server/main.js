import { Meteor } from 'meteor/meteor';

import HaloAPI from 'haloapi';
import Future from 'fibers/future';

var h5 = new HaloAPI('6863d25d6ba74aa3a3b42fd879c572ee');



//Eventually migrate to db layer 
var weeklyChallenges = [

	{
		title : 'Get 50 Kills'
	},
	{
		title : 'Get 10 Medals'
	},
	{
		title : 'Get 25 Headshots on Deadlock'
	},
	{
		title : 'Teabag 400 People'
	},
	{
		title : 'Get 3 Buckle Up Medals'
	}

]




Meteor.methods({

	getLastPlayerMatch(gamerTag) {
		var fut = new Future();

		h5.stats.playerMatches(gamerTag) 
			.then((res) => {
				console.log('Returning data for : ' + gamerTag);
				fut.return(res.Results[0].Players);

			});

		return fut.wait();
	},


	getWeeklyChallenges() {


		//Eventually this will need to calculate and build the challenge obj before returning
		return weeklyChallenges;


	},


	getEmblem(gamerTag) {

		var fut = new Future();

		h5.profile.emblemImage({
		    player: gamerTag,
		    size: 95 // Default 256. Options 95, 128, 190, 256, 512.
		}).then((res) => {

			fut.return(res);

		});

		return fut.wait();
	},

	getSpartanImage(gamerTag) {

		var fut = new Future();

		h5.profile.spartanImage({
		    player: gamerTag,
		    size: 95, // Default 256. Options 95, 128, 190, 256, 512.
		    crop: "portrait" // Default "full", options "full", "portrait"
		}).then((res) => {

			fut.return(res);

		});

		return fut.wait();

	}


});





