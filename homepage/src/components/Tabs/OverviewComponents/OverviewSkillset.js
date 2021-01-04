import React, { useContext } from "react";
import AppContext from "../../../contexts/AppContext";
import { Grid, Box } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Skillset = () => {
  const { classes } = useContext(AppContext);
  return (
    <>
      <h2>SKILLSET</h2>
      <Grid container>
        <Grid item xs={5}>
          <Box className={classes.box} justifyContent="flex-start">
            <TreeView
              className={classes.tree}
              defaultExpanded={["1"]}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <TreeItem nodeId="1" label="BackEnd">
                <TreeItem nodeId="2" label="Python">
                  <TreeItem nodeId="3" label="Flask" />
                </TreeItem>
                <TreeItem nodeId="4" label="Ruby">
                  <TreeItem nodeId="5" label="Rails" />
                </TreeItem>
              </TreeItem>
            </TreeView>
          </Box>
          <Box
            className={classes.box}
            borderRadius="5%"
            justifyContent="flex-end"
          >
            <TreeView
              className={classes.tree}
              defaultExpanded={["1"]}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <TreeItem nodeId="1" label="Other">
                <TreeItem nodeId="2" label="AWS" />
                <TreeItem nodeId="3" label="Travis CI" />
                <TreeItem nodeId="4" label="Docker" />
                <TreeItem nodeId="5" label="Git" />
                <TreeItem nodeId="6" label="MySQL" />
              </TreeItem>
            </TreeView>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            className={classes.box}
            borderRadius="5%"
            justifyContent="flex-start"
          >
            <TreeView
              className={classes.tree}
              defaultExpanded={["1"]}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <TreeItem nodeId="1" label="FrontEnd">
                <TreeItem nodeId="2" label="React" />
                <TreeItem nodeId="3" label="jest" />
                <TreeItem nodeId="4" label="Redux" />
              </TreeItem>
            </TreeView>
          </Box>
          <Box className={classes.box} justifyContent="flex-start">
            <TreeView
              className={classes.tree}
              defaultExpanded={["1"]}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <TreeItem nodeId="1" label="Learning">
                <TreeItem nodeId="2" label="Webpack" />
                <TreeItem nodeId="3" label="Typescript" />
                <TreeItem nodeId="4" label="Firebase" />
              </TreeItem>
            </TreeView>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Skillset;
