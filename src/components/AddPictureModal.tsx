import { useState } from "react";
import styled from "styled-components";

export interface AddPictureModalProps {
  onAddPicture: (title: string, picture: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #80808099;
  backdrop-filter: blur(1px);
`

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 1rem;
  background-color: var(--background-color);
  border: 2px solid black;
  border-radius: 0.3rem;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const Actions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-around;
  gap: 0.1rem;
`

function AddPictureModal(props: AddPictureModalProps) {
  const [title, setTitle] = useState<string>('')
  const [picture, setPicture] = useState<string>('')
  
  const validated = title?.length > 0 && picture?.length > 0

  return (
    <Backdrop>
      <Modal>
        <Form>
          <label htmlFor="title-input">Title:</label>
          <input type="text" id="title-input" autoFocus onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="picture-input">Picture:</label>
          <input type="text" id="picture-input" onChange={(e) => setPicture(e.target.value)}/>
        </Form>
        <Actions>
          <input type="button"
            value="Add picture"
            onClick={() => props.onAddPicture(title, picture)}
            disabled={!validated || props.isLoading}
          />
          <input type="button" value="Cancel" onClick={() => props.onClose()} />
        </Actions>
      </Modal>
    </Backdrop>
  )
}

export default AddPictureModal
