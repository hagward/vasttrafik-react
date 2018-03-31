import * as React from 'react';
import './LocationItem.css';

interface Props {
  highlight: string;
  id: string;
  label: string;
  onClick(id: string, label: string): any;
}

export default class LocationItem extends React.Component<Props, any> {
  render() {
    return (
      <li
        className="location-item"
        dangerouslySetInnerHTML={{ __html: this.highlightSearchValue() }}
        key={this.props.id}
        onClick={this.handleClick}
      />
    );
  }

  highlightSearchValue(): string {
    const highlight = this.props.highlight;
    const label = this.props.label;
    const i = label.toLowerCase().indexOf(highlight.toLowerCase());
    if (i >= 0 && highlight) {
      return label.substr(0, i) +
        '<b>' + label.substr(i, highlight.length) + '</b>' +
        label.substr(i + highlight.length);
    } else {
      return label;
    }
  }

  handleClick = () => {
    this.props.onClick(this.props.id, this.props.label);
  }
}
