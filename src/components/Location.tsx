import * as React from "react";
import "./Location.css";

interface IProps {
  name: string;
}

export default function Location({ name }: IProps) {
  const [station, address] = name.split(", ");
  return (
    <div className="location">
      <div className="location__name">{station}</div>
      {address && <div className="location__address">{address}</div>}
    </div>
  );
}
