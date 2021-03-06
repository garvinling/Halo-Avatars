/** THIRD-PARTY LIBRARIES GO HERE**/ 
import { Meteor } from 'meteor/meteor';
import HaloAPI from 'haloapi';
import Future from 'fibers/future';
import moment from 'moment';
import async from 'async';
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


/* 
	@param   : gamerTag 
	@returns : a collection of valid matches within the timeframe of Mon - Sun.   
	
	Week start : Monday 
	Week end   : Sunday 	
*/



var bountyFunctions = [getTenKills];			//Put Bounty Function Names in Here.  

function getValidMatches(gamerTag,callback) {

	var fut          = new Future();
	var validMatches = [];
	var weekStart    = moment.utc().startOf('week');
	var matchDate;

	h5.stats.playerMatches(gamerTag)
		.then(function(data){

			data.Results.forEach(function(match){

				matchDate = moment.utc(match.MatchCompletedDate.ISO8601Date);

				if(matchDate.isAfter(weekStart)){

					validMatches.push(match);

				} else if(matchDate.diff(weekStart) === 0) {

					validMatches.push(match);

				}
				else {

				}

		

			});
		fut.return(validMatches);

	});


	return fut.wait();
}


/** DECLARE BOUNTY FUNCTIONS HERE 

example: 
function bountyFuncOne(matches,callback) {

	callback(null,returnObj);
}
**/

function getTenKills(matches,callback) {

	var returnObj = {};

	callback(null,returnObj);
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


	getWeeklyChallenges() {


		//Eventually this will need to calculate and build the challenge obj before returning
		return weeklyChallenges;


	},


	getWeeklyBounties(gamerTag) {

		var fut     = new Future();
		var matches = getValidMatches(gamerTag);

		async.parallel({
		    one: function(callback){
		    	//bounty function from bounty array goes here
		    	//ex. bountyFunctions[0](matches,callback);
		    	getTenKills(matches,callback);
		    }

		},
		function(err, results) {
		    // results is now equals to: {one: 1, two: 2}
		    fut.return(results);
		});

		return fut.wait();
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





