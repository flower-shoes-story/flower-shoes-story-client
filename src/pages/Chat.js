import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components";

import FlexBox from "../components/Shared/FlexBox";
import PageTitle from "../components/Shared/PageTitle";

import { EVENTS } from "../constants";

const Chat = ({ userInfo }) => {
  const socket = useRef();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:8000");

    socket.current.emit(EVENTS.JOIN, userInfo.couple._id);

    socket.current.on(EVENTS.GET_MESSAGE, (chat) => {
      setMessages(chat);
    });

    socket.current.on(EVENTS.SEND_MESSAGE, (chat) => {
      setMessages((prev) => [...prev, chat]);
    });
  }, [userInfo.couple._id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    socket.current.emit(EVENTS.SEND_MESSAGE, {
      user: userInfo._id,
      message,
      time: new Date(),
    });

    setMessage("");
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <StyledFlexBox>
      <div>
        <PageTitle className="sr-only">Chat</PageTitle>
      </div>
      <div>
        {messages.map((item, index) => {
          return (
            <li key={item.user + index}>{item.message}</li>
          );
        })}
        <form onSubmit={handleSubmit}>
          <input type="text" value={message} onChange={handleChange} />
          <button type="submit">제출</button>
        </form>
      </div>
    </StyledFlexBox>
  );
};

const StyledFlexBox = styled(FlexBox)`
  height: 100vh;
`;

export default Chat;
