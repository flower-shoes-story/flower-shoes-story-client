import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ModalContext } from "../contexts/ModalContext";
import ConfirmModal from "../components/Shared/Modal/ConfirmModal";

import { deleteUser, getScore } from "../api";
import { remove } from "../features/userSlice";

import Button from "../components/Shared/Button";
import Flower from "../components/Shared/Flower";
import SubTitle from "../components/Shared/SubTitle";
import PageTitle from "../components/Shared/PageTitle";

import bg_texture_grey from "../assets/bg_texture_grey.jpeg";

const Settings = () => {
  const { handleModal } = useContext(ModalContext);
  const history = useHistory();
  const dispatch = useDispatch();

  const [isConfirm, setIsConfirm] = useState(false);
  const [flower, setFlower] = useState(0);
  let flowerList = [];

  useQuery("score", getScore, {
    onSuccess: ({ data }) => {
      if (data > 1000) {
        setFlower(8);
        return;
      }

      if (data > 500) {
        setFlower(7);
        return;
      }

      if (data > 100) {
        setFlower(6);
        return;
      }

      if (data > 10) {
        setFlower(4);
        return;
      }
    },
  }, []);

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

  const handleClickWithdraw = () => {
    handleModal(
      <ConfirmModal
        message="정말 탈퇴하시겠습니까?"
        setIsConfirm={setIsConfirm}
      />,
    );
  };

  if (flower) {
    flowerList = Array(flower - 3).fill("");
  }

  return (
    <Wrapper>
      <PageTitle className="sr-only">Settings</PageTitle>
      <SubTitle>COLLECTED FLOWERS</SubTitle>
      <FlowerList>
        {flowerList.map((item, index) => {
          return <Flower flower={4 + index} key={item} />;
        })}
      </FlowerList>
      <Setting>
        <li><Button onClick={handleClickWithdraw}>WITHDRAWAL</Button></li>
      </Setting>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 110px;
  opacity: 1;
  background: url(${bg_texture_grey}) repeat 50%/400px 200px;
  transition: .7s linear;
`;

const FlowerList = styled.ul`
  margin-top: 20px;
  width: 100%;
  height: 100%;

  li {
    display: inline-block;
    margin: 0 20px;
    width: 100px;
    height: 100px;
  }
`;

const Setting = styled.ul`
  position: absolute;
  width: calc(100% - 150px);
  text-align: right;
  bottom: 30px;
`;

export default Settings;
