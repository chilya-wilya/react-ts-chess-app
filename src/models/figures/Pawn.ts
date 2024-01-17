import { Cell } from "../Cell";
import { Colours } from "../Colours";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(colour: Colours, cell: Cell) {
    super(colour, cell);
    this.logo = colour === Colours.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }

  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    const direction = this.cell.figure?.colour === Colours.BLACK ? 1 : -1;
    const firstStepDirection =
      this.cell.figure?.colour === Colours.BLACK ? 2 : -2;

    if (
      (targetCell.y === this.cell.y + direction ||
        (this.isFirstStep &&
          targetCell.y === this.cell.y + firstStepDirection)) &&
      targetCell.x === this.cell.x &&
      this.cell.board.getCell(targetCell.x, targetCell.y).isEmptyCell()
    )
      return true;

    if (targetCell.y === this.cell.y + direction && (targetCell.x === this.cell.x +1 || targetCell.x === this.cell.x -1) && this.cell.isEnemy(targetCell)) return true

    return false;
  }

  moveFigure(targetCell: Cell): void {
    super.moveFigure(targetCell);
    this.isFirstStep = false;
  }
}
