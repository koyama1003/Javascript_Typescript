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

const JishoResult: React.FC = () => {
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
          {result.phrase[0]
            ? result.phrase.map((phr, i: number) => {
                if (i < 4) {
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
                                {phr.japanese.map((jp, i: number) =>
                                  jp.word ? `${jp.word} ` : `${jp.reading} `
                                )}
                              </Typography>
                              <Typography
                                className={classes.english}
                                variant="body1"
                              >
                                {phr.senses.map((def, i: number) =>
                                  def.english_definitions.map(
                                    (en, j: number) => (
                                      <span className={classes.span} key={j}>
                                        ・
                                        {en.charAt(0).toUpperCase() +
                                          en.slice(1)}
                                      </span>
                                    )
                                  )
                                )}
                              </Typography>
                            </span>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  );
                } else if (i === 4) {
                  return (
                    <div key={i}>
                      <ListItem
                        button
                        alignItems="flex-start"
                        disableGutters
                        onClick={handleCollapseClick}
                      >
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
                                {phr.japanese.map((jp, i: number) =>
                                  jp.word ? `${jp.word} ` : `${jp.reading} `
                                )}
                              </Typography>
                              <Typography
                                className={classes.english}
                                variant="body1"
                              >
                                {phr.senses.map((def, i: number) =>
                                  def.english_definitions.map(
                                    (en, j: number) => (
                                      <span className={classes.span} key={j}>
                                        ・
                                        {en.charAt(0).toUpperCase() +
                                          en.slice(1)}
                                      </span>
                                    )
                                  )
                                )}
                              </Typography>
                              {collapse ? null : (
                                <>
                                  <ExpandMore />
                                  Show More
                                </>
                              )}
                            </span>
                          }
                        />
                      </ListItem>
                    </div>
                  );
                } else {
                  return null;
                }
              })
            : null}
        </List>
        <Collapse in={collapse} timeout="auto" unmountOnExit>
          <List className={classes.list}>
            {result.phrase[0]
              ? result.phrase.map((phr, i: number) => {
                  if (i > 4) {
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
                                  {phr.japanese.map((jp, i: number) =>
                                    jp.word ? `${jp.word} ` : `${jp.reading} `
                                  )}
                                </Typography>
                                <Typography
                                  className={classes.english}
                                  variant="body1"
                                >
                                  {phr.senses.map((def, i: number) =>
                                    def.english_definitions.map(
                                      (en, j: number) => (
                                        <span className={classes.span} key={j}>
                                          ・
                                          {en.charAt(0).toUpperCase() +
                                            en.slice(1)}
                                        </span>
                                      )
                                    )
                                  )}
                                </Typography>
                              </span>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                    );
                  } else {
                    return null;
                  }
                })
              : null}
          </List>
        </Collapse>
      </Grid>
      <Grid item xs={12} sm={6}>
        <List className={classes.list}>
          {result.example[0]
            ? result.example.map((exm, i: number) => {
                if (i < 4) {
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
                                gutterBottom
                              >
                                {exm.kanji}
                              </Typography>
                              <Typography
                                className={classes.english}
                                variant="body1"
                              >
                                {exm.english}
                              </Typography>
                            </span>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  );
                } else if (i === 4) {
                  return (
                    <div key={i}>
                      <ListItem
                        button
                        alignItems="flex-start"
                        disableGutters
                        onClick={handleCollapseExampleClick}
                      >
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
                                {exm.kanji}
                              </Typography>
                              <Typography
                                className={classes.english}
                                variant="body1"
                              >
                                {exm.english}
                              </Typography>
                              {collapseExample ? null : (
                                <>
                                  <ExpandMore />
                                  Show More
                                </>
                              )}
                            </span>
                          }
                        />
                      </ListItem>
                    </div>
                  );
                } else {
                  return null;
                }
              })
            : null}
        </List>
        <Collapse in={collapseExample} timeout="auto" unmountOnExit>
          <List className={classes.list}>
            {result.phrase[0]
              ? result.example.map((exm, i: number) => {
                  if (i > 4) {
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
                                  {exm.kanji}
                                </Typography>
                                <Typography
                                  className={classes.english}
                                  variant="body1"
                                >
                                  {exm.english}
                                </Typography>
                              </span>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                    );
                  } else {
                    return null;
                  }
                })
              : null}
          </List>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default JishoResult;
