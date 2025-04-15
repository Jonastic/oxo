import { Board } from "./board";
import { Cell } from "./cell";

export class AI {
    cells: Cell[];

    constructor(cells : Cell[]) {
        this.cells = cells;
    }

    determineNextMove() : Cell {
        // Create a deep copy to not mess with the original cells.
        const board = new Board(this.cells.map(cell => cell.clone()));
        
        // Loop through the players.
        // First we check if the computer can win. 
        // If that's not the case, we can check if we can block the player from winning.
        for (let currentPlayerIndex = 1; currentPlayerIndex >= 0; currentPlayerIndex--) {
            for (let i = 0; i < this.cells.length; i++) {
                const cell = this.cells[i];

                if (cell.playerIndex === null) {
                    board.cells[cell.index].playerIndex = currentPlayerIndex;

                    if (board.hasWon(currentPlayerIndex)) {
                        return cell;
                    }

                    board.cells[cell.index].playerIndex = null;
                }
            }
        }

        // Else we'll just take a random cell.
        const availableCells = this.cells.filter((cell) => cell.playerIndex === null);
        const availableCellIndex = Math.floor(Math.random() * availableCells.length);

        return availableCells[availableCellIndex]
    }
}
