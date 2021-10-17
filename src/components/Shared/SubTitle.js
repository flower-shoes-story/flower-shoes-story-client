import React from "react";
import styled from "styled-components";

const SubTitle = ({ children }) => {
  return (
    <Wrapper>{children}</Wrapper>
  );
};

const Wrapper = styled.h3`
  -moz-text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  -moz-text-stroke-color: #777;
  -webkit-text-stroke-color: #777;
  -moz-text-stroke-width: 1.2px;
  -webkit-text-stroke-width: 1.2px;
  font-size: 3vw;
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0.02em;
`;

export default SubTitle;
