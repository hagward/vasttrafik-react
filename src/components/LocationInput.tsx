import * as React from 'react';
import Location from './Location';
import LocationSearch from './LocationSearch';
import Modal from './Modal';
import './LocationInput.css';

interface Props {
  selected: string;
  onSelect(id: string, name: string): any;
}

interface State {
  overlay: boolean;
}

export default class LocationInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      overlay: false,
    };
  }

  render() {
    return (
      <div className="location-input">
        {this.state.overlay && this.renderOverlay()}
        {this.props.selected && <Location name={this.props.selected} />}
        <input
          type="text"
          className={'location-input__fake-input' + (!this.props.selected ? ' location-input__fake-input--static' : '')}
          onFocus={this.handleFocus}
          placeholder={!this.props.selected ? 'Hållplats' : ''}
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

  private handleSelect = (id: string, label: string) => {
    this.setState({
      overlay: false,
    }, () => this.props.onSelect(id, label));
  }
}
