import React from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'

const botsAPI = 'https://bot-battler-api.herokuapp.com/api/v1/bots'

class BotsPage extends React.Component {

  state = {
    allBots: [],
    enlistedBots: []
  }

  componentDidMount() {
    this.fetchBots()
  }

  fetchBots = () => {
    fetch(botsAPI)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({
        allBots: data
      })
    })
  }

  draftBot = (robot) => {
    console.log("drafted!")
    console.log(robot)
    if (this.state.enlistedBots.find(enlistedBot => enlistedBot.id === robot.id)) {
      console.log("already there!")
      this.setState((previousState) => {
        let newArmy = previousState.enlistedBots.filter((enlistedBot => enlistedBot.id !== robot.id))
        return {
          enlistedBots: newArmy
        }
      })
    } else {
      this.setState((previousState) => {
        return {
          enlistedBots: [...previousState.enlistedBots, robot]
        }
      })
    }
  }

  render() {
    return (
      <div>
        <BotCollection bots={this.state.allBots} onDraftBot={this.draftBot}/>
        <YourBotArmy bots={this.state.enlistedBots} onDraftBot={this.draftBot}/>
      </div>
    );
  }

}

export default BotsPage;
