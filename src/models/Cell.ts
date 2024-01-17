import { Board } from "./Board";
import { Colours } from "./Colours";
import { Figure } from "./figures/Figure";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly colour: Colours;
  figure: Figure | null;
  board: Board;
  available: boolean; //true if selected figure move on this cell
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    colour: Colours,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  public isEmptyCell(): boolean {
    return this.figure === null;
  }

  public isEnemy(targetCell: Cell): boolean {
    if (targetCell.figure) {
      return this.figure?.colour !== targetCell.figure.colour;
    }
    return false;
  }

  public isEmptyVertical(targetCell: Cell): boolean {
    if (this.x !== targetCell.x) {
      return false;
    }
    const min = Math.min(this.y, targetCell.y);
    const max = Math.max(this.y, targetCell.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmptyCell()) {
        return false;
      }
    }
    return true;
  }

  public isEmptyHorizontal(targetCell: Cell): boolean {
    if (this.y !== targetCell.y) {
      return false;
    }
    const min = Math.min(this.x, targetCell.x);
    const max = Math.max(this.x, targetCell.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmptyCell()) {
        return false;
      }
    }
    return true;
  }

  public isEmptyDiagonal(targetCell: Cell): boolean {
    const absX = Math.abs(targetCell.x - this.x);
    const absY = Math.abs(targetCell.y - this.y);
    if (absX !== absY) return false;

    const dx = this.x < targetCell.x ? 1 : -1;
    const dy = this.y < targetCell.y ? 1 : -1;
    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmptyCell()) {
        return false;
      }
    }
    return true;
  }

  private setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  private addLostFigure(figure: Figure) {
    figure.colour === Colours.BLACK
      ? this.board.lostBlackFigures.push(figure)
      : this.board.lostWhiteFigures.push(figure);
  }

  public moveFigure(targetCell: Cell) {
    if (this.figure && this.figure?.canMove(targetCell)) {
      this.figure.moveFigure(targetCell);
      if (targetCell.figure) {
        this.addLostFigure(targetCell.figure);
      }
      targetCell.setFigure(this.figure);
      this.figure = null;
    }
  }
}
