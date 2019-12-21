import React from "react";
import "./Location.css";

interface Props {
  name: string;
}

export const Location = ({ name }: Props) => {
  const [station, address] = name.split(", ");
  return (
    <div className="location">
      <div className="location__name">{station}</div>
      {address && <div className="location__address">{address}</div>}
    </div>
  );
};
