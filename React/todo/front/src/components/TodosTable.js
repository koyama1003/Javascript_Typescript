import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import moment from "moment";
import axios from "axios";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Collapse,
  Fade,
  FormControlLabel,
  Modal,
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
  TextField,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CommentIcon from "@material-ui/icons/Comment";
import EditIcon from "@material-ui/icons/Edit";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

import EditTodo from "./EditTodo";

const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;
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
  const { classes, indexTodos, today } = useContext(AppContext);
  const row = props.row;
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const [updated, setUpdated] = useState(
    moment(row.updated_at).format("YYYY/MM/DD HH:mm")
  );
  const modalOpen = () => {
    setModal(true);
  };
  const modalClose = () => {
    setModal(false);
  };

  let rowName;
  if (props.index % 2 !== 0) {
    rowName = classes.oddRow;
  }

  const displayTitle = () => {
    if (row.Title && row.Title.length >= 10) {
      return row.Title.slice(0, 9) + "...";
    } else {
      return row.Title;
    }
  };
  const blackOreWhite = (hexcolor) => {
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);

    return (r * 299 + g * 587 + b * 114) / 1000 < 90 ? "white" : "black";
  };

  const left = () => {
    let leftDays;
    let leftHours;
    if (moment(row.Deadline).diff(moment(today), "h", true) > 24) {
      leftDays = Math.floor(
        moment(row.Deadline).diff(moment(today), "h", true) / 24
      );
      leftHours = Math.floor(
        moment(row.Deadline).diff(moment(today), "h", true) - leftDays * 24
      );

      return (
        <span>
          {leftDays}Days{leftHours}Hours
        </span>
      );
    } else if (
      0 < moment(row.Deadline).diff(moment(today), "h", true) &&
      moment(row.Deadline).diff(moment(today), "h", true) < 24
    ) {
      leftHours = Math.floor(
        moment(row.Deadline).diff(moment(today), "h", true)
      );

      return (
        <span style={{ color: "#dc143c", fontWeight: 200 }}>
          {leftHours}Hours
        </span>
      );
    } else {
      return <span style={{ color: "red", fontWeight: 600 }}>Expired</span>;
    }
  };
  const todoDelete = () => {
    const result = window.confirm(
      `Do you really want to delete ${row.Title}？`
    );
    if (result) {
      axios.delete(`http://localhost:3001/todos/${row.id}`).then((response) => {
        indexTodos();
      });
    }
  };
  const editComment = () => {
    axios.get(`http://localhost:3001/todos/${row.id}/edit`);
  };
  const addComment = () => {
    axios
      .put(
        `http://localhost:3001/todos/${row.id}`,
        {
          todo: {
            comment: comment,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        setComment("");
        setUpdated(moment(response.data.updated_at).format("YYYY/MM/DD HH:mm"));
        indexTodos();
      });
  };
  const showComment = () => {
    if (row.Comment) {
      return (
        <div>
          {row.Comment}
          <br />
          {updated}
        </div>
      );
    } else return <div></div>;
  };

  const checkboxChange = () => {
    setChecked(true);
    axios
      .put(
        `http://localhost:3001/todos/${row.id}`,
        {
          todo: {
            status: "done",
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        setUpdated(moment(response.data.updated_at).format("YYYY/MM/DD HH:mm"));
        indexTodos();
        setChecked(false);
      });
  };
  return (
    <>
      <Modal
        className={classes.modal}
        style={{ zIndex: "0.5 !important" }}
        open={modal}
        onClose={modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <span className={classes.editModalPaper}>
            <EditTodo modalCLose={modalClose} id={row.id} tagId={row.Tags} />
          </span>
        </Fade>
      </Modal>

      <TableRow className={rowName} hover>
        <TableCell onClick={editComment} style={{ maxWidth: 20 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="left">{displayTitle()}</TableCell>

        <TableCell align="left">
          <div className={classes.typography}>
            {row.Tags.map((tag, idx) => {
              return (
                <span
                  key={idx}
                  style={{
                    background: tag.color,
                    color: blackOreWhite(tag.color),
                    borderRadius: "1em",
                    padding: "1px 5px",
                    margin: "1px",
                  }}
                >
                  {tag.name.length > 10
                    ? tag.name.slice(0.9) + "..."
                    : tag.name}
                  {idx % 2 !== 0 ? <br /> : null}
                </span>
              );
            })}
          </div>
        </TableCell>
        <TableCell align="left">
          {moment(row.Deadline).format("YYYY/MM/DD HH:mm")}
        </TableCell>
        <TableCell align="left">{left()}</TableCell>
        <TableCell align="left">
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={checkboxChange}
                icon={<DoneOutlineIcon />}
                checkedIcon={<DoneIcon />}
              />
            }
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={classes.blackcell}
                      colSpan={6}
                      align="center"
                    >
                      Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">{row.Title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Body</TableCell>
                    <TableCell align="left">{row.Body}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Comments</TableCell>
                    <TableCell align="left">{showComment()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Add Comment</TableCell>

                    <TableCell align="center">
                      <Button
                        onClick={addComment}
                        variant="outlined"
                        color="inherit"
                        disabled={comment ? false : true}
                      >
                        <CommentIcon />
                        Add
                      </Button>
                      <TextField
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        multiline
                        style={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      <Button
                        onClick={modalOpen}
                        variant="outlined"
                        color="primary"
                      >
                        <EditIcon />
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={todoDelete}
                        variant="outlined"
                        color="secondary"
                      >
                        <DeleteIcon />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const TodosTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [slide, setSlide] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    setSlide(true);
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 200 }}>
        <Slide direction="left" in={slide} mountOnEnter unmountOnExit>
          <TableHead
            style={{
              background:
                "linear-gradient(45deg,rgba(255, 206, 86, 0.6) 40%,   rgba(54, 162, 235, 0.4) 60%)",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            }}
          >
            <TableRow>
              <TableCell style={{ maxWidth: 20 }} align="left" />
              <TableCell style={{ color: "white" }} align="left">
                Title
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                Tags
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                Deadline
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                Left
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                Done
              </TableCell>
            </TableRow>
          </TableHead>
        </Slide>
        <Slide direction="right" in={slide} mountOnEnter unmountOnExit>
          <TableBody>
            {(rowsPerPage > 0
              ? props.rows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : props.rows
            ).map((row, index) => (
              <Row key={index} row={row} index={index} />
            ))}
          </TableBody>
        </Slide>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={props.rows.length}
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
  );
};
export default TodosTable;
