import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectWord } from "../features/wordSlice";

import {
  Avatar,
  Collapse,
  createStyles,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) =>
  createStyles({
    english: {
      fontFamily: "times new roman",
    },
    inline: {
      display: "inline",
    },
    list: {
      maxWidth: "80ch",
    },
    smallAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      opacity: "0.7",
    },
    span: {
      paddingRight: "5px",
    },
    japanese: {
      fontFamily: `"klee","Yu Gothic","KanjiStrokeOrders",Noto Sans CJK JP`,
    },
  })
);

const ReversoResult: React.FC = () => {
  const result = useSelector(selectWord);
  const classes = useStyles();

  const colorCreate = () => {
    let randomColor = "#";
    for (let i = 0; i < 6; i++) {
      randomColor += ((16 * Math.random()) | 0).toString(16);
    }
    return randomColor;
  };

  const [collapse, setCollapse] = useState(false);
  const [collapseExample, setCollapseExample] = useState(false);
  useEffect(() => {
    return setCollapse(false);
  }, [result]);
  const handleCollapseClick = () => {
    setCollapse(!collapse);
  };

  const handleCollapseExampleClick = () => {
    setCollapseExample(!collapseExample);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <List className={classes.list}>
          {result.reverso.text !== ""
            ? result.reverso.translation.map((trs, i: number) => {
                return (
                  <div key={i}>
                    <ListItem alignItems="flex-start" disableGutters>
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          className={classes.smallAvatar}
                          style={{ background: colorCreate() }}
                        >
                          {i + 1}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <span key={i}>
                            <Typography
                              className={classes.japanese}
                              variant="h6"
                            >
                              {trs}
                            </Typography>
                          </span>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                );
              })
            : {}}
        </List>
      </Grid>
    </Grid>
  );
};

export default ReversoResult;
