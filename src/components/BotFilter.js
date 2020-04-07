import React, {Component} from "react";

class BotFilter extends Component {

    filterCall = (event) => {
        this.props.onFilter(event.target.value)
    }

    render() {
        return (
            <div>
                <h1 >BOT CLASS FILTER</h1>
                <label>
                    <strong>Bot class:</strong>
                    <select onChange={this.filterCall}>
                        <option value="All">All</option>
                        <option value="Assault">Assault</option>
                        <option value="Defender">Defender</option>
                        <option value="Support">Support</option>
                    </select>
                </label>
            </div>
        )
    }
}

export default BotFilter