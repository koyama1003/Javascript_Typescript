import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import {
  Grid,
  Paper,
  Grow,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import OverviewSkillset from "./OverviewComponents/OverviewSkillset";
import OverviewProfile from "./OverviewComponents/OverviewProfile";
import Git from "../Navigations/Git";
import Twitter from "../Navigations/Twitter";
import Contacts from "../Navigations/Contacts";

import Skillset from "../Navigations/Skillset";
import BookIcon from "@material-ui/icons/Book";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import GitHubIcon from "@material-ui/icons/GitHub";
import { NAVIGATION } from "../../actions";

const Overview = () => {
  const { classes, state, dispatch } = useContext(AppContext);
  const [grow, setGrow] = useState(false);
  const Growin = () => {
    setGrow((prev) => true);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      Growin();
    }
    return () => (mounted = false);
  }, []);

  const Navigation = () => {
    switch (state.navigations) {
      case 1:
        return <Contacts />;
      case 2:
        return <Skillset />;
      default:
        return <Git name="GitHub" />;
    }
  };
  const navChange = (e, nav) => {
    e.preventDefault();
    dispatch({ type: NAVIGATION, nav });
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grow
          in={grow}
          style={{ transformOrigin: "10 0 0" }}
          {...(grow ? { timeout: 700 } : {})}
        >
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} variant="outlined" square>
              <OverviewProfile />
            </Paper>
          </Grid>
        </Grow>
        <Grow
          in={grow}
          style={{ transformOrigin: "20 20 45" }}
          {...(grow ? { timeout: 1500 } : {})}
        >
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} variant="outlined" square>
              <OverviewSkillset />
            </Paper>
          </Grid>
        </Grow>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Twitter />
        </Grid>

        <Grow
          in={grow}
          style={{ transformOrigin: "10 10 30" }}
          {...(grow ? { timeout: 2000 } : {})}
        >
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paperbottom} elevation={3}>
              {Navigation()}
            </Paper>
          </Grid>
        </Grow>
        <BottomNavigation
          value={state.navigations}
          onChange={navChange}
          showLabels
          className={classes.navbar}
        >
          <BottomNavigationAction label="GitHub" icon={<GitHubIcon />} />
          <BottomNavigationAction label="Contact" icon={<WhatsAppIcon />} />
          <BottomNavigationAction
            label="Description of Skills"
            icon={<BookIcon />}
          />
        </BottomNavigation>
      </Grid>
    </>
  );
};

export default Overview;
