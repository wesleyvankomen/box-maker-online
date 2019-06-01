import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const cellSize = 100;
const lineWidth = 25;

class Grid extends React.Component { 
    render(props) {

        console.log(this.props.gridState);

        var columns = this.props.settings.columns;

        var width = parseInt(columns / 2) * cellSize + parseInt(columns / 2 + 1) * lineWidth + columns

        var rowsArr = [];
        var cellWidth, cellHeight, cellSelectMethod
        
		for (var i = 0; i < this.props.settings.rows; i++) {
			for (var j = 0; j < this.props.settings.columns; j++) {

                cellSelectMethod = this.props.selectBox;

                // corner box (i % 2 == 0) && (j % 2 == 0)
                if ((i % 2 === 0) && (j % 2 === 0)){
                    cellWidth = lineWidth;
                    cellHeight = lineWidth;
                    cellSelectMethod = () => {};
                }
                // line (i % 2 == 1) || (J % 2 == 1)
                else if (i % 2 === 1 && j % 2 === 0){
                    cellWidth = lineWidth;
                    cellHeight = cellSize;
                }
                else if (i % 2 === 0 && j % 2 === 1){
                    cellWidth = cellSize;
                    cellHeight = lineWidth;
                }
                // point box (i % 2 == 1) && ( j % 2 == 1)
                else if ((i % 2 === 1) && ( j % 2 === 1)){
                    cellWidth = cellSize;
                    cellHeight = cellSize;
                    cellSelectMethod = () => {};
                }

                rowsArr.push(
                    <Cell
                        key={i + "_" + j}
                        row={i}
                        column={j}
                        width={cellWidth}
                        height={cellHeight}
                        color={this.props.gridState[i][j]}
                        selectBox={cellSelectMethod}
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
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.column, "green");
	}
    
    render(props) {
        return (
            <div 
                className="cell" 
                style={{backgroundColor: this.props.color, width: this.props.width, height: this.props.height}}
                onClick={this.selectBox} />
        )
    }
}

class Main extends React.Component {
    constructor(props){
        super(props);
        this.playing = true;
        this.victory = false;
        this.state = {
            round: 1,
            gridState: Array(this.props.settings.rows).fill().map(() => Array(this.props.settings.columns).fill("white"))
        }
        console.log(this.state.gridState);
    }

    render() {
        return(
            <div style={{width: "100%"}}>
                <h1>Lines and Boxes</h1>
                <h2>Round {this.state.round}</h2>
                <Grid settings={this.props.settings} selectBox={this.selectBox} gridState = {this.state.gridState}/>
                
            </div>
        )
    }

    selectBox = (row, col, color) => {
        console.log(row + "," + col, " selected " + color)
		let gridCopy = arrayClone(this.state.gridState);
		gridCopy[row][col] = color;
		this.setState({
			gridState: gridCopy
		});
    }
}

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main settings={{ rows : 7, columns : 7 }} playerOne={{ score : 0, color: "red" }} playerTwo={{ score : 0, color: "blue" }} />, document.getElementById('root'))
