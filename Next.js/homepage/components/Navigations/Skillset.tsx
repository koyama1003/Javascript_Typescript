import React, { useState } from "react";
import { Slide, Grid, Paper } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAws,
  faRust,
  faJsSquare,
  faPython,
  faReact,
  faCreativeCommonsSa,
  faDocker,
  faStumbleupon,
} from "@fortawesome/free-brands-svg-icons";
import useAnimation from "../../hooks/useAnimation";

const Skillset: React.VFC = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useAnimation(setChecked);
  const skills = [
    {
      title: "Javascript",
      detail: "ES2019の変更点を把握。async,awaitを用いて非同期処理を実装できる",
      icon: faJsSquare,
    },
    {
      title: "Ruby",
      detail: "Railsを用いてCRUDアプリを作成できる",
      icon: faRust,
    },
    {
      title: "Python",
      detail: "flask、pymysql(又はsqlalchemy)を用いてCRUDアプリを作成できる",
      icon: faPython,
    },
    {
      title: "React",
      detail: "APIモードのRails,Firebaseと連携しSPAを作成できる",
      icon: faReact,
    },
    {
      title: "Redux",
      detail:
        "Redux-Thunk等middleware,Redux tool kitを用いてアプリを作成できる",
      icon: faCreativeCommonsSa,
    },

    {
      title: "AWS",
      detail:
        "EC2だけではなくECS,Fargateをつかってサービスをデプロイでき、CodePipelineを用いたCI/CDを構築できる。",
      icon: faAws,
    },
    {
      title: "Docker",
      detail:
        "Dockerfileやdocker-compose.ymlを理解、docker composeコマンドにてECS Deployができる",
      icon: faDocker,
    },
    {
      title: "Travis CI",
      detail:
        ".travis.ymlを作成し、Githubにpush時にテストを実行し、herokuやawsへ自動Deployができる",
      icon: faStumbleupon,
    },
  ];

  return (
    <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
      <Grid container justify="center">
        <Grid container spacing={1}>
          {skills.map((skill, index) => (
            <Grid item sm={6} xs={12} key={index}>
              <Paper className={classes.paper} elevation={1}>
                <div className={classes.title}>{skill.title}</div>
                <FontAwesomeIcon icon={skill.icon} />
                <br />
                <div className={classes.text}>{skill.detail}</div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Slide>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
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
    title: {
      fontSize: 18,
      fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
    },
    text: {
      fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
      fontSize: 14,
    },
  })
);
export default React.memo(Skillset);
