import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import './LocationSearchInput.css';

interface Props {
  value: string;
  onChange(event: React.FormEvent<HTMLInputElement>): any;
  onCancel(event: React.MouseEvent<HTMLElement>): any;
}

export default class LocationSearchInput extends React.PureComponent<Props> {
  render() {
    return (
      <div className="location-search-input">
        <div className="location-search-input__icon">
          <FontAwesome name="map-marker-alt" />
        </div>
        <input
          className="location-search-input__input"
          placeholder="Station"
          ref={this.focusInput}
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <button className="location-search-input__cancel" onClick={this.props.onCancel}>Avbryt</button>
      </div>
    );
  }

  private focusInput(input: HTMLInputElement) {
    setTimeout(() => {
      if (input) {
        input.focus();
      }
    }, 0);
  }
}
