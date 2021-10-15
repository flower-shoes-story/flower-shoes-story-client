import React, { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { updateUser } from "../api";
import { save } from "../features/userSlice";

import Button from "../components/Shared/Button";
import PageTitle from "../components/Shared/PageTitle";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [partnerId, setPartnerId] = useState("");

  const { isLoading, mutate } = useMutation(updateUser, {
    onSuccess: ({ result, data }) => {
      const { user } = data;

      if (result === "success") {
        dispatch(save(user));
        history.push("/queue");
      }
    },
  });

  const handleChange = (event) => {
    setPartnerId(event.target.value);
  };

  const currentDate = new Date().toISOString().substring(0, 10);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { type, date } = event.target;

    mutate({ type: type.value, partnerId, date: date.value });
  };

  return (
    <div>
      <PageTitle className="sr-only">Register</PageTitle>

      <form onSubmit={handleSubmit}>
        <p>역할을 선택해주세요.</p>
        <input type="radio" id="soldier" name="type" value="soldier" checked />
        <label htmlFor="soldier">군인</label>
        <input type="radio" id="gomsin" name="type" value="gomsin" />
        <label htmlFor="gomsin">곰신</label>

        <p>파트너 아이디를 입력해주세요.</p>
        <input type="text" name="partnerId" value={partnerId} onChange={handleChange} />

        <p>첫 만남일을 선택해주세요.</p>
        <input type="date" name="date" defaultValue={currentDate} max={currentDate} />

        <Button type="submit">submit</Button>
      </form>
    </div>
  );
};

export default Register;
