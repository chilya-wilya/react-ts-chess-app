import { Colours } from "./../Colours";
import logo from "../../assets/black-bishop.png";
import { Cell } from "../Cell";

export enum FigureNames {
  FIGURE = "Figure",
  KING = "King",
  KNIGHT = "Knight",
  PAWN = "Pawn",
  QUEEN = "Queen",
  ROOK = "Rook",
  BISHOP = "Bishop",
}

export class Figure {
  colour: Colours;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(colour: Colours, cell: Cell) {
    this.colour = colour;
    this.logo = null;
    this.cell = cell;
    this.cell.figure = this;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(targetCell: Cell): boolean {
    if (targetCell.figure?.colour === this.colour) return false;
    if (targetCell.figure?.name === FigureNames.KING) return false;
    return true;
  }

  moveFigure(targetCell: Cell) {}
}
