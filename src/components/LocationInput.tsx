import * as React from 'react';
import Location from './Location';
import LocationSearch, { CoordLocation } from './LocationSearch';
import Modal from './Modal';
import './LocationInput.css';

interface Props {
  selected: CoordLocation;
  onSelect(location: CoordLocation): any;
}

interface State {
  overlay: boolean;
}

export default class LocationInput extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      overlay: false,
    };
  }

  render() {
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

  private handleSelect = (location: CoordLocation) => {
    this.setState({
      overlay: false,
    }, () => this.props.onSelect(location));
  }
}
