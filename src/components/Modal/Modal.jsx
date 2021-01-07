import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'; //żeby móc skorzystać z portali - sprawdzić
import bemCssModules from 'bem-css-modules';

import {default as ModalStyles} from './Modal.module.scss';

const style = bemCssModules(ModalStyles);

const Modal = ({children, handleOnClose, isOpen, shouldBeCloseOnOutsideClick}) => {
 const modalRef = useRef(null);
 const previousActiveElement = useRef(null); //zapisanie referencji do elementu, który był ostatnio aktywny

 useEffect(() => {
  if(!modalRef.current){
   return;
  }
  const { current: modal } = modalRef;
  if(isOpen){
   previousActiveElement.current= document.activeElement;
   modal.showModal(); //metoda wbudowana w dialog
  } else if (previousActiveElement.current){
   modal.close(); //metoda wbudowana w dialog
   previousActiveElement.current.focus();
  }
 }, [isOpen])

 useEffect(() => {
  const { current: modal } = modalRef;

  const handleCancel = e => {
   e.preventDefault();
   handleOnClose();
  };
  modal.addEventListener('cancel', handleCancel);

  return () => { // zakończenie nasłuchiwania, niezbędne w useEffect
   modal.removeEventListener('cancel', handleCancel);
  }
 },[handleOnClose]);

 const handleOutsideClick = ({ target }) => {
  const { current } = modalRef;
  if (shouldBeCloseOnOutsideClick && target === current){
   handleOnClose();
  }
 };

 return ReactDOM.createPortal((
  <dialog className={style()} ref={modalRef} onClick={handleOutsideClick}>
   {children}
  </dialog>
 ), document.body);
}
 
export default Modal;