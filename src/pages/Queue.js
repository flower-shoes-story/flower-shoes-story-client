import React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { updateUser } from "../api";

const Queue = ({ userInfo }) => {
  const history = useHistory();

  const { couple } = userInfo;

  const { isLoading, mutate } = useMutation(updateUser, {
    onSuccess: ({ result, data }) => {
      if (result === "success") {
        history.push("/chat");
      }
    },
  });

  const handleClickButton = () => {
    mutate({ userInfo });
  };

  return (
    <Wrapper>
      { couple ?
        <p>상대방의 수락 요청을 기다리는 중입니다.</p>
        :
        <button type="button" onClick={handleClickButton}>수락하기</button>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
`;

export default Queue;
