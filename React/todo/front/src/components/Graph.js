import React, { useState, useEffect, useContext } from "react";
import AppContext from "../contexts/AppContext";
import { Doughnut, Pie } from "react-chartjs-2";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";

const Graph = () => {
  const { classes, todos } = useContext(AppContext);
  //Pie chart data
  const [dataPie, setDataPie] = useState({
    labels: ["Expired", "Done", "Undone"],
    datasets: [
      {
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(60, 179, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(60, 179, 86, 1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(60, 179, 86, 1)",
        ],
      },
    ],
  });
  //Doughnut chart data
  const [dataDoughnut, setDataDoughnut] = useState({
    labels: ["Future", "Today", 1, 2, 3, "More"],
    datasets: [
      {
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 0, 70, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(0, 65, 80, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 0, 70, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(0, 65, 80, 1)",
        ],
        hoverBackgroundColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 0, 70, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(0, 65, 80, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  //Get Todos data and reflect in graphs
  useEffect(() => {
    const today = new Date();
    const getTodoStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/todos", {
          withCredentials: true,
        });

        if (response.data[0]) {
          const statusArray = response.data.map((result) => result.status);
          const createDataArray = response.data.map((result) =>
            moment(today).diff(moment(result.startdate), "d", true)
          );

          //Pie chart data
          setDataPie({
            datasets: [
              {
                data: [
                  statusArray.filter((status) => status === "expired").length,
                  statusArray.filter((status) => status === "done").length,
                  statusArray.filter((status) => status === "yet").length,
                ],
              },
            ],
          });
          //Doughnut chart data
          setDataDoughnut({
            datasets: [
              {
                data: [
                  createDataArray.filter((elapsed) => elapsed < 0).length,
                  createDataArray.filter(
                    (elapsed) => elapsed >= 0 && elapsed < 1
                  ).length,
                  createDataArray.filter(
                    (elapsed) => elapsed >= 1 && elapsed < 2
                  ).length,
                  createDataArray.filter(
                    (elapsed) => elapsed >= 2 && elapsed < 3
                  ).length,
                  createDataArray.filter(
                    (elapsed) => elapsed >= 3 && elapsed < 4
                  ).length,
                  createDataArray.filter((elapsed) => elapsed >= 4).length,
                ],
              },
            ],
          });
        }
      } catch (error) {
        const { status, statusText } = error.response;
        console.log(`Error! HTTP Status: ${status} ${statusText}`);
      }
    };
    //If changed todos status,reflect in charts
    getTodoStatus();
  }, [todos]);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={6}>
        <Typography
          className={classes.typography}
          variant="h5"
          style={{ textAlign: "center" }}
        >
          Working Efficiency
        </Typography>
        <Pie data={dataPie} />
      </Grid>
      <Grid item xs={6}>
        <Typography
          className={classes.typography}
          variant="h5"
          style={{ textAlign: "center", paddingTop: 20 }}
        >
          Elapsed Days From Start Date
        </Typography>
        <Doughnut data={dataDoughnut} />
      </Grid>
    </Grid>
  );
};
export default Graph;
