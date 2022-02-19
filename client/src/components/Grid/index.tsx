import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ReactComponent as Potato } from "../../assets/potato.svg";
import { Player } from "../../App";

/**
 * @description: Base entrypoint of app
 */
interface Props {
  players: Player[];
}

const Grid: React.FC<Props> = (props) => {
  //   const [gamePlayers, setPlayers] = React.useState<Player[]>(props.players);

  const [activePlayer, setActivePlayer] = useState<Player>(props.players[0]);

  //   const [activeWord, setActiveWord] = useState < string;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i === 1000) clearInterval(interval);
      setActivePlayer((activePlayer) => props.players[(i + 1) % 4]);
      i++;
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: 100,
          height: 100,
          marginTop: "325px",
        }}
      >
        <Potato />
      </Box>
      <Box
        flexWrap="wrap"
        sx={{
          width: 1000,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {props.players.map((player, index) => {
          const properties: any = {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "200px",
            marginRight: "200px",
            width: 100,
            height: 100,
            backgroundColor: "#808080",
          };

          if (player.name === activePlayer.name) {
            properties["backgroundColor"] = "#90EE90";
          }

          if (index % 2 === 0) {
            properties["marginLeft"] = "200px";
            return (
              <>
                <Box sx={properties}>
                  <Box
                    display="flex"
                    sx={{
                      width: 100,
                      height: 20,
                      justifyContent: "space-between",
                      marginTop: "-30px",
                    }}
                  >
                    <FavoriteIcon style={{ color: "red" }} />
                    <FavoriteIcon style={{ color: "red" }} />
                    <FavoriteIcon style={{ color: "red" }} />
                  </Box>
                  <Box mt={5}>
                    <Typography variant="h6">{player.name}</Typography>
                  </Box>
                </Box>
              </>
            );
          } else {
            return (
              <Box sx={properties}>
                <Box
                  display="flex"
                  sx={{
                    width: 100,
                    height: 20,
                    justifyContent: "space-between",
                    marginTop: "-30px",
                  }}
                >
                  <FavoriteIcon style={{ color: "red" }} />
                  <FavoriteIcon style={{ color: "red" }} />
                  <FavoriteIcon style={{ color: "red" }} />
                </Box>
                <Box mt={5}>
                  <Typography variant="h6">{player.name}</Typography>
                </Box>
              </Box>
            );
          }
        })}
      </Box>
    </>
  );
};

export default Grid;
