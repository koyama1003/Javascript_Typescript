import React, { useState, useEffect, useContext } from "react";
import { NAVIGATION } from "../actions";
import AppContext from "../contexts/AppContext";
import { Button, Zoom } from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ListIcon from "@material-ui/icons/List";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import Todos from "./Todos";
import Todo from "./Todo";
import History from "./History";
const Dashboard = () => {
  const { classes, state, dispatch, loggedInStatus } = useContext(AppContext);
  //Change expression depending on navigation bar
  const Navigation = () => {
    switch (state.navigations) {
      case 1:
        return <Todo />;
      case 2:
        return <History />;
      default:
        return <Todos />;
    }
  };
  //Handle navigation bar change
  const navChange = (e, nav) => {
    e.preventDefault();
    dispatch({ type: NAVIGATION, nav });
  };
  //Zoom animation
  const [zoom, setZoom] = useState(false);
  //Change status zoom
  const handleChange = () => {
    setZoom((prev) => !prev);
  };
  useEffect(handleChange, []);
  if (loggedInStatus === "Please Login") {
    return (
      <div>
        <h2> {loggedInStatus}</h2>
        <Button href="/" variant="outlined">
          TOP
        </Button>
      </div>
    );
  } else {
    return (
      <>
        {Navigation()}
        <Zoom in={zoom} style={{ transitionDelay: zoom ? "500ms" : "0ms" }}>
          <BottomNavigation
            value={state.navigations}
            onChange={navChange}
            showLabels
            className={classes.bottomNav}
          >
            <BottomNavigationAction label="Todos" icon={<ListIcon />} />
            <BottomNavigationAction
              label="New Todo"
              icon={<AddBoxOutlinedIcon />}
            />
            <BottomNavigationAction label="History" icon={<ScheduleIcon />} />
          </BottomNavigation>
        </Zoom>
      </>
    );
  }
};
export default Dashboard;
