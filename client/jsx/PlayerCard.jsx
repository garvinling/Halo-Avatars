import React from 'react';



class PlayerCard extends React.Component { 

	constructor(props) {

		super(props);


	}


	render () {


		return (
			<div>
			<div className="spartan-stats">
				<h1><img src={this.props.spartanImage} width="75" />{this.props.gamertag} <img src={this.props.emblem} width="50"/></h1>
				<h4>Last Game Played</h4>
				<h3>Kills: {this.props.kills}</h3>
				<h3>Deaths: {this.props.deaths}</h3>
				<h3>Rank: {this.props.rank}</h3>
			</div>
			<div className="avatar-container">
							<img src="/masterchief.png" width="450"/>

			</div>
			</div>

		);

	}

}


PlayerCard.propTypes = {
	gamertag : React.PropTypes.string.isRequired,
	kills : React.PropTypes.number , 
	deaths : React.PropTypes.number , 
	rank   : React.PropTypes.number,
	emblem : React.PropTypes.string,
	spartanImage : React.PropTypes.string

}



this.PlayerCard = PlayerCard