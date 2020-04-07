import React from "react";
import BotCard from "../components/BotCard";

class YourBotArmy extends React.Component {

  displayBots = () => {
    return this.props.bots.map((robot) => {
      return <BotCard key={robot.id} bot={robot} onDraftBot={this.props.onDraftBot} onExamineBot={this.props.onExamineBot}/>
    })
  }

  render(){
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">
            {this.displayBots()}
            Your Bot Army
          </div>
        </div>
      </div>
    );
  }
  
};

export default YourBotArmy;
