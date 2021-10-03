import {
  defaultFont,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  // eslint-disable-next-line no-unused-vars
  dangerBoxShadow,
  container,
} from "assets/jss/material-kit-react.js";

const snackbarContentStyle = {
  root: {
    ...defaultFont,
    fontSize: "14px",
    backgroundColor: "white",
    color: "#555555",
  },
  info: {
    backgroundColor: "#00d3ee",
    color: "#ffffff",
    ...infoBoxShadow,
  },
  success: {
    backgroundColor: "#5cb860",
    color: "#ffffff",
    ...successBoxShadow,
  },
  warning: {
    backgroundColor: "#ffa21a",
    color: "#ffffff",
    ...warningBoxShadow,
  },
  danger: {
    backgroundColor: "#f55a4e",
    color: "#ffffff",
  },
  primary: {
    backgroundColor: "#af2cc5",
    color: "#ffffff",
    ...primaryBoxShadow,
  },
  message: {
    padding: "0",
    display: "block",
    maxWidth: "89%",
    "&,& *": {
      letterSpacing: "normal",
    },
  },
  close: {
    width: "14px",
    height: "14px",
    cursor: "pointer",
  },
  iconButton: {
    width: "24px",
    height: "24px",
    float: "right",
    fontSize: "1.5rem",
    fontWeight: "500",
    lineHeight: "1",
    position: "absolute",
    right: "-4px",
    top: "0",
    padding: "0",
  },
  icon: {
    display: "block",
    float: "left",
    marginRight: "1.071rem",
  },
  container: {
    ...container,
    position: "relative",
  },
};

export default snackbarContentStyle;
