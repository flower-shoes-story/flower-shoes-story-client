import React, { useContext } from "react";
import styled from "styled-components";

import { ModalContext } from "../../../contexts/ModalContext";

import Button from "../Button";
import CloseButton from "./CloseButton";

const ConfirmModal = ({ message, setIsConfirm }) => {
  const { handleModal } = useContext(ModalContext);

  const handleChange = () => {
    setIsConfirm(true);
    handleModal(null);
  };

  return (
    <Wrapper>
      <p>{message}</p>
      <ButtonBox>
        <CloseButton text="취소" closeModal={() => handleModal(null)} />
        <Button type="button" onClick={handleChange}>확인</Button>
      </ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  p {
    text-align: center;
    margin-bottom: 10px;
  }

  button {
    min-width: 80px;
    position: initial;
    font-weight: 600;
    color: #222;

    :before, :after {
      content: none;
    }
  }
`;

const ButtonBox = styled.div`
  margin-top: 20px;
`;

export default ConfirmModal;
