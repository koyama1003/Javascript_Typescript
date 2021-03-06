import React, { useState, useEffect, useContext, useCallback } from "react";
import AppContext from "../../contexts/AppContext";
import axios from "axios";
import moment from "moment";
import {
  Fade,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Zoom,
} from "@material-ui/core";
import CallMergeTwoToneIcon from "@material-ui/icons/CallMergeTwoTone";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

interface Props {
  name: string;
}
interface Response {
  id: number;
  repo: { name: string };
  created_at: Date;
  actor: { avatar_url: string };
  type: string;
  payload: { commits: { message: string }[] };
}

const Git: React.VFC<Props> = (props: Props) => {
  const { classes } = useContext(AppContext);
  const [data, setData] = useState([]);
  const fetchData = useCallback(async () => {
    const result = await axios(
      "https://api.github.com/users/koyama1003/events"
    );
    setData(result.data.slice(0, 5));
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      handleChange();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Fade in={checked}>
        <Grid container justify="center" style={{ paddingBottom: 10 }}>
          <Grid item xs={12} sm={8}>
            <img
              src="https://github-readme-stats.vercel.app/api?username=koyama1003&show_icons=true&theme=vue"
              alt="Github stats"
              style={{ maxWidth: "100%" }}
            />
          </Grid>
        </Grid>
      </Fade>
      <Zoom in={checked}>
        <div>
          <Typography variant="h4" gutterBottom>
            Latest {props.name} Change
          </Typography>
          {data.map((item: Response) => (
            <Table size="small" key={item.id}>
              <TableHead>
                <TableRow hover={true}>
                  <TableCell align="center">
                    <a
                      href={"https://github.com/" + item.repo?.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ paddingRight: 5 }}
                    >
                      <img
                        src={item.actor?.avatar_url}
                        alt="Github Avatar"
                        className={classes.smallAvatar}
                      />
                      {item.repo.name}
                    </a>
                    {moment(item.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover={true}>
                  <TableCell align="center">
                    {item.payload?.commits ? (
                      <TrendingUpIcon />
                    ) : (
                      <CallMergeTwoToneIcon />
                    )}
                    "
                    {item.payload.commits
                      ? item.payload.commits[0].message
                      : item.type}
                    "
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </div>
      </Zoom>
    </>
  );
};

export default Git;
