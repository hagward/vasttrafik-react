import React from "react";
import styles from "./Location.module.css";

interface Props {
  name: string;
}

export const Location = ({ name }: Props) => {
  const [station, address] = name.split(", ");
  return (
    <div>
      <div>{station}</div>
      {address && <div className={styles.address}>{address}</div>}
    </div>
  );
};
