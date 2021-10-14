import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";

import { ModalProvider } from "./contexts/ModalContext";

import GlobalStyles from "./styles";
import theme from "./styles/theme";

import Pages from "./pages";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <ModalProvider>
          <Layout>
            <Pages />
          </Layout>
        </ModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
