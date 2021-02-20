import React from "react";
import Link from "next/link";
import { Tabs, Tab, AppBar } from "@material-ui/core";

const Navbar = () => {
  return (
    <AppBar color="transparent" position="fixed">
      <Tabs style={{ flexGrow: 1 }} value={false} centered>
        <Link href="/">
          <Tab label="TOP" />
        </Link>
        <Link href="/profile">
          <Tab label="PROFILE" />
        </Link>
        <Link href="/works">
          <Tab label="WORKS" />
        </Link>
      </Tabs>
    </AppBar>
  );
};

export default React.memo(Navbar);
