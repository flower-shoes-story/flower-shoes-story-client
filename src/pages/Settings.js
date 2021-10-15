import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ModalContext } from "../contexts/ModalContext";
import ConfirmModal from "../components/Shared/Modal/ConfirmModal";

import { deleteUser } from "../api";
import { remove } from "../features/userSlice";

import Button from "../components/Shared/Button";

const Settings = () => {
  const { handleModal } = useContext(ModalContext);
  const history = useHistory();
  const dispatch = useDispatch();

  const [isConfirm, setIsConfirm] = useState(false);

  const { isLoading, mutate } = useMutation(deleteUser, {
    onSuccess: ({ result }) => {
      if (result === "success") {
        dispatch(remove());
        history.push("/login");
      }
    },
  });

  useEffect(() => {
    if (isConfirm) {
      mutate();
    }
  }, [isConfirm, mutate]);

  const handleClick = () => {
    handleModal(
      <ConfirmModal
        message="정말 탈퇴하시겠습니까?"
        setIsConfirm={setIsConfirm}
      />,
    );
  };

  return (
    <div>
      <Button onClick={handleClick}>탈퇴하기</Button>
    </div>
  );
};

export default Settings;
