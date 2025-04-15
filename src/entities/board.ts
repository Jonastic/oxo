import { Cell } from "./cell";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export class Board {
    cells: Cell[];

    constructor(cells : Cell[] | null = null) {
        this.cells = cells || Array.from({ length: 9 }, (_, i) => (new Cell(i)));
    }

    reset(): void {
        this.cells.forEach(cell => {
            cell.playerIndex = null;
         });
    }

    hasWon(currentPlayerIndex : number): boolean {
        return winningCombinations.some(([a, b, c]) => {
            return (
              this.cells[a].playerIndex === currentPlayerIndex &&
              this.cells[b].playerIndex === currentPlayerIndex &&
              this.cells[c].playerIndex === currentPlayerIndex
            );
          });
    }

    isFull() {
        return this.cells.every(cell => cell.playerIndex !== null);
    }
}
