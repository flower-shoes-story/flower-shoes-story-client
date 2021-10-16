import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { set } from "../../features/preloadSlice";

import Header from "./Header";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(set());
  }, [dispatch]);

  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
};

export default Layout;
