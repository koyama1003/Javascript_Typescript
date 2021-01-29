import React from "react";
import { Grid } from "@material-ui/core";
import HistoryTable from "./HistoryTable";
import Graph from "./Graph";
const History = () => {
  return (
    <Grid container spacing={2} justify="center" style={{ paddingBottom: 60 }}>
      <Grid item xs={12}>
        <Graph />
      </Grid>
      <Grid item xs={12} sm={10}>
        <HistoryTable />
      </Grid>
    </Grid>
  );
};
export default History;
