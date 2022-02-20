import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Player } from "../../App";
import { Word } from "../../App";
import FocusLock from "react-focus-lock";
import "./index.less";
import { mockWords, mockPlayers } from "../../constants/constants";
import { TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import io from "socket.io-client";

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
  const [currWord, setCurrWord] = useState<Word>(
    mockWords[Math.floor(Math.random() * mockWords.length)]
  );
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");

  const [potato, setPotato] = useState<string>("potato1");
  const [players, setPlayers] = useState<Player[]>(mockPlayers);

  const genRandNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const [timer, setTimer] = useState<number>(genRandNumber(3, 8));

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const decrementPlayerLife = () => {
    let newPlayers: any[] = [];
    // let shouldUpdate = true;
    players.forEach((player) => {
      if (player.name === activePlayer.name) {
        if (player.lives.length - 1 === 0) {
          return null;
        }

        player.lives.pop();
        player.deads.push(0);
        let updatedPlayer = {
          ...player,
          lives: player.lives,
          deads: player.deads,
        };
        newPlayers.push(updatedPlayer);
      } else {
        newPlayers.push(player);
      }
    });
    setPlayers((players) => newPlayers);
    return true;
  };

  const validateAnswer = () => {
    if (answer === currWord.english) {
      setIsWrong((isWrong) => false);
      setIsCorrect((isCorrect) => true);
      return true;
    } else {
      setAnswer((answer) => "");
      setIsWrong((isWrong) => true);
      return false;
    }
  };

  const decrementTimer = () => {
    setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer === 0) {
      setPotato((potato) => "potato2");
      setTimeout(() => {
        setPotato((potato) => "potato1");
      }, 1000);

      if (decrementPlayerLife()) {
        setActivePlayer(
          (activePlayer) =>
            props.players[(activePlayer.idx + 1) % players.length]
        );
        setAnswer((answer) => "");
        setCurrWord(
          (currWord) => mockWords[(currWord.idx + 1) % players.length]
        );
        let nextRandNum = genRandNumber(3, 8);
        setTimer((timer) => nextRandNum);
      } else {
        let newPlayers: any[] = [];

        players.forEach((player) => {
          if (player.name !== activePlayer.name) {
            players.push(player);
          }
        });
        setPlayers((players) => newPlayers);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  useEffect(() => {
    decrementTimer();
    const socket = io("http://127.0.0.1:8000");
    socket.on("connect", () => {
      console.log("connected to backend");
    });
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
            marginTop: "-550px",
            position: "absolute",
          }}
        >
          <Typography sx={{ fontWeight: 700 }} variant="h2" color="#5C31D6">
            <div>{timer}</div>
          </Typography>
        </Box>

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
          <Typography variant="h3" color="#5C31D6" sx={{ fontWeight: 700 }}>
            <div>{currWord.chinese}</div>
          </Typography>
        </Box>
        {potato === "potato1" ? (
          <img
            src={require(`../../assets/${potato}.svg`)}
            style={{ height: 130, width: 130 }}
            alt="website logo"
          />
        ) : (
          <img
            src={require(`../../assets/${potato}.svg`)}
            style={{ height: 150, width: 150 }}
            alt="website logo"
          />
        )}
      </Box>
      <Box
        flexWrap="wrap"
        sx={{
          width: 2000,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {players.map((player, index) => {
          const properties: any = {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "200px",
            marginRight: "400px",
            width: 100,
            height: 100,
          };

          if (index % 2 === 0) {
            properties["marginLeft"] = "400px";
          }
          return (
            <>
              <Box sx={properties}>
                {player.name === activePlayer.name && (
                  <Box
                    sx={{
                      width: 130,
                      height: 60,
                      marginTop: "-100px",
                      marginLeft: "150px",
                      position: "absolute",
                    }}
                  >
                    <div className="talk-bubble tri-right border round btm-left-in">
                      <div className="talktext">
                        <FocusLock>
                          <TextField
                            variant="standard"
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
                                    (currWord) =>
                                      mockWords[(currWord.idx + 1) % 4]
                                  );

                                  setTimeout(() => {
                                    setIsCorrect((isCorrect) => false);
                                  }, 1000);
                                  setTimer((timer) => genRandNumber(3, 8));
                                } else {
                                  console.log("wrong!");
                                }
                              }
                            }}
                          />
                        </FocusLock>
                      </div>
                    </div>
                  </Box>
                )}

                <Box></Box>

                <img
                  src={require(`../../assets/cat${index}.png`)}
                  style={{ height: 130, width: 130 }}
                  alt="website logo"
                />
                <Box
                  display="flex"
                  sx={{
                    width: 100,
                    height: 20,
                    justifyContent: "space-between",
                    marginTop: "-150px",
                  }}
                >
                  {player.lives.map((player, index) => (
                    <FavoriteIcon style={{ color: "red" }} />
                  ))}

                  {player.deads.map((player, index) => (
                    <FavoriteIcon style={{ color: "#D3D3D3" }} />
                  ))}

                  {/* <FavoriteIcon style={{ color: "red" }} /> */}
                </Box>
                <Box sx={{ marginTop: "140px" }}>
                  <Typography
                    sx={{ fontWeight: 700 }}
                    variant="h6"
                    color="#5C31D6"
                  >
                    {player.name}
                  </Typography>
                </Box>
              </Box>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default Grid;
