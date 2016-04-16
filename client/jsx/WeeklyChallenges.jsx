
import React from 'react';


class WeeklyChallenges extends React.Component {

	constructor(props) {

		super(props);


	}



	render() {


		var challenges        = this.props.challenges;
		var challengesList    = challenges.map((challenges,index) => {
		
			return <h4 className="challenge-item" key={index}>{challenges.title}</h4>
		
		});

		return (
			<div className="challenges-container">
				<h1>Weekly Challenges</h1>
				{challengesList}
			</div>
		);
	}

}


WeeklyChallenges.propTypes = {

	challenges : React.PropTypes.array

};



this.WeeklyChallenges = WeeklyChallenges