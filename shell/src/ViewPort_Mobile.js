import React from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";
console.log(innerHeight,innerWidth,"vw")
const useGlobalStyles = makeStyles(
  () => ({
    "@global": {
      "*:-webkit-full-screen": {
        height: Window.innerHeight,
        width: Window.innerWidth,
      },
      html: {
        position: "fixed",
      },
      "html, body": {
        height: Window.innerHeight,
        width: Window.innerWidth,
      },
      "#root": {
        height: innerHeight,
        display: "flex",
        flexDirection: "column",
      },
    },
  }),
  { name: "ViewportGlobals" }
);

export default function Viewport(props) {
  useGlobalStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {props.children}
    </React.Fragment>
  );
}
