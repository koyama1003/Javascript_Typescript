import React from "react";
import Head from "next/head";
import Title from "./Title";
import Navbar from "./Navbar";
type Props = {
  title: string;
  subTitle: string;
};

const Layout: React.FC<Partial<Props>> = ({
  children,
  title = "Default",
  subTitle = "Portfolio",
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <Title subTitle={subTitle} />
      <Navbar />
    </header>
    {children}
  </>
);

export default Layout;
