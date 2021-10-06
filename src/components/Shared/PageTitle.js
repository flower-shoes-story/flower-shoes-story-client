import React from "react";
import styled from "styled-components";

const PageTitle = ({ children, className }) => {
  return (
    <PageTitleWrapper className={className}>{children}</PageTitleWrapper>
  );
};

const PageTitleWrapper = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

export default PageTitle;
