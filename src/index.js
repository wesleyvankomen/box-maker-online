import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Grid extends React.Component {
    render(props) {
        const width = this.props.settings.columns * 16

        return (
            <div>
                <div className="grid" style={{width: width}} />
            </div>
        );
    }
}

class Cell extends React.Component {
    render(props) {
        return (
            <div style={{width: this.props.width, backgroundcolor: this.props.color}} onClick={this.props.whenClicked}>
            </div>
        )
    }
}

class Main extends React.Component {
    constructor(props){
        super(props);
        this.playing = true;
        this.victory = false;
        this.settings = this.props.settings;
        this.playerOne = this.props.playerOne;
        this.playerTwo = this.props.playerTwo;

        this.state = {
            round: 1,
            gameGrid: Array(this.rows).fill().map(() => Array(this.columns).fill(false))
        }
    }

    render() {
        return(
            <div>
                <h1>Lines and Boxes</h1>
                <h2>Round {this.state.round}</h2>
                <Grid settings={this.props.settings}/>
            </div>
        )
    }
}

ReactDOM.render(<Main settings={{ rows : 12, columns : 12 }} playerOne={{ score : 0, color: "red" }} playerTwo={{ score : 0, color: "blue" }} />, document.getElementById('root'))
