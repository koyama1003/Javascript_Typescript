import { Typography, Button, Grid, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LockOpenIcon from "@material-ui/icons/LockOpen";
const Login = () => {
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={10}>
        <Typography color="textSecondary" gutterBottom align="center">
          <form noValidate autoComplete="off">
            <TextField id="standard-basic" label="UserID" />
            <br />
            <TextField id="standard-basic" label="Password" />
          </form>
          <Button
            size="small"
            variant="outlined"
            style={{ margin: "10px" }}
            color="inherit"
          >
            <AddIcon />
            Login
          </Button>
          <br />
          <Button variant="outlined" color="inherit" size="small">
            <LockOpenIcon />
            Sign Up
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
};
export default Login;
