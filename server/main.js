/** THIRD-PARTY LIBRARIES GO HERE**/ 
import { Meteor } from 'meteor/meteor';
import HaloAPI from 'haloapi';
import Future from 'fibers/future';
/** ============================ **/




var h5 = new HaloAPI('6863d25d6ba74aa3a3b42fd879c572ee');
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

];


/** 
	PRIVATE FUNCTIONS GO HERE 
	
	Any functions that won't be directly called by the client should be defined here.  
	
		Example: 

			function checkChallengeCompletion(challengeID) {
		


			}

**/

function getThisWeeksMatchIds (gamerTag){
	var fut = new Future();
	var matchIds = [];
	h5.stats.playerMatches(gamerTag)
		.then((res) => {
			// for now, use last 10 games until logic for getting games since Sunday is complete
			for(i = 0; i < 10; i++) {
				//console.log("MatchID: " + res.Results[i].Id.MatchId);
				matchIds.push(res.Results[i].Id.MatchId);
			}
			fut.return(matchIds);
		});

	return fut.wait();
}




/** 
	PUBLIC FUNCTIONS GO HERE 

	Whenever you need to retrieve some data from the API or the database, you need to add it to the Meteor methods object.  
	You just need to add a comma after the closing bracket of the last function like so: 

			Meteor.methods({
					
				function1() {
	
				},
				function2() {
	
				},
				yourNewFunction(teamMember){
	
				}

			});

	On the client side you will call your new function like so:

	Meteor.call('yourNewFunction',teamMember)

	As you can see, the function name is passed as a string to the Meteor.call() method.
	If you have function variables, append them after the function name with a comma.
	If you have no variables to pass, just passing the function name is fine.  ex: Meteor.call('yourNewFunction');
	

	🔥🔥🔥 Returning Data and Callbacks 🔥🔥🔥

	Here is the client-side code to read the response. 


	Meteor.call('yourNewFunction',teamMember,(err,res) => {
		
		//Process your data here inside the callback function. 
	

	});
	
**/



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

	getLastTenResults(gamerTag) {
		// counts number of victories
		var fut = new Future();
		var victories = 0;

		h5.stats.playerMatches(gamerTag)
			.then((res) => {
				// for now, use last 10 games until logic for getting games since Sunday is complete
				for(i = 0; i < 10; i++) {
					if (res.Results[i].Players[0].Result == 3) {
						victories++;
					}
				}
				fut.return(victories);

			});

		return fut.wait();
	},

	getWeeklyExpGained(gamerTag) {
		// adds up exp gained
		var fut = new Future();
		var totalExpGained = 0;
		var thisWeeksMatchIds = [];
		// for now, use last 10 games until logic for getting games since Sunday is complete
		thisWeeksMatchIds = getThisWeeksMatchIds(gamerTag);
		for (x = 0; x < thisWeeksMatchIds.length; x++){
			h5.stats.arenaMatchById(thisWeeksMatchIds[x])
				.then((res) => {
					expThisMatch = res.PlayerStats[0].XpInfo.TotalXP - res.PlayerStats[0].XpInfo.PrevTotalXP;
					fut.return(expThisMatch);
				});
				abc = fut.wait();

				totalExpGained += abc;
			console.log("expThisMatch = " + abc);
		}
		return totalExpGained;

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





