import { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

export default function Modal({ children }: any) {
  const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
  const modalRoot = document.getElementById("modal-root") as HTMLDivElement;
  const el: HTMLDivElement = document.createElement("div");

  useEffect(() => {
    body.classList.add("noscroll");
    el.classList.add("modal");
    modalRoot.appendChild(el);

    return () => {
      body.classList.remove("noscroll");
      modalRoot.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(children, el);
}
