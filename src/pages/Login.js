import React from "react";
import firebase from "../config/firebase";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { postLogin } from "../api";
import { save } from "../features/userSlice";

const Login = ({ setUser }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { mutate } = useMutation(postLogin, {
    onSuccess: ({ data }) => {
      const { user } = data;

      dispatch(save(user));

      if (!user.couple && !user.partner_id) {
        history.push("/register");
        return;
      }

      if (!user.couple && user.partner_id) {
        history.push("/queue");
        return;
      }

      if (user.couple && !user.is_matched) {
        history.push("/queue");
        return;
      }

      history.push("/chat");
    },
  });

  const loginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { additionalUserInfo } = await firebase.auth().signInWithPopup(provider);
      const { email, name, picture } = additionalUserInfo.profile;

      const userData = {
        name,
        email,
        picture,
      };

      mutate(userData);
    } catch (error) {

    }
  };

  return (
    <Wrapper>
        <button type="button" onClick={loginWithGoogle}>Google Login</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
`;

export default Login;
