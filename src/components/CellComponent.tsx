import React, { FC } from "react";
import classNames from "classnames";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  onClick: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, onClick }) => {
  return (
    <div
      className={classNames("cell", cell.colour, {
        ["selected"]: selected,
        ["availableForMove"]: cell.available && cell.figure,
      })}
      onClick={() => onClick(cell)}
    >
      {cell.available && !cell.figure && <div className="available" />}
      {cell.figure?.logo && <img src={cell.figure?.logo} alt="" />}
    </div>
  );
};

export default CellComponent;
