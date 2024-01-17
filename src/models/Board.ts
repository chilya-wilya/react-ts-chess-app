import { Colours } from "./Colours";
import { Cell } from "./Cell";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Pawn } from "./figures/Pawn";
import { King } from "./figures/King";
import { Bishop } from "./figures/Bishop";
import { Knight } from "./figures/Knight";
import { Figure } from "./figures/Figure";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures:Figure[] = []
  lostWhiteFigures:Figure[] = []

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colours.BLACK, null)); // black cells
        } else {
          row.push(new Cell(this, j, i, Colours.WHITE, null)); // white cells
        }
      }
      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < 8; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row?.length; j++) {
        const targetCell = row[j];
        targetCell.available = !!selectedCell?.figure?.canMove(targetCell);
      }
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  private addKings() {
    new King(Colours.BLACK, this.getCell(4, 0));
    new King(Colours.WHITE, this.getCell(4, 7));
  }
  private addQueens() {
    new Queen(Colours.BLACK, this.getCell(3, 0));
    new Queen(Colours.WHITE, this.getCell(3, 7));
  }
  private addBishops() {
    new Bishop(Colours.BLACK, this.getCell(2, 0));
    new Bishop(Colours.BLACK, this.getCell(5, 0));
    new Bishop(Colours.WHITE, this.getCell(2, 7));
    new Bishop(Colours.WHITE, this.getCell(5, 7));
  }
  private addKnights() {
    new Knight(Colours.BLACK, this.getCell(1, 0));
    new Knight(Colours.BLACK, this.getCell(6, 0));
    new Knight(Colours.WHITE, this.getCell(1, 7));
    new Knight(Colours.WHITE, this.getCell(6, 7));
  }
  private addRooks() {
    new Rook(Colours.BLACK, this.getCell(0, 0));
    new Rook(Colours.BLACK, this.getCell(7, 0));
    new Rook(Colours.WHITE, this.getCell(0, 7));
    new Rook(Colours.WHITE, this.getCell(7, 7));
  }
  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colours.BLACK, this.getCell(i, 1));
      new Pawn(Colours.WHITE, this.getCell(i, 6));
    }
  }

  public addFigures() {
    this.addKings();
    this.addBishops();
    this.addKnights();
    this.addRooks();
    this.addQueens();
    this.addPawns();
  }
}
