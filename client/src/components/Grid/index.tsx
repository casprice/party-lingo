import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Player } from "../../App";
import Potato2 from "../../assets/potato.svg";
import { mockWords } from "../../constants/constants";

/**
 * @description: Base entrypoint of app
 */
interface Props {
  players: Player[];
}

const Grid: React.FC<Props> = (props) => {
  const [activePlayer, setActivePlayer] = useState<Player>(
    props.players[Math.floor(Math.random() * props.players.length)]
  );
  const [countdown, setCountdown] = useState<any>(5);
  const [currWord, setCurrWord] = useState<string>("Start!");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i === 1000) clearInterval(interval);
      if (i < 5) {
        setCountdown((countdown: any) => countdown - 1);
      } else {
        setActivePlayer((activePlayer) => props.players[(i + 1) % 4]);
        setCurrWord((currWord) => mockWords[(i + 1) % 4]);
      }

      i++;
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          width: 200,
          height: 100,
          marginTop: "300px",
        }}
      >
        <Box mb={5}>
          <Typography variant="h4">
            {countdown === 0 ? <div>{currWord}</div> : <div>{countdown}</div>}
          </Typography>
        </Box>
        <img
          src={Potato2}
          style={{ height: 130, width: 130 }}
          alt="website logo"
        />
      </Box>
      <Box
        flexWrap="wrap"
        sx={{
          width: 2000,
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
            marginRight: "400px",
            width: 100,
            height: 100,
            backgroundColor: "#808080",
          };

          if (
            player.name === activePlayer.name &&
            countdown === 0 &&
            currWord !== "Start!"
          ) {
            properties["backgroundColor"] = "#90EE90";
          }

          if (index % 2 === 0) {
            properties["marginLeft"] = "400px";
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
