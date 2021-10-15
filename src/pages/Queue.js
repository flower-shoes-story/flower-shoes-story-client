import React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { updateUser } from "../api";
import { save } from "../features/userSlice";

const Queue = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { couple } = user;

  const { isLoading, mutate } = useMutation(updateUser, {
    onSuccess: ({ result, data }) => {
      const { user } = data;

      if (result === "success") {
        dispatch(save(user));
        history.push("/chat");
      }
    },
  });

  const handleClickButton = () => {
    mutate({ user });
  };

  return (
    <div>
      {couple ?
        <p>상대방의 수락 요청을 기다리는 중입니다.</p>
        :
        <button type="button" onClick={handleClickButton}>수락하기</button>
      }
    </div>
  );
};

export default Queue;
