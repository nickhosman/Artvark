import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalElement({
  modalComponent,
  text,
  onEleClick,
  onModalClose,
  id,
  className,
  title,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onEleClick) onEleClick();
  };

  return (
    <div id={id ? id : null} className={className ? className : null} onClick={onClick} title={title ? title : null}>{text}</div>
  )
}

export default OpenModalElement
