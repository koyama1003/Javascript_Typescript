import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography, Slide } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Layout from "../components/Layouts/Layout";
import useAnimation from "../hooks/useAnimation";
import { NextPage } from "next";
import {
  changePage,
  paginationStates,
} from "../features/pagination/paginationSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

const Profile: NextPage = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const page = useAppSelector(paginationStates);
  const pageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    e.preventDefault();
    dispatch(changePage(Number(page) || 0));
  };
  useAnimation(setChecked);

  return (
    <Layout title="Profile" subTitle="My Profile">
      <Slide
        direction="left"
        in={checked}
        data-testid="ProfileAll"
        mountOnEnter
        unmountOnExit
      >
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12} sm={10}>
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  経歴
                </Typography>
                <Typography
                  className={classes.text}
                  variant="body2"
                  gutterBottom
                >
                  2013年3月:長崎県私立青雲高等学校 卒業
                  <br />
                  2014年3月:上智大学外国語学部ロシア語学科 入学 <br />
                  2017年2月より:一年間極東連邦大学へ私費留学
                  <br />
                  2019年3月:上智大学外国語学部ロシア語学科 卒業
                  <br />
                  2019年4月:都内専門商社に就職。営業部へ配属、新規品提案、アフターセールス等担当
                  <br />
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  長所、自己PR
                </Typography>
                <Typography variant="body1" className={classes.text}>
                  コツコツと努力を積み上げ、昨日できなかったことをできるようになることが大好きな性格で、日々の努力を高い水準で結果につなげられる長所があります。
                  大学生の頃はよく図書館で一日中ロシア語の学習をしておりましたが、どんどんレベルアップできている実感が楽しく最後まで充実した学生生活を送ることができました。
                  努力が高じて、2018年の外務省専門職員採用試験では全国のロシア語受験者でただ一人だけ最終面接に進ませていただいた経験があります。
                  自走力、継続力、新しいことへの挑戦意欲の高さには自信があります。
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  学習の軌跡
                </Typography>
                <Typography
                  variant="body1"
                  component={"span"}
                  className={classes.text}
                >
                  <div>
                    {page.value}.{page.choiced}
                  </div>
                  <Pagination
                    data-testid="pagination"
                    onChange={pageChange}
                    count={5}
                    variant="outlined"
                    size="small"
                  />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  variant="body2"
                  gutterBottom
                >
                  なぜこのタイミングでエンジニアを志望したのか
                </Typography>
                <Typography variant="body1" className={classes.text}>
                  ファーストキャリアに営業職を選択した理由としては、主体的に考え行動することで顧客の有する課題を解決できる職業だと考えたからです。
                  しかし実際に働いてみると、やりがいも勿論あるものの、想像していた働き方とは若干異なり営業としてこのまま働き続けて本当に良いのかと疑問を持つことが増えてまいりました。
                  <br />
                  加えて、最初は業務効率化のために学んでいたプログラミングを更に深く学びたいと重い、又
                  年度末で参画している大規模なプロジェクトが一通り終わって落ち着くこともあり、このタイミングでエンジニア転職への挑戦を決意いたしました。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Slide>
    </Layout>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    card: { marginBottom: 5, background: "#f5f5f5" },
    text: {
      fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
      fontSize: 14,
    },

    title: {
      fontSize: 18,
      fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
    },
  })
);

export default Profile;
