import React from "react";
import styled from "styled-components";

const ChatUI = ({ startIndex, moveDirection }) => {
  const stairs = Array(14).fill("");

  return (
    <Wrapper>
      <Stairs>
        {stairs.map((_, index) => {
          return (
            <Stair className="stair" key={index} index={index} />
          );
        })}
      </Stairs>
      <Character
        moveDirection={moveDirection}
        key={startIndex}
        startIndex={startIndex}
      >
        <div className="head"></div>
        <div className="upper-body"></div>
        <div className="arm"></div>
        <div className="upper-leg"></div>
        <div className="down-leg"></div>
        <div className="foot"></div>
      </Character>
    </Wrapper>
  );
};

const Character = styled.div`
  position: absolute;
  bottom: ${(props) => `${props.startIndex * 50}px`};
  right: ${(props) => `${props.startIndex * 50}px`};
  width: 26px;
  height: 115px;
  transform: scaleX(-1);
  animation: ${(props) => props.moveDirection ? "moveUp 1s linear" : "moveDown 1s linear"};

  @keyframes moveUp {
    0% {
      bottom: ${(props) => (props.startIndex - 1) * 50 + "px"};
      right: ${(props) => (props.startIndex - 1) * 50 + "px"};
    }
    25% {
      bottom: ${(props) => props.startIndex * 50 + "px"};
      right: ${(props) => (props.startIndex - 1) * 50 + "px"};
    }
    50% {
      bottom: ${(props) => props.startIndex * 50 + 15 + "px"};
      right: ${(props) => (props.startIndex - 1) * 50 + 15 + "px"};
    }
    75% {
      bottom: ${(props) => props.startIndex * 50 + 15 + "px"};
      right: ${(props) => (50 * (props.startIndex - 1) + 40) + "px"};
    }
    100% {
      bottom: ${(props) => 50 * props.startIndex + "px"};
      right: ${(props) => 50 * props.startIndex + "px"};
    }
  }

  .head {
    background-color: skyblue;
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    animation: moveHead 1s linear;
  }

  .upper-body {
    background-color: skyblue;
    position: absolute;
    top: 19px;
    left: 0;
    width: 20px;
    height: 50px;
    border-radius: 50px;
    animation: moveBody 1s linear;
  }

  .arm {
    position: absolute;
    top: 27px;
    left: 9px;
    width: 5px;
    height: 34px;
    z-index: -10;
    background-color: skyblue;
    border: 5px solid skyblue;
    border-radius: 10px;
    z-index: 10;
    transform: rotate(355deg);
    transform-origin: 10px 10px;
    animation: moveArm 1s linear;
  }

  .upper-leg {
    background-color: white;
    position: absolute;
    top: 68px;
    left: 5px;
    width: 10px;
    height: 30px;
    border: 5px solid skyblue;
    background-color: skyblue;
    border-radius: 10px;
    transform-origin: 10px 10px;
    animation: moveUpperLeg 1s linear;
  }

  .down-leg {
    position: absolute;
    background-color: white;
    top: 91px;
    left: 5px;
    width: 10px;
    height: 25px;
    border: 5px solid skyblue;
    background-color: skyblue;
    border-radius: 10px;
    transform-origin: 10px 5px;
    animation: moveDownLeg 1s linear;
  }

  .foot {
    position: absolute;
    background-color: white;
    bottom: 0;
    left: 5px;
    width: 20px;
    height: 5px;
    border: 5px solid skyblue;
    background-color: skyblue;
    border-radius: 10px;
    transform-origin: 9px 9px;
    animation: moveFoot 1s linear;
    animation-fill-mode: forwards;
  }
`;

const Stairs = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`;

const Stair = styled.div`
  background-color: #eee;
  width: ${(props) => Number(props.index + 1) * 50 + "px"};
  height: 50px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 738px;
  padding-left: 110px;
`;

export default ChatUI;
