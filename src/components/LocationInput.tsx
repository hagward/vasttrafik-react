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
      <div className="location-input" onClick={this.handleClick}>
        {this.state.overlay && this.renderOverlay()}
        <Location name={this.props.selected} />
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

  private handleClick = () => this.setState({ overlay: true });
  private handleCancel = () => this.setState({ overlay: false });

  private handleSelect = (id: string, label: string) => {
    this.setState({
      overlay: false,
    }, () => this.props.onSelect(id, label));
  }
}
