import React from "react";
import BotCard from "../components/BotCard";

class BotCollection extends React.Component {

	displayBots = () => {
	  return this.props.bots.map((robot) => {
		  return <BotCard
					  key={robot.id}
					  bot={robot}
					  onDraftBot={this.props.onDraftBot}
					  onExamineBot={this.props.onExamineBot}
				  />
	  })
  }

  render(){
  	return (
  	  <div className="ui four column grid">
    		<div className="row">
    		  {this.displayBots()}
    		  {this.props.message}
    		</div>
  	  </div>
  	);
  }

};

export default BotCollection;
