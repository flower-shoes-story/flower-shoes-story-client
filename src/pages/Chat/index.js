import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import styled from "styled-components";

import { EVENTS } from "../../constants";

import ChatUI from "./ChatUI";
import PageTitle from "../../components/Shared/PageTitle";

const Chat = () => {
  const user = useSelector((state) => state.user);
  const socket = useRef();
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [moveDirection, setMoveDirection] = useState(true);
  let [startIndex, setStartIndex] = useState(user.couple.stair);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL);

    socket.current.emit(EVENTS.JOIN, user.couple._id);

    socket.current.on(EVENTS.GET_MESSAGES, (chat) => {
      setMessages(chat);
    });

    socket.current.on(EVENTS.SET_START_POSITION, (stair) => {
      setStartIndex(stair);
    });

    socket.current.on(EVENTS.SEND_MESSAGE, (chat) => {
      setMessages((prev) => [...prev, chat]);
    });
  }, [user.couple._id]);

  useEffect(() => {
    if (startIndex === 14) {
      setStartIndex(0);
    }

    socket.current.emit(EVENTS.RESET_START_POSITION, user.couple._id, startIndex);
  }, [startIndex, user.couple._id]);

  useEffect(() => {
    socket.current.on(EVENTS.LISTEN_JUMP_DIRECTION, (direction) => {
      if (direction === "up") {
        setMoveDirection(() => true);
        setStartIndex((prev) => prev + 1);
      }

      if (direction === "down") {
        setMoveDirection(() => false);
        setStartIndex((prev) => prev - 1);
      }
    });
  }, [setMoveDirection]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    socket.current.emit(EVENTS.SEND_MESSAGE, {
      roomId: user.couple._id,
      user: user._id,
      message,
      time: new Date(),
    });

    setMessage("");
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const hanedleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSubmit(event);
    }
  };

  return (
    <Wrapper>
      <PageTitle className="sr-only">Chat</PageTitle>
      <ChatUI startIndex={startIndex} moveDirection={moveDirection} />
      <ChatBox>
        <ul>
          {messages.map((item, index) => {
            const currentUser = user._id === item.user;

            return (
              <li key={item.user + index} className={currentUser ? "" : "left"} >
                <span>{item.message}</span>
              </li>
            );
          })}
          <div ref={messagesEndRef}></div>
        </ul>
        <ChatForm onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={handleChange}
            onKeyPress={(event) => hanedleKeyPress(event)}
          />
          <button type="submit"><span className="sr-only">전송</span></button>
        </ChatForm>
      </ChatBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin: 0 -110px;
  height: calc(100vh - 110px);
`;

const ChatBox = styled.div`
  position: relative;
  flex: 1;
  margin-left: auto;
  max-width: 350px;
  padding: 20px 20px 30px;
  background-color: #fff;

  ul {
    height: calc(100% - 100px);
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  li {
    margin: 10px 0;
    text-align: right;
  }

  li span {
    display: inline-block;
    padding: 10px;
    border-radius: 50px;
    border-bottom-right-radius: 0;
    background-color: #6b8af4;
    text-align: left;
    color: #fff;
    font-size: 14px;
  }

  li.left {
    text-align: left;
  }

  li.left span {
    background-color: #f8f6fd;
    color: #6e7277;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 0;
  }
`;

const ChatForm = styled.form`
  position: absolute;
  bottom: 30px;
  width: calc(100% - 40px);
  height: 80px;
  padding: 15px;
  border: 1px solid red;
  border-radius: 10px;

  textarea {
    width: 100%;
    height: 100%;
  }
`;

export default Chat;
