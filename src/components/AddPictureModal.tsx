import { useState } from "react";
import styled, { css } from "styled-components";

import Modal from "./common/molecules/Modal";

export interface AddPictureModalProps {
  onAddPicture: (title: string, picture: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

const InputsContainer = styled.div`
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

const LoadingMessage = styled.div<{ $show: boolean; }>`
  visibility: hidden;
  text-align: center;

  ${props => props.$show && css`
    visibility: visible;
  `}
`

function AddPictureModal(props: AddPictureModalProps) {
  const [title, setTitle] = useState<string>('')
  const [picture, setPicture] = useState<string>('')
  
  const validated = title?.length > 0 && picture?.length > 0

  

  return (
    <Modal onClose={() => { if (!props.isLoading) props.onClose() }}>
      <InputsContainer>
        <label htmlFor="title-input">Title:</label>
        <input type="text" id="title-input" autoFocus onChange={(e) => setTitle(e.target.value)} disabled={props.isLoading} />
        <label htmlFor="picture-input">Picture (valid picture id):</label>
        <input type="text" id="picture-input" onChange={(e) => setPicture(e.target.value)} disabled={props.isLoading} />
      </InputsContainer>
      <Actions>
        <input type="submit"
          value="Add picture"
          onClick={(e) => {
            e.preventDefault()
            props.onAddPicture(title, picture)
          }}
          disabled={!validated || props.isLoading}
        />
        <input type="button" value="Cancel" onClick={() => props.onClose()} disabled={props.isLoading}/>
      </Actions>
      <LoadingMessage $show={props.isLoading}>Loading ...</LoadingMessage>
    </Modal>
  )
}

export default AddPictureModal
