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
      <Grow
        in={grow}
        style={{ transformOrigin: "0 100 0" }}
        {...(grow ? { timeout: 1500 } : {})}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} variant="outlined" square>
              <OverviewProfile />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} variant="outlined" square>
              <OverviewSkillset />
            </Paper>
          </Grid>
        </Grid>
      </Grow>
      <Grow
        in={grow}
        style={{ transformOrigin: "0 0 0" }}
        {...(grow ? { timeout: 3000 } : {})}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Twitter />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paperbottom} elevation={3}>
              {Navigation()}
            </Paper>
          </Grid>
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
      </Grow>
    </>
  );
};

export default Overview;
