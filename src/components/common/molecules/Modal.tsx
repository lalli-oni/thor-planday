import { PropsWithChildren, useEffect } from "react";
import styled from "styled-components";

const ModalContainer = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 1rem;
  background-color: var(--background-color);
  border: 2px solid black;
  border-radius: 0.3rem;
`

export interface ModalProps {
  onClose: () => void;
}


function Modal({ onClose, children }: PropsWithChildren<ModalProps>) {
  useEffect(() => {
      const close = (e: KeyboardEvent) => {
        if(e.key === 'Escape'){
          onClose()
        }
      }
      window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[onClose])

  return (
    <ModalContainer>
      {children}
    </ModalContainer>
  )
}

export default Modal