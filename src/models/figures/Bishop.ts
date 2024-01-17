import { Cell } from "../Cell";
import { Colours } from "../Colours";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-bishop.png";
import whiteLogo from "../../assets/white-bishop.png";

export class Bishop extends Figure {
  constructor(colour: Colours, cell: Cell) {
    super(colour, cell);
    this.logo = colour === Colours.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
  }

  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    if (this.cell.isEmptyDiagonal(targetCell)) return true;
    return false
  }
}
