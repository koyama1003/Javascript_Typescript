import React, { useState, useEffect, useContext } from "react";
import AppContext from "../contexts/AppContext";
import { useTheme } from "@material-ui/core/styles";
import {
  Button,
  Popper,
  ButtonBase,
  InputBase,
  Modal,
  Fade,
  Backdrop,
  ClickAwayListener,
  TextField,
  Snackbar,
  Typography,
} from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

const TagList = (props) => {
  const { classes, Alert } = useContext(AppContext);
  //Modal status
  const [modal, setModal] = useState(false);
  //Anchor El status for popper
  const [anchorEl, setAnchorEl] = useState(null);
  //Tag value which user choose
  const [value, setValue] = useState([]);
  //Pending tag value.When popper closed,this will be value
  const [pendingValue, setPendingValue] = useState([]);
  const theme = useTheme();
  //Popper status
  const [open, setOpen] = useState(false);
  const id = open ? "tags" : undefined;
  //Create new tag
  const [newtag, setNewtag] = useState({ name: "", description: "" });
  //Snackbar status
  const [snackbar, setSnackbar] = useState(false);
  //Snackbar message
  const [message, setMessage] = useState("");
  //Snackbar severity
  const [severity, setSeverity] = useState("");

  //Open popper
  const handleClick = (event) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  //Open modal
  const modalOpen = () => {
    setModal(true);
  };
  //Close popper
  const handleClose = () => {
    setOpen(false);
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };
  //Close modal
  const modalClose = () => {
    setModal(false);
  };
  //Close snackbar
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };

  //Load tag before todo create

  const showTag = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todos/new", {
        withCredentials: true,
      });
      props.setTags(response.data);
    } catch (error) {
      const { status, statusText } = error.response;
      console.log(`Error! HTTP Status:${status} ${statusText}`);
    }
  };
  useEffect(() => {
    let i = 0;
    let TagIdList = [];
    if (value[0]) {
      while (value[i]) {
        TagIdList = [...TagIdList, value[i].id];
        props.setTodo({ ...props.todo, tag_id: TagIdList });
        i++;
      }
    }
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    showTag();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.todo.title === "" && props.todo.body === "") {
      props.setTodo(props.initialTodo);
      setPendingValue([]);
      setValue([]);
    }
    // eslint-disable-next-line
  }, [props.success]);
  const colorCreate = () => {
    let randomColor = "#";
    for (let i = 0; i < 6; i++) {
      randomColor += ((16 * Math.random()) | 0).toString(16);
    }
    return randomColor;
  };

  const submitNewTag = (event) => {
    if (newtag.name !== "") {
      axios
        .post(
          "http://localhost:3001/tags",
          {
            tag: {
              name: newtag.name,
              description: newtag.description,
              color: colorCreate(),
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          showTag();
          setNewtag({ name: "", description: "" });
          setMessage("Created new Tag!");
          setSeverity("success");
          setSnackbar(true);
        })
        .catch((error) => {
          console.log("registration error", error);
          setSnackbar(true);
          setMessage("TagName is empty or Tagname is already in use.");
          setSeverity("error");
        });
      event.preventDefault();
    } else {
      setMessage("TagName is empty or Tagname is already in use.");
      setSeverity("error");
      setSnackbar(true);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={classes.tagList}>
        <div>
          <ButtonBase
            disableRipple
            className={classes.tagListButton}
            aria-describedby={id}
            onClick={handleClick}
          >
            <PlaylistAddIcon />
            Add Tags
          </ButtonBase>

          {value.map((tag) => (
            <div
              key={tag.name}
              className={classes.tag}
              style={{
                backgroundColor: tag.color,
                color: theme.palette.getContrastText(tag.color),
                textAlign: "center",
              }}
            >
              {tag.name}
            </div>
          ))}
        </div>

        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom"
          className={classes.tagListPopper}
        >
          <div className={classes.tagListHeader}>TAGLIST</div>

          <Autocomplete
            open
            multiple
            classes={{
              paper: classes.autoCompletePaper,
              option: classes.autoCompleteOption,
              popperDisablePortal: classes.popperDisablePortal,
            }}
            value={pendingValue}
            onChange={(event, newValue) => {
              setPendingValue(newValue);
            }}
            disableCloseOnSelect
            disablePortal
            renderTags={() => null}
            noOptionsText="No such tags"
            renderOption={(option, { selected }) => (
              <>
                <DoneIcon
                  className={classes.autoCompleteIconSelected}
                  style={{ visibility: selected ? "visible" : "hidden" }}
                />
                <span
                  className={classes.autoCompleteColor}
                  style={{ backgroundColor: option.color }}
                />
                <div className={classes.autoCompleteText}>
                  {option.name}
                  <br />
                  <span style={{ background: "#dcdcdc" }}>
                    {option.count} times used
                  </span>
                  <br />
                  {option.description}
                </div>
                <CloseIcon
                  className={classes.autoCompleteCloseIcon}
                  style={{ visibility: selected ? "visible" : "hidden" }}
                />
              </>
            )}
            options={[...props.tags].sort((a, b) => {
              let ai = value.indexOf(a);
              ai = ai === -1 ? value.length + props.tags.indexOf(a) : ai;
              let bi = value.indexOf(b);
              bi = bi === -1 ? value.length + props.tags.indexOf(b) : bi;
              return ai - bi;
            })}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <InputBase
                placeholder="SEARCH TAG NAME"
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                className={classes.inputBase}
              />
            )}
          />

          <Button
            variant="outlined"
            color="primary"
            className={classes.tagListButton}
            onClick={modalOpen}
          >
            Create new tag
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            className={classes.tagListButton}
            onClick={handleClose}
          >
            Close
          </Button>
        </Popper>
        <Modal
          className={classes.modal}
          open={modal}
          onClose={modalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modal}>
            <div className={classes.modalPaper}>
              <Typography
                className={classes.typography}
                style={{ paddingBottom: "20px" }}
                align="center"
                variant="h5"
              >
                Create New Tag
              </Typography>

              <form>
                <TextField
                  required
                  value={newtag.name}
                  id="tagName"
                  variant="outlined"
                  label="Tag Name"
                  type="text"
                  placeholder="Tag Name"
                  className={classes.textField}
                  multiline
                  onChange={(event) =>
                    setNewtag({ ...newtag, name: event.target.value })
                  }
                />
                <br />
                <TextField
                  value={newtag.description}
                  id="tagDescription"
                  label="Description"
                  variant="outlined"
                  type="text"
                  placeholder="Description"
                  className={classes.textField}
                  multiline
                  onChange={(event) =>
                    setNewtag({ ...newtag, description: event.target.value })
                  }
                />
                <Button onClick={submitNewTag} variant="outlined">
                  Create
                </Button>
                <Snackbar
                  open={snackbar}
                  autoHideDuration={3000}
                  onClose={snackbarClose}
                >
                  <Alert onClose={snackbarClose} severity={severity}>
                    {message}
                  </Alert>
                </Snackbar>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    </ClickAwayListener>
  );
};

export default TagList;
