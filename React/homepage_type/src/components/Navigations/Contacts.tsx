import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { Zoom, Typography, IconButton } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

const Contacts = () => {
  const { classes } = useContext(AppContext);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      handleChange();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Zoom in={checked}>
      <div className={classes.paper}>
        <h2>Contacts</h2>
        <IconButton color="primary" component="span">
          <TwitterIcon />
          <a
            href="https://twitter.com/s_k_vperyod"
            target="_blank"
            rel="noopener noreferrer"
          >
            @s_k_vperyod
          </a>
        </IconButton>
        <br />
        <IconButton color="secondary" component="span">
          <EmailIcon />
          <Typography variant="caption">
            <a href="mailto:koyama10032009@outlook.jp">
              koyama10032009@outlook.jp
            </a>
          </Typography>
        </IconButton>
        <br />
        <IconButton color="secondary" component="span">
          <PhoneIcon />
          <a href="tel:08070698945">08070698945</a>
        </IconButton>
        <br />
        <div>
          Skype:
          <span style={{ fontWeight: 400, fontStyle: "italic" }}>
            live:koyama10032009
          </span>
        </div>
        <br />
      </div>
    </Zoom>
  );
};
export default Contacts;
