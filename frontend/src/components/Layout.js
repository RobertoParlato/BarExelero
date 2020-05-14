import { Container } from "semantic-ui-react";
import React from 'react';
import Header from "./Header";
import HeadContent from "./HeadContent";

function Layout({ children }) {
  return (
    <>
      <head>
        <HeadContent />
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <title>Bar Exelero</title>
      </head>
      <Header />
      <Container text style={{ paddingTop: "1em" }}>
        {children}
      </Container>
    </>
  );
}

export default Layout;
