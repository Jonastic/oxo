export class Cell {
    index: number;
    playerIndex: number | null;

    constructor(index: number, playerIndex: number | null = null) {
        this.index = index;
        this.playerIndex = playerIndex;
    }

    clone(): Cell {
        return new Cell(this.index, this.playerIndex);
    }

    reset() : void {
        this.playerIndex = null;
    }
}