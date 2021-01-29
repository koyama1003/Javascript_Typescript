import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import axios from "axios";
import moment from "moment";
import {
  Button,
  Paper,
  Slide,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;
  //Handle table pagination
  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: theme.spacing(2.5) }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};
const Row = (props) => {
  //Table Row
  const { classes, indexTodos, today } = useContext(AppContext);
  const row = props.row;
  let rowName;
  if (props.index % 2 !== 0) {
    rowName = classes.oddRow;
  }
  //Title will be omitted if longer than 10 letters.
  const displayTitle = () => {
    if (row.Title && row.Title.length >= 10) {
      return row.Title.slice(0, 9) + "...";
    } else {
      return row.Title;
    }
  };
  //Judge todo data status "expired" or "yet"
  const todoStatus = () => {
    if (moment(row.Deadline).diff(moment(today), true) < 0) {
      return "expired";
    } else {
      return "yet";
    }
  };
  //Change todo data if its deadline expired.
  const statusChange = () => {
    axios
      .put(
        `http://localhost:3001/todos/${row.id}`,
        {
          todo: {
            status: todoStatus(),
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        indexTodos();
      });
  };
  return (
    <>
      <TableRow className={rowName} hover>
        <TableCell align="left">{displayTitle()}</TableCell>
        <TableCell align="left">
          {moment(row.Deadline).format("YYYY/MM/DD HH:mm")}
        </TableCell>
        <TableCell align="left">
          <Button onClick={statusChange} variant="outlined">
            <ArrowBackIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

const HistoryTable = () => {
  //Table head
  const { todos, classes } = useContext(AppContext);
  //Slide animation
  const [slide, setSlide] = useState(false);
  //Handle pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //Todo data with status "done"
  const doneTodos = todos.filter((todos) => todos.status === "done");

  //Store table rows data
  const rows = doneTodos.map((todo) => ({
    id: todo.id,
    Title: todo.title,
    Body: todo.body,
    Tags: todo.tags.map((tag) => {
      return { id: tag.id, name: tag.name, color: tag.color };
    }),
    Deadline: todo.deadline,
    Comment: todo.comment,
    Updated: todo.updated_at,
  }));

  //Change slide status
  useEffect(() => {
    setSlide(true);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography
        className={classes.typography}
        variant="h4"
        style={{ textAlign: "center" }}
      >
        Done
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <Slide direction="left" in={slide} mountOnEnter unmountOnExit>
            <TableHead
              style={{
                background:
                  "linear-gradient(30deg,rgba(255, 99, 132, 0.5) 30%,   rgba(54, 162, 235, 0.4) 60%)",
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              }}
            >
              <TableRow>
                <TableCell style={{ color: "white" }} align="left">
                  Title
                </TableCell>
                <TableCell style={{ color: "white" }} align="left">
                  Deadline
                </TableCell>
                <TableCell style={{ color: "white" }} align="left">
                  UnDone
                </TableCell>
              </TableRow>
            </TableHead>
          </Slide>
          <Slide direction="right" in={slide} mountOnEnter unmountOnExit>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, index) => (
                <Row key={index} row={row} index={index} />
              ))}
            </TableBody>
          </Slide>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[{}]}
                colSpan={2}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
export default HistoryTable;
