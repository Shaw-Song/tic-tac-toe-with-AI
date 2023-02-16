const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    this.cursor.setBackgroundColor();//show cursor
   

    // Replace this with real commands
    Screen.addCommand('w', 'move cursor up', this.cursor.up);
    Screen.addCommand('s', 'move cursor down', this.cursor.down);
    Screen.addCommand('a', 'move cursor left', this.cursor.left);
    Screen.addCommand('d', 'move cursor right', this.cursor.right);
    Screen.addCommand('x', 'place a X', this.placeAMoveX);
    Screen.addCommand('o', 'place a O', this.placeAMoveO);

    this.__renderMsg("Player X plays first")
  }

  

  __renderMsg(msg) {
    Screen.setMessage(msg);
    Screen.render();
    Screen.setMessage("");
  }

  placeAMoveX = () => {
    if (this.playerTurn === "O") {
      this.__renderMsg("It is player O's turn")
    } else {
      const r = this.cursor.row;
      const c = this.cursor.col;
      if (this.grid[r][c] === " ") {
        this.playerTurn = "O";
        this.grid[r][c] = "X";
        Screen.setGrid(r, c, "X");
        Screen.setTextColor(r, c, "white");
        const situation = TTT.checkWin(this.grid);
        if (situation) {
          TTT.endGame(situation);
        } else {
          Screen.render();
        }
      } else {
        this.__renderMsg("Can not place a move on this grid!")
      }
    }
  }

  placeAMoveO = () => {
    if (this.playerTurn === "X") {
      this.__renderMsg("It is player X's turn")
    } else {
      const r = this.cursor.row;
      const c = this.cursor.col;
      if (this.grid[r][c] === " ") {
        this.playerTurn = "X";
        this.grid[r][c] = "O";
        Screen.setGrid(r, c, "O");
        Screen.setTextColor(r, c, "white");
        const situation = TTT.checkWin(this.grid);
        if (situation) {
          TTT.endGame(situation);
        } else {
          Screen.render();
        }
      } else {
        this.__renderMsg("Can not place a move on this grid!")
      }
    }
    
    
  }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    for (let i = 0; i < 3; i++) {
      if (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
        if (grid[i][0] !== " ") {
          return grid[i][0];
         } 
      }
    }
    for (let i = 0; i < 3; i++) {
      if (grid[0][i] === grid[1][i] && grid[2][i] === grid[1][i]) {
        if (grid[0][i] !== " ") {
          return grid[0][i];
         } 
      }
    }
    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] || grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
      if (grid[1][1] !== " ") {
        return grid[1][1];
      }
    }

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (grid[r][c] === " ") {
          return false;
        }
      }
    }

    return "T";
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
