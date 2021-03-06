import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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
import useAnimation from "../../hooks/useAnimation";
import useGit from "../../hooks/useGit";

interface Props {
  name: string;
}

const Git: React.VFC<Partial<Props>> = ({ name }) => {
  const classes = useStyles();
  const { git } = useGit();
  const [checked, setChecked] = useState(false);
  useAnimation(setChecked);

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
            Latest {name} Change
          </Typography>
          {git?.map((item) => (
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    smallAvatar: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      color: "transparent",
      objectFit: "cover",
      textAlign: "center",
      borderRadius: "50%",
    },
  })
);

export default Git;
