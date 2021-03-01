import React, { useState, useCallback } from "react";
import {
  Grid,
  Paper,
  Grow,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import OverviewSkillset from "../components/OverviewComponents/OverviewSkillset";
import OverviewProfile from "../components/OverviewComponents/OverviewProfile";
import Git from "../components/Navigations/Git";
import Twitter from "../components/Navigations/Twitter";
import Contacts from "../components/Navigations/Contacts";
import Skillset from "../components/Navigations/Skillset";
import BookIcon from "@material-ui/icons/Book";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import GitHubIcon from "@material-ui/icons/GitHub";
import Layout from "../components/Layouts/Layout";
import { NextPage } from "next";
import useAnimation from "../hooks/useAnimation";
import {
  navigationStates,
  changeNav,
} from "../features/navigation/navigationSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

const Index: NextPage = () => {
  const classes = useStyles();
  const [grow, setGrow] = useState(false);
  useAnimation(setGrow);
  const dispatch = useAppDispatch();
  const navigation = useAppSelector(navigationStates);
  const Navigation = useCallback(() => {
    switch (navigation.value) {
      case 1:
        return <Contacts />;
      case 2:
        return <Skillset />;
      default:
        return <Git name="GitHub" />;
    }
  }, [navigation.value]);
  const navChange = (e: React.ChangeEvent<{}>, nav: number) => {
    e.preventDefault();
    dispatch(changeNav(nav));
  };

  return (
    <Layout>
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
          value={navigation.value}
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
    </Layout>
  );
};
const useStyles = makeStyles(() =>
  createStyles({
    navbar: {
      width: "50%",
      position: "sticky",
      bottom: 10,
      background: "rgba(0,0,0,0)",
      flexGrow: 1,
    },
    paper: {
      margin: "5px",
      padding: "20px",
      textAlign: "center",
      fontSize: 20,
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    paperbottom: {
      padding: "40px",
      marginBottom: "80px",
      textAlign: "center",
      fontSize: 20,
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  })
);

export default Index;
