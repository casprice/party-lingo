import React from "react";
import Grid from "./components/Grid";
import Player from "./components/Player";
import { mockPlayers } from "./constants/constants";
import Box from "@mui/material/Box";
/**
 * @description: Base entrypoint of app
 */

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Player = {
  name: string;
  lives: number;
  idx: number;
};

export type Word = {
  idx: number;
  chinese: string;
  english: string;
};

const App: React.FunctionComponent = () => {
  const [players] = React.useState<Player[]>(mockPlayers);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid players={players}></Grid>
    </Box>
  );
};

export default App;
