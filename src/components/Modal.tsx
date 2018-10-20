import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Modal.css';

const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

export default class Modal extends React.PureComponent<any> {
  private el: HTMLDivElement = document.createElement('div');

  public componentDidMount() {
    body.classList.add('noscroll');
    this.el.classList.add('modal');
    modalRoot.appendChild(this.el);
  }

  public componentWillUnmount() {
    body.classList.remove('noscroll');
    modalRoot.removeChild(this.el);
  }

  public render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}
