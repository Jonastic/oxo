export class Cell {
    index: number;
    playerIndex: number | null;

    constructor(index: number, playerIndex: number | null = null) {
        this.index = index;
        this.playerIndex = playerIndex;
    }
}