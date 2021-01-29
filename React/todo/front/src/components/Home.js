import { Grid } from "@material-ui/core";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import Title from "./Title";

const Home = (props) => {
  const moveTodashboard = () => {
    props.history.push("/dashboard");
  };

  return (
    <>
      <Title name="Vremya" />
      <Grid container justify="center">
        <Grid item xs={12} sm={10}>
          <Login moveTodashboard={moveTodashboard} />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Registration moveTodashboard={moveTodashboard} />
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
