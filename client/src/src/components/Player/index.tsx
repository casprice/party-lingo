import React from "react";
import Box from "@mui/material/Box";
/**
 * @description: Box component representing each player
 */
const Player: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
};

export default Player;
