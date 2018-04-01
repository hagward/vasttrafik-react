import * as React from 'react';
import Input from './Input';
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

        <Input
          icon="map-marker"
          placeholder="Station"
          readOnly={true}
          type="search"
          value={this.props.selected}
          onFocus={this.handleFocus}
        />
      </div>
    );
  }

  renderOverlay() {
    return (
      <Modal>
        <LocationSearch onCancel={this.handleCancel} onSelect={this.handleSelect} />
      </Modal>
    );
  }

  handleFocus = () => this.setState({ overlay: true });
  handleCancel = () => this.setState({ overlay: false });

  handleSelect = (id: string, label: string) => {
    this.setState({
      overlay: false,
    }, () => this.props.onSelect(id, label));
  }
}
