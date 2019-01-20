import * as React from "react";
import { toDatetimeLocalString } from "../util";
import "./DatetimeInput.css";
import Input from "./Input";

interface IProps {
  date: Date;
  now: boolean;
  onChange(date: Date): void;
  onNowButtonClick(): void;
}

export default function DatetimeInput({
  date,
  now,
  onChange,
  onNowButtonClick
}: IProps) {
  const value = toDatetimeLocalString(date);

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
    onChange(new Date(target.value));
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
}
