import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "adrianna", "Druk XCond Web", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input[type="text"] {
    appearance: none;
    outline: none;
  }

  input, button, textarea {
    border: none;
    outline: none;
  }

  button {
    background-color: transparent;
    cursor: pointer;
  }

  textarea {
    resize: none;
  }

  h1, h2, h3, h4, h5, h6{
    font-family: "adrianna-expended";
    font-weight: 700;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    display: block;
    width: 100%;
  }

  .sr-only {
    overflow: hidden;
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
  }
`;

export default GlobalStyle;
