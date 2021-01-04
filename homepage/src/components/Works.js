import React, { useState, useEffect, useContext } from "react";
import AppContext from "../contexts/AppContext";
import AWS from "./images/AWS_Flow.png";
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
const Works = () => {
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
  const homepageSkills = [
    ["Version Control", "CodeCommit"],
    ["CI/CD", "CodePipeline"],
    ["Infrastructure", "Amazon ECS FARGATE"],
    ["FrontEnd", "React 17.0.1, Redux 4.0.5"],
    ["Test", "React Test Library + Jest"],
  ];
  const learningSkills = [
    [
      "Redux Tool kit",
      "connect()等を使わず、可読性の高いコードでreduxを運用できるため",
      "createSlice,useSelector(),useDispatch()等基本的な機能を使いこなすことができる",
    ],
    [
      "FireBase",
      "認証機能の実装等にかかる手間を大幅に短縮できるため",
      "Googleアカウントログイン等のAuthentication機能の実装などが出来る",
    ],
    [
      "Webpack",
      "create-react-appに依存せずreactプロジェクトを作成するため",
      "webpack.config.jsを理解しプロジェクトごとにコンパイル設定を変更できる。",
    ],
    [
      "Typescript",
      "型制約によってエラーを未然に防ぎながら開発ができるため",
      "React Hooksと共に運用でき、class Components特有の機能についても使いこなすことができる",
    ],
  ];

  return (
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

        <Grid item xs={10} sm={10}>
          <Paper className={classes.paperWorks} elevation={3} square>
            <Typography
              className={classes.worksText}
              variant="body1"
              gutterBottom
            >
              GitHub+Travis Ci+DockerでTest後HerokuへDeployという構成でしたが、
              AWSの学習が一段落したためAWSへ移行。
              Travis.ciで実現していたCI&CD機能に加え、Test
              Report機能、及びBlue-Green Deployment機能を実装しました。
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={10} sm={7} style={{ textAlign: "center" }}>
          <Box border={1} borderColor="primary.main">
            <img src={AWS} alt="AWS Flow Chart" className={classes.awsImage} />
          </Box>
        </Grid>
        <Grid item xs={10} sm={4}>
          <Paper className={classes.paperWorks} elevation={3} square>
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
          <Paper className={classes.paperWorks} elevation={3}>
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
          <Paper className={classes.paperWorks} elevation={3} square>
            <Typography className={classes.worksText} variant="subtitle2">
              使用技術: Python 3.9.0, Flask 1.1.2, MySQL, SQLAlchemy
            </Typography>
          </Paper>

          <Paper className={classes.paperWorks} variant="outlined" square>
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
          <Paper className={classes.paperWorks} elevation={3}>
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
          <Paper className={classes.paperWorks} elevation={3} square>
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
          <Paper className={classes.paperWorks} variant="outlined">
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
          <Paper className={classes.paperWorks} elevation={2} square>
            <Typography className={classes.worksText} variant="subtitle1">
              テーブル正規化、N+1問題の回避等データベース構築に苦労しました。
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography className={classes.worksText} variant="body2">
            課題点:
          </Typography>
          <Paper className={classes.paperWorks} elevation={2} square>
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
            Learning&Progress 2021年1月2日現在
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography
            align="center"
            className={classes.worksText}
            variant="subtitle2"
          >
            現在以下の技術を学びながら新しいReactアプリの開発を進めております。
          </Typography>
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
                <Typography
                  align="center"
                  paragraph
                  className={classes.worksText}
                  variant="subtitle2"
                  color="secondary"
                >
                  {skill[2]}
                </Typography>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </Slide>
  );
};
export default Works;
