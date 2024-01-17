import { Cell } from "../Cell";
import { Colours } from "../Colours";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-knight.png";
import whiteLogo from "../../assets/white-knight.png";

export class Knight extends Figure {
  constructor(colour: Colours, cell: Cell) {
    super(colour, cell);
    this.logo = colour === Colours.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KNIGHT;
  }

  canMove(targetCell: Cell): boolean {
    if (!super.canMove(targetCell)) return false;
    const dx = Math.abs(this.cell.x - targetCell.x)
    const dy = Math.abs(this.cell.y - targetCell.y);
    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }
}
