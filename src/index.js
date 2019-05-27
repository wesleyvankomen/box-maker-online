import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Grid extends React.Component {
    render(props) {
        const width = this.props.settings.columns * 16

        var rowsArr = [];
        var boxClass = "";
        
		for (var i = 0; i < this.props.rows; i++) {
			for (var j = 0; j < this.props.cols; j++) {
				let boxId = i + "_" + j;

				boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
				rowsArr.push(
					<Cell
						boxClass={boxClass}
						key={boxId}
						boxId={boxId}
						row={i}
						col={j}
						selectBox={this.props.selectBox}
					/>
				);
			}
		}

		return (
			<div className="grid" style={{width: width}}>
				{rowsArr}
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
