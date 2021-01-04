import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import AppContext from "../contexts/AppContext";
import { PAGINATION } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography, Slide } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles({
  card: { marginBottom: "20px", background: "#f5f5f5" },
  text: {
    fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
    fontSize: 14,
  },

  title: {
    fontSize: 18,
    fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
  },
});

const Profile = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const Slideup = () => {
    setChecked(true);
  };
  const pageChange = (e: ChangeEvent<unknown>, page) => {
    e.preventDefault();
    dispatch({ type: PAGINATION, page });
  };
  let text;
  switch (state.paginations) {
    case 2:
      text =
        "2020年9月 PythonとFlaskでwebアプリを作ったがDB関連の知識が足りないと痛感。ActiveRecordで比較的DBを簡単に管理できると目にし、Ruby on Railsを学び始める。";
      break;
    case 3:
      text =
        "2020年10月　Ruby on Railsとdeviseでログイン機能付きCRUDアプリを作るも、UI/UXが貧相でFrontend技術も必要だと認識、Reactを学び始める";
      break;
    case 4:
      text =
        "2020年11月　React HooksとReduxの学習を一通り終わらせ、本格的にポートフォリオ作成にとりかかる";
      break;
    case 5:
      text =
        "2020年現在、自分の作品を公開できるようDocker,AWS,Travis CIを学習中。併せてJest,Typescriptも学習中";
      break;
    default:
      text =
        "2020年7月　Pythonを学び始める。スクレイピングで本日仲値を取得、計算結果を転記したメールを上司へ自動送付するプログラムをbatファイル化し運用していた。";
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      Slideup();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
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
              <Typography className={classes.text} variant="body2">
                1994:熊本県で生まれる
                <br />
                2013:長崎県私立青雲高等学校卒業
                <br />
                2014:上智大学外国語学部ロシア語学科入学 <br />
                2017:一年間極東連邦大学へ私費留学
                <br />
                2019:上智大学外国語学部ロシア語学科卒業(一年間ロシアへ留学)
                <br />
                2020:現在都内専門商社に営業として勤務中
                <br />
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                プログラミングに興味を持ったきっかけ
              </Typography>
              <Typography variant="body1" className={classes.text}>
                2019年4月より営業として勤務しておりますが、
                営業以外の雑務にかける時間を短縮し、効率的に成果を上げるには
                どうすればよいのかを考えておりました。
                <br />
                特に毎日の輸入品価格設定業務は計算方法固定の完全なルーティン業務でした。
                本質的でない業務を自動化するために2020年7月よりPythonを学び始めました。
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
                性格、長所
              </Typography>
              <Typography variant="body1" className={classes.text}>
                コツコツと努力を積み上げ、昨日できなかったことをできるようになることが大好きな性格で、日々の努力を高い水準で結果につなげられる長所があります。
                具体的には、私は大学で4年間ロシア語を履修し、「地獄のロシア」と呼ばれる留年率が他学科よりもかなり高い学科に所属していました。
                テスト前は毎日大学図書館に一日中いましたが、どんどんレベルアップできている実感が楽しく、最後まで充実した学生生活を送ることができました。
                努力が高じて、2018年の外務省専門職員採用試験では全国のロシア語受験者でただ一人だけ最終面接に進ませていただいた経験があります。
                こういった性格のためプログラミング学習も毎日楽しみながら継続しております。
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
                  {state.paginations}.{text}
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
                2020年12月現在、都内の専門商社に営業職として勤務しており、数千万円規模の案件に複数ジョインしております。
                <br />
                ファーストキャリアに営業職を選択した理由としては、再現性の高い成功経験と専門性が得られる俗にいう"つぶしの利く"職種だと考えたからです。
                <br />
                しかし実際に働いてみると、自分の想像していた働き方ではなく、長くは営業としてのキャリアを積むことはできないということがわかりました。
                <br />
                加えて、年末で参加している大きな案件が一通り終わって落ち着くこともあり、このタイミングでエンジニア転職への挑戦を決意いたしました。
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Slide>
  );
};
export default Profile;
