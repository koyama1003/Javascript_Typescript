import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Box, Grid, Paper, Slide, Typography } from "@material-ui/core";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreativeCommonsShare,
  faAws,
  faJsSquare,
  faPython,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Layout from "../components/Layouts/Layout";
import useAnimation from "../hooks/useAnimation";
import { NextPage } from "next";

const Works: NextPage = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useAnimation(setChecked);

  const homepageSkills = [
    ["Version Control", "CodeCommit"],
    ["CI/CD", "Travis.ci/CodePipeline"],
    ["Infrastructure", "Amazon ECS FARGATE"],
    ["FrontEnd", "React 17.0.1, Redux 4.0.5"],
    ["Test", "React Testing Library + Jest"],
  ];
  const learningSkills = [
    [
      "Redux Tool kit",
      "検索結果、検索エンジン選択等ブラウザで保持する状態の管理",
    ],
    ["FireBase", "Googleアカウントによるログイン機能,DBを実装"],
    ["Webpack", "create-react-appに依存せずプロジェクトに最適なbundleを実現"],
    [
      "Typescript",
      "APIの返り値等をinterfaceで事前に型定義、型チェックによってエラーを未然に防ぎながら開発。",
    ],
  ];

  return (
    <Layout title="works" subTitle="My Works">
      <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12} sm={10}>
            <Typography
              align="center"
              className={classes.worksText}
              variant="h4"
              gutterBottom
            >
              <FontAwesomeIcon icon={faAws} />
              This Homepage
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Paper className={classes.worksPaper} elevation={3} square>
              <Typography
                className={classes.worksText}
                align="center"
                variant="subtitle2"
              >
                {homepageSkills.map((skill, index) => {
                  return (
                    <div key={index}>
                      <span style={{ fontWeight: 600 }}>{skill[0]}</span>:
                      {skill[1]}
                    </div>
                  );
                })}
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            xs={10}
            sm={10}
            style={{ textAlign: "center", marginBottom: 20 }}
          >
            <Box border={1} borderColor="primary.main">
              <Paper>
                <Image
                  src="/Aws.png"
                  alt="AWS Flow Chart"
                  width={800}
                  height={500}
                />
                <br />
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={10} sm={10}>
            <Typography
              align="center"
              gutterBottom
              className={classes.worksText}
              variant="h4"
            >
              <FontAwesomeIcon icon={faPython} /> Ankoweb
            </Typography>
          </Grid>
          <Grid item xs={10} sm={5}>
            <Paper className={classes.worksPaper} elevation={3}>
              <div className={classes.playerWrapper}>
                <ReactPlayer
                  loop
                  muted
                  className={classes.player}
                  url="videos/Ankoweb.mp4"
                  playing
                  width="100%"
                  height="100%"
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.worksPaper} elevation={3} square>
              <Typography className={classes.worksText} variant="subtitle2">
                使用技術: Python 3.9.0, Flask 1.1.2, MySQL, SQLAlchemy
              </Typography>
            </Paper>

            <Paper className={classes.worksPaper} variant="outlined" square>
              <Typography className={classes.worksText} variant="body1">
                英和辞典サイトなどの検索結果を自動でフラッシュカードに記載するサービスがあったら、
                暗記学習がスムーズにいくのではないかと考え作成しました。
                <a
                  href="https://github.com/koyama1003/Python/tree/master/Ankoweb"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.worksText}
                >
                  GitHub
                </a>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography
              align="center"
              gutterBottom
              className={classes.worksText}
              variant="h4"
            >
              <FontAwesomeIcon icon={faJsSquare} />
              <FontAwesomeIcon icon={faReact} />
              Todo App
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.worksPaper} elevation={3}>
              <div className={classes.playerWrapper}>
                <ReactPlayer
                  loop
                  muted
                  className={classes.player}
                  url="videos/Todo.mp4"
                  playing
                  width="100%"
                  height="100%"
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.worksPaper} elevation={3} square>
              <Typography
                component={"span"}
                className={classes.worksText}
                variant="subtitle2"
              >
                使用技術: React 17.0.1, Redux 4.0.5, Ruby on Rails(API) 6.0.3.4,
                Chart.js 2.9.4
              </Typography>
            </Paper>
            <br />
            <Paper className={classes.worksPaper} variant="outlined">
              <Typography className={classes.worksText} variant="body1">
                React+Reduxで作成したToDoアプリです。
                <br /> バックエンド側はRuby on
                RailsのAPIモードにて実装し、ログイン機能も1から作成してみました。
                <a
                  href="https://github.com/koyama1003/ToDo"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.worksText}
                >
                  GitHub
                </a>
              </Typography>
            </Paper>
          </Grid>
          <br />
          <Grid item xs={12} sm={5}>
            <Typography className={classes.worksText} variant="body2">
              苦労した点:
            </Typography>
            <Paper className={classes.worksPaper} elevation={2} square>
              <Typography className={classes.worksText} variant="subtitle1">
                テーブル正規化、N+1問題の回避等データベース構築に苦労しました。
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography className={classes.worksText} variant="body2">
              課題点:
            </Typography>
            <Paper className={classes.worksPaper} elevation={2} square>
              <Typography className={classes.worksText} variant="body2">
                ・表示が重い。
                <br />
                ・テストを書ききれていない。
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography
              align="center"
              gutterBottom
              className={classes.worksText}
              variant="h5"
            >
              <FontAwesomeIcon icon={faCreativeCommonsShare} />
              Learning&Progress 2021.02.18
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper elevation={3} style={{ padding: 10 }}>
              <Typography
                align="center"
                className={classes.worksText}
                variant="body1"
                gutterBottom
              >
                辞典アプリの開発を進めております。調べた単語をカード化し保存、復習できる機能を
                再度実装し、更にU検索数やカード数で競うランキング機能や、Mypageにて調べた単語の
                ヒストリーを表示できる機能を実装していきたいです。
                <br />
                学生時代に言語の効率的な暗記学習法に悩んでいたので、同じ悩みを持つ方たちへの解決策となるサービスにしたいです。
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={10} sm={5}>
            <Paper className={classes.worksPaper} elevation={3}>
              <div className={classes.playerWrapper}>
                <ReactPlayer
                  loop
                  muted
                  className={classes.player}
                  url="videos/Slovari.mp4"
                  playing
                  width="100%"
                  height="100%"
                />
              </div>
            </Paper>
          </Grid>

          <Grid item xs={10} sm={7}>
            <Paper className={classes.worksPaper} elevation={3} square>
              <Typography
                className={classes.worksText}
                align="center"
                variant="h4"
              >
                使用技術
                {learningSkills.map((skill, index) => {
                  return (
                    <Paper key={index} variant="outlined" square>
                      <Typography
                        align="center"
                        gutterBottom
                        className={classes.worksText}
                        variant="h6"
                        color="primary"
                      >
                        <span style={{ fontWeight: 600 }}>{skill[0]}</span>
                      </Typography>
                      <Typography
                        align="center"
                        gutterBottom
                        className={classes.worksText}
                        variant="body2"
                      >
                        {skill[1]}
                      </Typography>
                    </Paper>
                  );
                })}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Slide>
    </Layout>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    awsImage: {
      maxWidth: "80%",
      paddingBottom: "40px",
      margin: 10,
    },
    player: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    playerWrapper: {
      position: "relative",
      paddingTop: "56.25%",
    },
    worksPaper: {
      border: "solid 1px",
      margin: "10px",
      padding: "10px",
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
    worksText: {
      fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
    },
  })
);

export default Works;
