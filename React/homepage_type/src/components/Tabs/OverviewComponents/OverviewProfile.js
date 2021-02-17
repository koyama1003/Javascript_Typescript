import React, { useContext } from "react";
import AppContext from "../../../contexts/AppContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

const Overview_Profile = () => {
  const { classes } = useContext(AppContext);
  return (
    <div className={classes.childContainer}>
      <h2>PROFILE</h2>
      <TableContainer>
        <Table aria-label="profile table">
          <TableBody>
            <TableRow>
              <TableCell>Age</TableCell>
              <TableCell>26(1994.10.3)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Academic Background</TableCell>
              <TableCell>Sophia University/ДВФУ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>GitHub</TableCell>
              <TableCell>
                <a
                  href="https://github.com/koyama1003"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  koyama1003
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Foreign Languages</TableCell>
              <TableCell>TOEIC:835 ТРКИ:Ⅱ</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Overview_Profile;
