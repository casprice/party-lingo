import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Player } from "../../App";
import { Word } from "../../App";
import Potato2 from "../../assets/potato.svg";
import { mockWords } from "../../constants/constants";
import { TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

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
  const [countdown, setCountdown] = useState<any>(3);
  const [currWord, setCurrWord] = useState<Word>(
    mockWords[Math.floor(Math.random() * mockWords.length)]
  );
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const validateAnswer = () => {
    if (answer === currWord.english) {
      setIsWrong((isWrong) => false);
      setIsCorrect((isCorrect) => true);
      return true;
    } else {
      // setIsCorrect((isCorrect) => !isCorrect);
      setIsWrong((isWrong) => true);
      return false;
    }
  };

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i === 1000) clearInterval(interval);
      if (i < 3) {
        setCountdown((countdown: any) => countdown - 1);
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
        <Box
          sx={{
            display: "flex",
            width: 100,
            height: 20,
            justifyContent: "center",
            marginTop: "-400px",
            position: "absolute",
          }}
        >
          {isWrong && <CancelIcon style={{ color: "red", fontSize: "70" }} />}
          {isCorrect && (
            <CheckCircleOutlineIcon
              style={{ color: "green", fontSize: "70" }}
            />
          )}
        </Box>

        <Box mb={5}>
          <Typography variant="h4">
            {countdown === 0 ? (
              <div>{currWord.chinese}</div>
            ) : (
              <div>{countdown}</div>
            )}
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
          if (player.name === activePlayer.name && countdown === 0) {
            properties["backgroundColor"] = "#90EE90";
          }
          if (index % 2 === 0) {
            properties["marginLeft"] = "400px";
          }
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

                {player.name === activePlayer.name && countdown === 0 && (
                  <Box mt={7}>
                    <TextField
                      id="code-field"
                      value={answer}
                      onChange={handleAnswerChange}
                      onKeyPress={(ev) => {
                        console.log(`Pressed keyCode ${ev.key}`);
                        if (ev.key === "Enter") {
                          if (validateAnswer()) {
                            setActivePlayer(
                              (activePlayer) =>
                                props.players[(activePlayer.idx + 1) % 4]
                            );
                            setAnswer((answer) => "");
                            setCurrWord(
                              (currWord) => mockWords[(currWord.idx + 1) % 4]
                            );

                            setTimeout(() => {
                              setIsCorrect((isCorrect) => false);
                            }, 1000);
                          } else {
                            console.log("wrong!");
                          }
                        }
                      }}
                      variant="standard"
                    />
                  </Box>
                )}
              </Box>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default Grid;