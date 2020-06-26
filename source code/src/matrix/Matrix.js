import React from "react";
import "./Matrix.css";
import Box from "../box/Box";

import { Button } from "@material-ui/core";

class Matrix extends React.Component {
  state = {
    color: [],
    rows: 6,
    cols: 6,
  };

  generateGrid() {
    var template = [];
    for (let i = 0; i < this.state.rows; i++) {
      let division = [];
      for (let j = 0; j < this.state.cols; j++)
        division.push(
          <Box
            key={i + "-" + j}
            x={i}
            y={j}
            color={this.state.color[i] && this.state.color[i][j]}
            type=""
            onCellClick={this.onCellClick}
          ></Box>
        );
      template.push(<div key={"row" + i}>{division}</div>);
    }
    return template;
  }

  componentDidMount() {
    this.setColors();
  }

  setColors = (evt, rows = this.state.rows, cols = this.state.cols) => {
    var colors = [];
    for (let i = 0; i < rows; i++) {
      let color = [];
      for (let j = 0; j < cols; j++) {
        color.push("");
      }
      colors.push(color);
    }

    this.setState({
      color: colors,
    });

    this.entry = "";
    this.exit = "";
  };

  initializeVisitsAndParents() {
    var visited = [];
    for (let i = 0; i < this.state.rows; i++) {
      let visitedCol = [];
      for (let j = 0; j < this.state.rows; j++) {
        visitedCol.push(false);
      }
      visited.push(visitedCol);
    }

    var parents = [];
    for (let i = 0; i < this.state.rows; i++) {
      let parent = [];
      for (let j = 0; j < this.state.rows; j++) {
        parent.push(-1);
      }
      parents.push(parent);
    }

    return [visited, parents];
  }

  bfs = () => {
    if (!this.entry || !this.exit) return;
    this.bfsSearchInProgress = true;
    var [visited, parents] = this.initializeVisitsAndParents();
    var queue = [];

    var entryX = +this.entry?.split("-")[0];
    var entryY = +this.entry?.split("-")[1];

    queue.push(entryX + "-" + entryY);
    visited[entryX][entryY] = true;

    var exitX = +this.exit?.split("-")[0];
    var exitY = +this.exit?.split("-")[1];

    var stop = false;
    var delay = 0;
    while (queue.length && !stop) {
      var length = queue.length;

      var loopQueue = [];
      for (let k = 0; k < length; k++) {
        let value = queue.shift();

        let i = +value.split("-")[0];
        let j = +value.split("-")[1];

        if (i === exitX && j === exitY) {
          stop = true;
          break;
        }

        if (i + 1 < this.state.rows && !visited[i + 1][j] && this.state.color[i + 1][j] !== "#c00") {
          queue.push(i + 1 + "-" + j);
          parents[i + 1][j] = i + "-" + j;
          visited[i + 1][j] = true;
        }
        if (i - 1 > -1 && !visited[i - 1][j] && this.state.color[i - 1][j] !== "#c00") {
          queue.push(i - 1 + "-" + j);
          parents[i - 1][j] = i + "-" + j;
          visited[i - 1][j] = true;
        }
        if (j + 1 < this.state.cols && !visited[i][j + 1] && this.state.color[i][j + 1] !== "#c00") {
          queue.push(i + "-" + (j + 1));
          parents[i][j + 1] = i + "-" + j;
          visited[i][j + 1] = true;
        }
        if (j - 1 > -1 && !visited[i][j - 1] && this.state.color[i][j - 1] !== "#c00") {
          queue.push(i + "-" + (j - 1));
          parents[i][j - 1] = i + "-" + j;
          visited[i][j - 1] = true;
        }

        loopQueue.push(i + "-" + j);
      }

      let colorQueue = [...loopQueue];
      setTimeout(() => {
        let colors = this.state.color;
        colorQueue.forEach((box) => {
          if (!(+box.split("-")[0] === entryX && +box.split("-")[1] === entryY))
            colors[+box.split("-")[0]][+box.split("-")[1]] = "darkgray";
        });

        this.setState({
          color: colors,
        });
      }, 200 * delay);

      delay++;
    }

    setTimeout(() => {
      if (stop) {
        let x = exitX,
          y = exitY;
        let pathDelay = 0;
        [x, y] = [+parents[x][y].split("-")[0], +parents[x][y].split("-")[1]];
        do {
          let m = x,
            n = y;
          setTimeout(() => {
            this.changeBoxColor(m, n, "yellow");
          }, pathDelay++ * 100);
          [x, y] = [+parents[x][y].split("-")[0], +parents[x][y].split("-")[1]];
        } while (entryX !== x || entryY !== y);
      }
    }, 200 * delay);
  };

