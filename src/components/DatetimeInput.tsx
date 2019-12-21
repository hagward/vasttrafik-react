import dayjs from "dayjs";
import React from "react";
import "./DatetimeInput.css";
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
    return <div className="datetime-input__now-overlay">Avgår nu</div>;
  }

  function renderNowButton() {
    return (
      <button className="datetime-input__now-button" onClick={onNowButtonClick}>
        Nu
      </button>
    );
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    onChange(dayjs(target.value).toDate());
  }

  return (
    <div className="datetime-input">
      <Input
        className="input__input"
        icon="calendar-alt"
        type="datetime-local"
        value={value}
        onChange={handleChange}
      />
      {now ? renderNowOverlay() : renderNowButton()}
    </div>
  );
};
