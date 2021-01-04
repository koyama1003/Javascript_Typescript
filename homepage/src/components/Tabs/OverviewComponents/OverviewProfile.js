import React, { useContext } from "react";
import AppContext from "../../../contexts/AppContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core";

const Overview_Profile = () => {
  const { classes } = useContext(AppContext);
  return (
    <>
      <h2>PROFILE</h2>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="profile table">
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>古山 蒼二郎 (Sojiro Koyama)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Age</TableCell>
              <TableCell>26(1994.10.3)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Academic Background</TableCell>
              <TableCell>Sophia University</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>GitHub</TableCell>
              <TableCell>
                <a href="https://github.com/koyama1003">koyama1003</a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Foreign Languages</TableCell>
              <TableCell>TOEIC:835 ТРКИ:Ⅱ</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Overview_Profile;
