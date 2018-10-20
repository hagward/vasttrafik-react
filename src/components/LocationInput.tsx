import * as React from 'react';
import { ICoordLocation } from '../api';
import Location from './Location';
import './LocationInput.css';
import LocationSearch from './LocationSearch';
import Modal from './Modal';

interface IProps {
  selected: ICoordLocation;
  onSelect(location: ICoordLocation): any;
}

interface IState {
  overlay: boolean;
}

export default class LocationInput extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      overlay: false,
    };
  }

  public render() {
    const overlay = this.state.overlay;
    const name = this.props.selected.name;

    return (
      <div className="location-input">
        {overlay && this.renderOverlay()}
        {name && <Location name={name} />}
        <input
          type="text"
          className={'location-input__fake-input' + (!name ? ' location-input__fake-input--static' : '')}
          onFocus={this.handleFocus}
          placeholder={!name ? 'Hållplats' : ''}
        />
      </div>
    );
  }

  private renderOverlay() {
    return (
      <Modal>
        <LocationSearch onCancel={this.handleCancel} onSelect={this.handleSelect} />
      </Modal>
    );
  }

  private handleFocus = () => this.setState({ overlay: true });
  private handleCancel = () => this.setState({ overlay: false });

  private handleSelect = (location: ICoordLocation) => {
    this.setState({
      overlay: false,
    }, () => this.props.onSelect(location));
  }
}
