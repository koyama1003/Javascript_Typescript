import React, { useContext } from "react";
import AppContext from "../../../contexts/AppContext";
import {
  Box,
  Collapse,
  fade,
  Grid,
  SvgIcon,
  withStyles,
} from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const TransitionComponent = (props) => {
  return (
    <>
      <Collapse {...props} />
    </>
  );
};

const MinusSquare = (props) => {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
};

const PlusSquare = (props) => {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
};
const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));
const Skillset = () => {
  const { classes } = useContext(AppContext);
  return (
    <div className={classes.childContainer}>
      <h2>SKILLSET</h2>
      <Grid container>
        <Grid item xs={5}>
          <Box justifyContent="flex-start">
            <TreeView
              className={classes.tree}
              defaultExpanded={["1"]}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <StyledTreeItem nodeId="1" label="BackEnd">
                <TreeItem nodeId="2" label="Python">
                  <TreeItem nodeId="3" label="Flask" />
                </TreeItem>
                <TreeItem nodeId="4" label="Ruby">
                  <TreeItem nodeId="5" label="Rails" />
                </TreeItem>
              </StyledTreeItem>
            </TreeView>
          </Box>
          <Box justifyContent="flex-end">
            <TreeView
              className={classes.tree}
              defaultExpanded={["1"]}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
            >
              <StyledTreeItem nodeId="1" label="Other">
                <TreeItem nodeId="2" label="AWS" />
                <TreeItem nodeId="3" label="Travis CI" />
                <TreeItem nodeId="4" label="Docker" />
                <TreeItem nodeId="5" label="MySQL" />
              </StyledTreeItem>
            </TreeView>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box justifyContent="flex-start">
            <TreeView
              className={classes.tree}
              defaultExpanded={["1"]}
              defaultCollapseIcon={<MinusSquare />}
              defaultExpandIcon={<PlusSquare />}
            >
              <StyledTreeItem nodeId="1" label="FrontEnd">
                <TreeItem nodeId="2" label="React" />
                <TreeItem nodeId="3" label="jest" />
                <TreeItem nodeId="4" label="Redux" />
              </StyledTreeItem>
            </TreeView>
          </Box>
          <Box justifyContent="flex-start">
            <TreeView
              className={classes.tree}
              defaultExpanded={["1"]}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <StyledTreeItem nodeId="1" label="Learning">
                <TreeItem nodeId="2" label="Webpack" />
                <TreeItem nodeId="3" label="Typescript" />
                <TreeItem nodeId="4" label="Firebase" />
              </StyledTreeItem>
            </TreeView>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
export default Skillset;
