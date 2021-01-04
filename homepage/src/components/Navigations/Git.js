import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Zoom,
} from "@material-ui/core";
import CallMergeTwoToneIcon from "@material-ui/icons/CallMergeTwoTone";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

const Git = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const fetchData = async () => {
        const result = await axios(
          "https://api.github.com/users/koyama1003/events"
        );
        setData(result.data.slice(0, 5));
      };
      fetchData();
    }
    return () => (mounted = false);
  }, []);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      handleChange();
    }
    return () => (mounted = false);
  }, []);

  return (
    <Zoom in={checked}>
      <div>
        Latest {props.name} Change
        <br />
        {data.map((item) => (
          <Table size="small" key={item.id}>
            <TableHead>
              <TableRow hover={true}>
                <TableCell align="center">
                  <a
                    href={"https://github.com/" + item.repo.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.repo.name}
                  </a>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover={true}>
                <TableCell align="center">
                  {moment(item.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                  <br />
                  {item.payload.commits ? (
                    <TrendingUpIcon />
                  ) : (
                    <CallMergeTwoToneIcon />
                  )}
                  "
                  {item.payload.commits
                    ? item.payload.commits[0].message
                    : item.type}{" "}
                  "
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </div>
    </Zoom>
  );
};

export default Git;
