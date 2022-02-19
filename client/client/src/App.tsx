import React from "react";
import Grid from "./components/Grid";
import Player from "./components/Player";
import Box from "@mui/material/Box";
/**
 * @description: Base entrypoint of app
 */

const App: React.FunctionComponent = () => {
  const n = randomNumber(1, 5);
  const players = Array.from({ length: n }, () =>
    Math.floor(Math.random() * 40)
  );

  function randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Grid players={players}></Grid>
    </Box>
  );
};

export default App;
