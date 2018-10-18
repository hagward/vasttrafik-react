import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Modal.css';

const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

export default class Modal extends React.PureComponent<any> {
  private el: HTMLDivElement = document.createElement('div');

  componentDidMount() {
    body.classList.add('noscroll');
    this.el.classList.add('modal');
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    body.classList.remove('noscroll');
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}
