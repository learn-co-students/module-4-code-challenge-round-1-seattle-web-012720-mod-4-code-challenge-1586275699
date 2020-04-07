import React from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'
import BotSpecs from '../components/BotSpecs'
import BotFilter from '../components/BotFilter'

const botsAPI = 'https://bot-battler-api.herokuapp.com/api/v1/bots'

class BotsPage extends React.Component {

  state = {
    allBots: [],
    currentBots: [],
    enlistedBots: [],
    examineState: 1,
    examineRobot: [],
    collectionMessage: "Collection of All Bots"
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
        allBots: data,
        currentBots: data
      })
    })
  }

  draftBot = (robot) => {
    if (this.state.enlistedBots.find(enlistedBot => enlistedBot.id === robot.id)) {
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

  examineBot = (robot) => {
    this.setState((previousState) => {
      return {
        examineState: previousState.examineState * -1,
        examineRobot: robot
      }
    })
  }

  filterBots = (value) => {
    if (value === "All") {
      this.setState({
        currentBots: this.state.allBots,
        collectionMessage: "Collection of All Bots"
      })
    } else {
      this.setState((previousState) => {
        let filteredBots = previousState.allBots.filter((robot) => {
          return robot.bot_class === value
        })
        return {
          currentBots: filteredBots,
          collectionMessage: `Collection of ${value} Bots`
        }
      })
    }
  }

  render() {
    return (
      <div>
        <BotFilter onFilter={this.filterBots}/>
        <YourBotArmy 
          bots={this.state.enlistedBots}
          onDraftBot={this.draftBot}
          onExamineBot={this.draftBot}
        />
        {
          this.state.examineState === 1 
          ? <BotCollection 
              bots={this.state.currentBots} 
              onExamineBot={this.examineBot} 
              onDraftBot={this.draftBot} 
              message={this.state.collectionMessage}
          />
          : <BotSpecs 
              bot={this.state.examineRobot} 
              onExamineBot={this.examineBot} 
              onDraftBot={this.draftBot}
          />
        }
      </div>
    );
  }

}

export default BotsPage;
