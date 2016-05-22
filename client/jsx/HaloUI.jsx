import React from 'react';



class HaloUI extends React.Component{

	constructor(props){

		super(props);

		this.state = {
			currentSpartan : '',
			emblemImage : '',
			spartanImage : '',
			playerData : {},
			victories : '',
			expGained : '',
			weeklyChallenges : []

		}

		var SPARTAN = 'nonchalant roy';
		this.getLastMatchPlayed(SPARTAN);
		this.getLastTenResults(SPARTAN);
		this.getEmblemImage(SPARTAN);
		this.getSpartanImage(SPARTAN);
		this.getWeeklyChallenges()
		this.getWeeklyExp(SPARTAN);
	}


	getSpartanImage(gamerTag) {

		Meteor.call('getSpartanImage',gamerTag,(err,res) => {
			console.log(res);
			this.setState({

				spartanImage : res

			});
		});
	}


	getEmblemImage (gamerTag) {


		Meteor.call('getEmblem',gamerTag,(err,res) => {
			console.log(res);
			this.setState({

				emblemImage : res

			});
		});
	}



	getWeeklyChallenges () {

		Meteor.call('getWeeklyChallenges',(err,res) => {
			console.log(res);
			this.setState({

				weeklyChallenges : res

			});
		});

	}


	getLastMatchPlayed (gamerTag) {

		Meteor.call('getLastPlayerMatch',gamerTag,(err,res) => {
			console.log(res);
			this.setState({

				currentSpartan : res[0].Player.Gamertag,
				playerData     : res[0]

			});
		});
	}


	getLastTenResults (gamerTag) {

		Meteor.call('getLastTenResults',gamerTag,(err,res) => {
			console.log(res);
			this.setState({

				victories        : res

			});
		});
	}

	getWeeklyExp (gamerTag) {

		Meteor.call('getWeeklyExpGained',gamerTag,(err,res) => {
			console.log(res);
			this.setState({

				expGained        : res
			});
		});
	}



	render() {


		return (
			<div className="container">

			<PlayerCard gamertag={this.state.currentSpartan}
						kills={this.state.playerData.TotalKills}
						deaths={this.state.playerData.TotalDeaths}
						assists={this.state.playerData.TotalAssists}
						rank={this.state.playerData.Rank}
			            victories={this.state.victories}
			            expGained={this.state.expGained}
						emblem={this.state.emblemImage}
						spartanImage={this.state.spartanImage}
			/>
			<WeeklyChallenges challenges={this.state.weeklyChallenges}/>
			</div>
		);

	}


}


this.HaloUI = HaloUI