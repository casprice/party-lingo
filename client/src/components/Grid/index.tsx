import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Player } from "../../App";
import { Word } from "../../App";
import FocusLock from "react-focus-lock";
import "./index.less";
import { mockPlayers } from "../../constants/constants";
import { TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import io from "socket.io-client";
import Button from "@mui/material/Button";

/**
 * @description: Base entrypoint of app
 */
interface Props {
  players: Player[];
}

const Grid: React.FC<Props> = (props) => {
  const getRandWord = async () => {
    const res = await axios.get(`http://localhost:8000/word`);
    return res.data;
  };

  const [activePlayer, setActivePlayer] = useState<Player>(
    props.players[Math.floor(Math.random() * props.players.length)]
  );
  const [currWord, setCurrWord] = useState<Word>({ english: "", chinese: "" });
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const [isStart, setIsStart] = useState<boolean>(true);
  const [isGame, setIsGame] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const [answer, setAnswer] = useState<string>("");

  const [potato, setPotato] = useState<string>("potato1");
  const [players, setPlayers] = useState<Player[]>(mockPlayers);

  // const [tempAns, setTempAns] = useState<Word>({ english: "", chinese: "" });
  // const [answerVis, setAnswerVis] = useState<boolean>(false);

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
      setTimeout(() => {
        setIsWrong((isWrong) => false);
      }, 1000);

      return false;
    }
  };

  const decrementTimer = () => {
    setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  useEffect(() => {
    const fetchInitWord = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/word`);
        const data = res.data.data;
        setCurrWord((currWord) => data);
        // setTempAns((tempAns) => data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchInitWord();
  }, []);

  useEffect(() => {
    const f = async () => {
      if (timer === 0) {
        if (players.length === 2) {
          console.log("one player remaining");
        }
        setPotato((potato) => "potato2");

        setTimeout(() => {
          setPotato((potato) => "potato1");
        }, 1000);

        if (decrementPlayerLife()) {
          setActivePlayer(
            (activePlayer) => players[(activePlayer.idx + 1) % players.length]
          );
          setAnswer((answer) => "");

          let givenWord = { english: "cat", chinese: "猫" };
          setCurrWord((currWord) => givenWord);

          let nextRandNum = genRandNumber(3, 8);
          setTimer((timer) => nextRandNum);
        } else {
          let newPlayers: any[] = [];
          console.log("true");

          players.forEach((player) => {
            if (player.name !== activePlayer.name) {
              players.push(player);
            }
          });
          setPlayers((players) => newPlayers);
        }
      }
    };
    f();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  useEffect(() => {
    const f = async () => {
      if (timer === 0) {
        if (players.length === 2) {
          console.log("one player remaining");
        }
        setPotato((potato) => "potato2");

        setTimeout(() => {
          setPotato((potato) => "potato1");
        }, 1000);

        if (decrementPlayerLife()) {
          setActivePlayer(
            (activePlayer) => players[(activePlayer.idx + 1) % players.length]
          );
          setAnswer((answer) => "");

          let givenWord = { english: "cat", chinese: "猫" };
          setCurrWord((currWord) => givenWord);

          let nextRandNum = genRandNumber(3, 8);
          setTimer((timer) => nextRandNum);
        } else {
          let newPlayers: any[] = [];
          console.log("true");

          players.forEach((player) => {
            if (player.name !== activePlayer.name) {
              players.push(player);
            }
          });
          setPlayers((players) => newPlayers);
        }
      }
    };
    f();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  useEffect(() => {
    // decrementTimer();
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
          {isGame && (
            <Typography sx={{ fontWeight: 700 }} variant="h3" color="#5C31D6">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "centers",
                  width: 70,
                  height: 70,
                  border: "4px solid #5C31D6",
                  borderRadius: "50%",
                }}
              >
                <Box mt={1}>{timer}</Box>
              </Box>
            </Typography>
          )}
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
          {isWrong && (
            <Box mt={2}>
              <CancelIcon style={{ color: "red", fontSize: "70" }} />
            </Box>
          )}
          {isCorrect && (
            <Box mt={2}>
              <CheckCircleOutlineIcon
                style={{ color: "green", fontSize: "70" }}
              />
            </Box>
          )}
        </Box>
        {isStart && (
          <Box mt={9}>
            <Typography variant="h6">
              <div>Waiting for Players</div>
            </Typography>
          </Box>
        )}
        {isStart && (
          <Box mt={3}>
            <Button
              onClick={() => {
                setIsStart((isStart) => false);
                setIsGame((isGame) => true);

                decrementTimer();
              }}
              sx={{
                backgroundColor: "#5C31D6",
                textTransform: "none",
                width: 170,
                fontSize: 20,
                borderRadius: "3%",
              }}
              variant="contained"
            >
              Start Game
            </Button>
          </Box>
        )}

        {isGame && (
          <Box mb={5}>
            <Typography variant="h3" color="#5C31D6" sx={{ fontWeight: 700 }}>
              <div>{currWord.chinese}</div>
            </Typography>
          </Box>
        )}
        {isGame && potato === "potato1" ? (
          <img
            src={require(`../../assets/${potato}.svg`)}
            style={{ height: 130, width: 130 }}
            alt="website logo"
          />
        ) : null}
        {isGame && potato === "potato2" ? (
          <img
            src={require(`../../assets/${potato}.svg`)}
            style={{ height: 130, width: 130 }}
            alt="website logo"
          />
        ) : null}
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
                {isGame && player.name === activePlayer.name && (
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
                            onKeyPress={async (ev) => {
                              console.log(`Pressed keyCode ${ev.key}`);
                              if (ev.key === "Enter") {
                                if (validateAnswer()) {
                                  setActivePlayer(
                                    (activePlayer) =>
                                      players[
                                        (activePlayer.idx + 1) % players.length
                                      ]
                                  );
                                  setAnswer((answer) => "");

                                  let randomWord = await getRandWord();
                                  let word = randomWord.data;
                                  setCurrWord((currWord) => word);

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
