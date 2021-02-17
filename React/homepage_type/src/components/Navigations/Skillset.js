import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { Slide, Grid, Paper } from "@material-ui/core";
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

const Skillset = () => {
  const { classes } = useContext(AppContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const Slideup = () => {
        setChecked(true);
      };
      Slideup();
    }
    return () => (mounted = false);
  }, []);
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
export default Skillset;
