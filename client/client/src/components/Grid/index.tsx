import React from "react";
import Box from "@mui/material/Box";
import Player from "../Player";
/**
 * @description: Base entrypoint of app
 */
interface Props {
  players: number[];
}
const Grid: React.FC<Props> = (props) => {
  return (
    <Box
      flexWrap="wrap"
      sx={{
        width: 1000,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {props.players.map((player, index) => {
        if (index % 2 === 0) {
          return (
            <Box
              sx={{
                marginTop: "200px",
                marginRight: "200px",
                marginLeft: "200px",
                width: 100,
                height: 100,
                backgroundColor: "#808080",
              }}
            ></Box>
          );
        } else {
          return (
            <Box
              sx={{
                marginTop: "200px",
                marginRight: "200px",
                width: 100,
                height: 100,
                backgroundColor: "#808080",
              }}
            ></Box>
          );
        }
      })}
    </Box>
  );
};

export default Grid;
