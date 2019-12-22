import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import React from "react";
import styles from "./DatetimeInput.module.css";
import { Input } from "./Input";

interface Props {
  date: Date;
  now: boolean;
  onChange(date: Date): void;
  onNowButtonClick(): void;
}

export const DatetimeInput = ({
  date,
  now,
  onChange,
  onNowButtonClick
}: Props) => {
  const value = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");

  function renderNowOverlay() {
    return <div className={styles.nowOverlay}>Avgår nu</div>;
  }

  function renderNowButton() {
    return (
      <button className={styles.nowButton} onClick={onNowButtonClick}>
        Nu
      </button>
    );
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    onChange(dayjs(target.value).toDate());
  }

  return (
    <div className={styles.wrapper}>
      <Input
        icon={faCalendarAlt}
        type="datetime-local"
        value={value}
        onChange={handleChange}
      />
      {now ? renderNowOverlay() : renderNowButton()}
    </div>
  );
};