  onCellClick = (x, y) => {
    if (this.placement === "") return;

    if (this.placement === "wall") this.changeBoxColor(x, y, "#c00");
    if (this.placement === "entry") {
      if (this.entry) this.changeBoxColor(+this.entry.split("-")[0], +this.entry.split("-")[1]);
      this.entry = x + "-" + y;
      this.changeBoxColor(x, y, "blue");
    }
    if (this.placement === "exit") {
      if (this.exit) this.changeBoxColor(this.exit.split("-")[0], this.exit.split("-")[1]);
      this.changeBoxColor(x, y, "green");
      this.exit = x + "-" + y;
    }
    if (this.placement === "cell") this.changeBoxColor(x, y);
  };

  clearCell = () => {
    this.placement = "cell";
  };

  placeWall = () => {
    this.placement = "wall";
  };

  placeEntry = () => {
    this.placement = "entry";
  };

  placeExit = () => {
    this.placement = "exit";
  };

  changeBoxColor = (i, j, color = "white") => {
    var colors = [...this.state.color];
    colors[i][j] = color;
    this.setState(() => ({
      color: colors,
    }));
  };

  randomMazeGenerator = () => {
    var colors = [];
    for (let i = 0; i < this.state.rows; i++) {
      let color = [];
      for (let j = 0; j < this.state.cols; j++) {
        color.push("");
      }
      colors.push(color);
    }

    var x, y;
    x = Math.floor(Math.random() * this.state.rows);
    y = Math.floor(Math.random() * this.state.cols);
    colors[x][y] = "blue";

    var a, b;
    do {
      a = Math.floor(Math.random() * this.state.rows);
      b = Math.floor(Math.random() * this.state.cols);
    } while (a === x && y === b);
    colors[a][b] = "green";

    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.cols; j++) {
        if (colors[i][j] === "") {
          if (Math.floor(Math.random() * 10) < 3) {
            colors[i][j] = "#c00";
          }
        }
      }
    }

    this.entry = x + "-" + y;
    this.exit = a + "-" + b;

    this.setState({
      color: colors,
    });
  };

  onRowRangeChange = (event) => {
    var height = window.innerHeight;

    if (height - 300 > 26 * event.target.value) {
      this.setState({
        rows: event.target.value,
      });
      this.setColors(undefined, event.target.value);
    }
  };

  onColRangeChange = (event) => {
    var width = window.innerWidth;
    if (width > 28 * event.target.value) {
      this.setState({
        cols: event.target.value,
      });
      this.setColors(undefined, undefined, event.target.value);
    }
  };

  render() {
    return (
      <div>
        <div className="grid">
          <label htmlFor="vol">Rows (between 6 and 30):</label>
          <input type="range" id="rows" name="vol" min="5" max="30" defaultValue="6" onChange={this.onRowRangeChange} />
          <br />
          <label htmlFor="vol">Columns (between 6 and 60):</label>
          <input type="range" id="cols" name="vol" min="5" max="60" defaultValue="6" onChange={this.onColRangeChange} />
          <br />
          <br />
          {this.generateGrid()}
          <Button className="margin-around-5px" variant="contained" color="primary" onClick={this.bfs}>
            Start BFS
          </Button>
          <br />
          <Button className="margin-around-5px" variant="outlined" color="primary" onClick={this.randomMazeGenerator}>
            Generate Random Maze
          </Button>
          <Button className="margin-around-5px" variant="outlined" color="primary" onClick={this.setColors}>
            Reset
          </Button>
          <br />
          <Button className="margin-around-5px" variant="outlined" color="primary" onClick={this.placeEntry}>
            Place Entry
          </Button>
          <Button className="margin-around-5px" variant="outlined" color="primary" onClick={this.placeExit}>
            Place Exit
          </Button>
          <Button className="margin-around-5px" variant="outlined" color="primary" onClick={this.placeWall}>
            Place Wall
          </Button>
          <Button className="margin-around-5px" variant="outlined" color="primary" onClick={this.clearCell}>
            Clear Cell
          </Button>
        </div>
      </div>
    );
  }
}

export default Matrix;
