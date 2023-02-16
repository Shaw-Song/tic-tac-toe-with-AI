
const TTT = require('./ttt');
class ComputerPlayer {

  static getValidMoves(grid) {
    // Your code here
    let validMoves = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === " ") {
          validMoves.push({row: i, col: j});
        }
      }
    }
    return validMoves;
  }

  static randomMove(grid) {
    const validMoves = ComputerPlayer.getValidMoves(grid);
    return validMoves[Math.floor(Math.random() * validMoves.length)]; 
    // Your code here
  }

  static getWinningMoves(grid, symbol) {
    const validMoves = ComputerPlayer.getValidMoves(grid);
    for (let i = 0; i < validMoves.length; i++) {
      const validMove = validMoves[i];
      grid[validMove.row][validMove.col] = symbol;
      if (TTT.checkWin(grid) === symbol) {
        grid[validMove.row][validMove.col] = " ";
        return validMove;
      }
      grid[validMove.row][validMove.col] = " ";
    }
    return false;
    // Your code here

  }

  
  static getSmartMove(grid, symbol) {
    // Your code here
    function __isOccupied(row, col) {
      if (grid[row][col] === "O") {
        return true;
      } else {
        return false;
      }
    }
    const winningMove = ComputerPlayer.getWinningMoves(grid, symbol);
    const oppoWinningMove = ComputerPlayer.getWinningMoves(grid, symbol === "O"? "X" : "O");
    if (winningMove) {
      return winningMove;
    } else if (oppoWinningMove) {
      return oppoWinningMove;
    } else {
      const validMoves = ComputerPlayer.getValidMoves(grid);
      if (validMoves.length === 9) {
        return {row: 2, col: 0};
      } else if (validMoves.length === 7) {
        if (__isOccupied(0 , 0) || __isOccupied(2 , 2) || __isOccupied(1 , 1)) {
          return {row: 0, col: 2};
        } else if (__isOccupied(0 , 1) || __isOccupied(1 , 0) || __isOccupied(1 , 2) || __isOccupied(2 , 1)) {
          return {row: 1, col: 1};
        } else {
          return {row: 2, col: 2};
        }
      } else if (validMoves.length === 5) {
        if (__isOccupied(0 , 0) && __isOccupied(1 , 1)) {
          return {row: 2, col: 2};
        } else if (__isOccupied(2 , 2) && __isOccupied(1 , 1)) {
          return {row: 0, col: 0};
        } else if ((__isOccupied(0 , 1) || __isOccupied(2 , 1)) && __isOccupied(0 , 2)) {
          return {row: 0, col: 0};
        } else if ((__isOccupied(1 , 0) || __isOccupied(1 , 2)) && __isOccupied(0 , 2)) {
          return {row: 2, col: 2};
        } else if (__isOccupied(0 , 2) && __isOccupied(2 , 1)) {
          return {row: 0, col: 0};
        }
      } else if (validMoves.length === 8) {
        if (__isOccupied(1 , 1)) {
          return {row: 2, col: 2};
        // } else if (__isOccupied(0, 0) || __isOccupied(0, 2) || __isOccupied(2, 0) || __isOccupied(2, 2)) {
        } else {
          return {row: 1, col: 1};
        }
      } else if (validMoves.length === 6) {
        if (__isOccupied(0, 0) && __isOccupied(1, 1)) {
          return {row: 0, col: 2};
        } else if ((__isOccupied(0, 0) && __isOccupied(2, 2)) || (__isOccupied(2, 0) && __isOccupied(0, 2))) {
          return {row: 0, col: 1};
        } else if ((__isOccupied(2, 1) || __isOccupied(0, 2)) && __isOccupied(1, 0)) {
          return {row: 0, col: 0};
        } else if (__isOccupied(0, 1) && __isOccupied(2, 0)) {
          return {row: 0, col: 0};
        } else if ((__isOccupied(1, 0) || __isOccupied(2, 2)) && __isOccupied(0, 1)) {
          return {row: 0, col: 2};
        } else if (__isOccupied(0, 0) && __isOccupied(1, 2)) {
          return {row: 0, col: 2};
        } else if ((__isOccupied(0, 1) || __isOccupied(2, 0)) && __isOccupied(1, 2)) {
          return {row: 2, col: 2};
        } else if (__isOccupied(0, 2) && __isOccupied(2, 1)) {
          return {row: 2, col: 2};
        } else if ((__isOccupied(1, 2) || __isOccupied(0, 0)) && __isOccupied(2, 1)) {
          return {row: 2, col: 0};
        } else if (__isOccupied(1, 0) && __isOccupied(2, 2)) {
          return {row: 2, col: 0};
        } else {
          return validMoves[0];
        }
      } else {
        return validMoves[0];
      }
    }
  }

}

module.exports = ComputerPlayer;
