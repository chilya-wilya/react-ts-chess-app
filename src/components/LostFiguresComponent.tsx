import React, { FC } from "react";
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFiguresComponent: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lostFigures">
      <h3>{title}</h3>
      {figures.map((figure) => (
        <div key={figure.id}>
          {figure.name}
          {figure.logo && <img src={figure.logo} />}
        </div>
      ))}
    </div>
  );
};

export default LostFiguresComponent;
