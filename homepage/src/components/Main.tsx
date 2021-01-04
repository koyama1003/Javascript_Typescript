import React, { useState, useEffect } from "react";
import AppContextProvider from "../contexts/AppContextProvider";
import { Grid, Grow, Tabs, Tab, AppBar } from "@material-ui/core";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Overview from "./Tabs/Overview";
import Works from "./Works";
import Profile from "./Profile";
import Title from "./Title";

const Main: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const Growin = () => {
    setChecked(true);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      Growin();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <AppContextProvider>
      <div data-testid="MainAll">
        <Title />
        <Grow in={checked}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Router>
                <Route exact path="/" component={Overview} />
                <Route path="/Works" component={Works} />
                <Route path="/profile" component={Profile} />
                <AppBar color="transparent" position="fixed">
                  <Tabs style={{ flexGrow: 1 }} value={false} centered>
                    <Tab label="TOP" component={Link} to={"/"} />
                    <Tab label="PROFILE" component={Link} to={"/profile"} />
                    <Tab label="WORKS" component={Link} to={"/works"} />
                  </Tabs>
                </AppBar>
              </Router>
            </Grid>
          </Grid>
        </Grow>
      </div>
    </AppContextProvider>
  );
};

export default Main;
