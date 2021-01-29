import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { titleChange } from "../features/titleSlice";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import moment from "moment";
import History from "./History";
import { createStyles, Typography, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    typography: {
      fontFamily: "selif",
    },
  })
);

const Home: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [history, setHistory] = useState([
    {
      id: "",
      avatar: "",
      result: {},
      word: "",
      timestamp: {},
      username: "",
    },
  ]);
  useEffect(() => {
    setHistory([
      {
        id: "",
        avatar: "",
        result: {},
        word: "",
        timestamp: {},
        username: "",
      },
    ]);
    const unSub = db
      .collection("history")
      .where("username", "==", user.displayName)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setHistory(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            result: doc.data().result,
            word: doc.data().word,
            timestamp: doc.data().timestamp.toDate(),
            username: doc.data().username,
          }))
        )
      );

    return () => {
      unSub();
    };
  }, [user]);

  useEffect(() => {
    dispatch(titleChange("Slovari"));
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs>
        {user.uid ? (
          <>
            <Typography
              className={classes.typography}
              align="center"
              variant="body1"
              gutterBottom
            >
              Welcome Back! {user.displayName}
            </Typography>
            <Grid container justify="center">
              <Grid item xs={6} sm={3}>
                <Typography variant="h5" align="center">
                  History
                </Typography>
                {history[0]?.id &&
                  history.map((hs, index) => (
                    <History
                      key={index}
                      word={hs.word}
                      timestamp={moment(hs.timestamp).format(
                        "YYYY/MM/DD HH:mm"
                      )}
                    />
                  ))}
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h5" align="center">
                  Archivement
                </Typography>
                {history[0]?.id &&
                  history.map((hs, index) => (
                    <History
                      key={index}
                      word={hs.word}
                      timestamp={moment(hs.timestamp).format(
                        "YYYY/MM/DD HH:mm"
                      )}
                    />
                  ))}
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography
            className={classes.typography}
            align="center"
            variant="h4"
          >
            - Sorry,You are not signed in
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
