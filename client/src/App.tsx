import React from "react";
import Grid from "./components/Grid";
import Player from "./components/Player";
import { mockPlayers } from "./constants/constants";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
/**
 * @description: Base entrypoint of app
 */

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Player = {
  name: string;
  lives: number[];
  deads: number[];
  idx: number;
};

export type Word = {
  chinese: string;
  english: string;
};

const App: React.FunctionComponent = () => {
  const [players] = React.useState<Player[]>(mockPlayers);

  return (
    <>
      <Box sx={{ display: "flex", position: "absolute", margin: "10px" }}>
        <Box mt={1} mr={2}>
          <Typography sx={{ fontWeight: 500 }} variant="h4" color="#5C31D6">
            Potato Translato
          </Typography>
        </Box>

        <img
          src={require(`./assets/logo.png`)}
          style={{ height: 50, width: 50, marginTop: "5px" }}
          alt="website logo"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid players={players}></Grid>
      </Box>
    </>
  );
};

export default App;
