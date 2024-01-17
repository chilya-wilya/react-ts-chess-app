import { Cell } from "../Cell";
import { Colours } from "../Colours";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";

export class Queen extends Figure {
  constructor(colour: Colours, cell: Cell) {
    super(colour, cell);
    this.logo = colour === Colours.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.QUEEN;
  }

  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    if (this.cell.isEmptyVertical(targetCell)) return true;
    if (this.cell.isEmptyHorizontal(targetCell)) return true;
    if (this.cell.isEmptyDiagonal(targetCell)) return true;

    return false;
  }
}
