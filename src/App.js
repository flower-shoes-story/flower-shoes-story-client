import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";

import { ModalProvider } from "./contexts/ModalContext";

import GlobalStyles from "./styles";
import theme from "./styles/theme";

import Pages from "./pages";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <ModalProvider>
          <Pages />
        </ModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
