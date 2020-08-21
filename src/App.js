import React, { useEffect } from 'react';
import Board from './Board';
import useLocalStorage from './useLocalStorage';
import cloneDeep from 'lodash/cloneDeep';
import { useSwipeable } from "react-swipeable";
import { rotateLeft, rotateRight } from './boardLogic';
import getNewPosition from './helpers';
import './App.scss';
import Gameoverlay from './Gameoverlay';
import Gamecontrol from './Gamecontrol';




function App() {

  const INITIAL_DATA = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]]
  const WIN = 'win';
  const GAME_OVER = 'gameover';
  const PLAYING = 'playing';

  //state
  const [data, setData] = useLocalStorage("initial", INITIAL_DATA);
  const [score, setScore] = useLocalStorage("score", 0);
  const [best, setBest] = useLocalStorage("best score", 0);
  const [gameOver, setGameOver] = useLocalStorage("gameover", false);
  const [restart, setRestart] = useLocalStorage("restart", true);
  const [win, setWin] = useLocalStorage("win", false);
  const [history, setHistory] = useLocalStorage("history", []);
  const [scorelist, setScoreList] = useLocalStorage("scorelist", []);
  const [undolist, setUndoList] = useLocalStorage("undolist", [])
  const [overlay, setOverlay] = useLocalStorage("overlay", PLAYING);
  const [replay, setReplay] = useLocalStorage("replay", false);


  //Initialize on loading
  const initBoard = () => {
    let board = cloneDeep(data);
    placeRandom(board);
    placeRandom(board);
    setData(board);
    setRestart(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (restart) {
      initBoard();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart]);

  const placeRandom = (newGrid) => {
    let [rand1, rand2] = getNewPosition(newGrid);
    while (newGrid[rand1][rand2] !== null) {
      [rand1, rand2] = getNewPosition(newGrid);
    }
    newGrid[rand1][rand2] = Math.random() > 0.9 ? 4 : 2;
    return newGrid;
  };

  // Compares two boards to check for movement
  const boardMoved = (original, updated) => {
    return JSON.stringify(updated) !== JSON.stringify(original) ? true : false;
  };

  //flattening array
  function flatted(board) {
    return [].concat.apply([], board);
  }

  //  When pressed Left
  const shiftLeft = arr => {
    const result = arr
      .filter(Boolean)
      .concat([null, null, null, null])
      .slice(0, 4);

    for (let i = 0; i < arr.length; i++) {
      if (result[i] && result[i + 1] && result[i] === result[i + 1]) {
        result[i] *= 2; //This is where merge happens
        result[i + 1] = null;
        setScore(score + result[i]);
      }
    }
    return result
      .filter(Boolean)
      .concat([null, null, null, null])
      .slice(0, 4);
  };

  const handleLeft = (checkDead = true) => {
    let oldData = cloneDeep(data);
    if (win) {
      setOverlay(true);
      return;
    }
    if (replay) {
      return;
    }
    if (undolist.length) {
      setUndoList([]);
    }
    let newData = cloneDeep(data).map(item => shiftLeft(item));
    if (boardMoved(oldData, newData)) {
      setHistory([...history, oldData]);
      if (flatted(newData).includes(2048)) {
        setWin(true);
        setData(newData);
        setOverlay(WIN)
        return;
      } else placeRandom(newData);
    } else if (!flatted(oldData).includes(null) && checkDead && checkForGameOver(newData)) {
      setOverlay(GAME_OVER)
      setGameOver(true);
    }
    if (checkDead) {
      setData(newData);
    }
    return newData;
  };


  //when pressed Right
  const shiftRight = arr => {
    arr = arr.filter(Boolean);
    let result = [];

    for (let i = arr.length - 1; i > 0; i--) {
      if (arr[i] > 0 && arr[i - 1] === arr[i]) {
        arr[i] *= 2;     //This is where merge happens
        arr[i - 1] = null;
        setScore(score + arr[i]);
      }
    }
    result = [null, null, null, null].concat(arr.filter(Boolean));
    result = result.slice(result.length - 4);
    return result;
  };

  const handleRight = (checkDead = true) => {
    let oldData = data;
    if (win) {
      setOverlay(true);
      return;
    }
    if (replay) {
      return;
    }
    if (undolist.length) {
      setUndoList([]);
    }
    let newData = cloneDeep(data).map(item => shiftRight(item));
    if (boardMoved(oldData, newData)) {
      setHistory([...history, oldData]);
      if (flatted(newData).includes(2048)) {
        setWin(true);
        setData(newData);
        setOverlay(WIN)
        return;
      } else placeRandom(newData);
    } else if (!flatted(oldData).includes(null) && checkDead && checkForGameOver(newData)) {
      setOverlay(GAME_OVER)
      setGameOver(true);
    }
    if (checkDead) {
      setData(newData);
    }
    return newData
  };

  //when pressed UP
  const handleUp = (checkDead = true) => {
    let oldData = cloneDeep(data);
    if (win) {
      setOverlay(true);
      return;
    }
    if (replay) {
      return;
    }
    if (undolist.length) {
      setUndoList([]);
    }
    let newData = cloneDeep(data);
    newData = rotateLeft(rotateRight(newData).map(item => shiftRight(item)));
    if (boardMoved(oldData, newData)) {
      setHistory([...history, oldData]);
      if (flatted(newData).includes(2048)) {
        setWin(true);
        setData(newData);
        setOverlay(WIN);
        return
      } else placeRandom(newData);
    } else if (!flatted(oldData).includes(null) && checkDead && checkForGameOver(newData)) {
      setOverlay(GAME_OVER);
      setGameOver(true);
    }
    if (checkDead) {
      setData(newData);
    }
    return newData;
  }

  //when pressed DOWN
  const handleDown = (checkDead = true) => {
    let oldData = cloneDeep(data);
    if (win) {
      setOverlay(true);
      return;
    }
    if (replay) {
      return;
    }
    if (undolist.length) {
      setUndoList([]);
    }
    let newData = cloneDeep(data);
    newData = rotateLeft(rotateRight(newData).map(item => shiftLeft(item)));
    if (boardMoved(oldData, newData)) {
      setHistory([...history, oldData]);
      if (flatted(newData).includes(2048)) {
        setWin(true);
        setData(newData);
        setOverlay(WIN)
        return;
      } else placeRandom(newData);
    } else if (!flatted(oldData).includes(null) && checkDead && checkForGameOver(newData)) {
      setOverlay(GAME_OVER);
      setGameOver(true);
    }
    if (checkDead) {
      setData(newData);
    }
    return newData;
  }

  //Keyboard Handling
  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 38:
        handleUp();
        break;
      case 40:
        handleDown();
        break;
      case 37:
        handleLeft();
        break;
      case 39:
        handleRight();
        break;
      default:
        return;
    }
  };

  //Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  //TouchHandling
  const handlers = useSwipeable({
    onSwipedLeft: () => handleLeft(),
    onSwipedRight: () => handleRight(),
    onSwipedUp: () => handleUp(),
    onSwipedDown: () => handleDown(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  //Click UNDO
  const onUndo = () => {
    const list = cloneDeep(history);
    const undo = list.pop();
    setHistory(list);
    setUndoList([...undolist, data]);
    setData(undo);
  };

  //REDO
  const onRedo = () => {
    const list = cloneDeep(history);
    const undo = cloneDeep(undolist);
    const redo = undo.pop();
    list.push(data);
    setHistory(list);
    setUndoList(undo);
    setData(redo);
  }

  //Replay
  const onReplay = () => {
    setReplay(true);
    const list = cloneDeep(history);
    list.push(data);

    for (let i = 0; i < list.length; i++) {
      setTimeout(() => {
        setData(list[i]);
        if (i === list.length - 1) {
          setReplay(false);
        }
      }, i * 2000)
    }
  };

  //Reset
  const onClickNewGame = () => {
    setScoreList([...scorelist, score]);
    setHistory([]);
    setUndoList([]);
    setGameOver(false);
    setOverlay(PLAYING);
    setReplay(false);
    setRestart(true);
    setScore(0);
    setData(INITIAL_DATA);
  }

  const onClickKeepGoing = () => {
    setOverlay(PLAYING);
    setData(data);
    setWin(false);
  }

  // Check to see if there are any moves left
  const checkForGameOver = data => {
    let moves = [
      boardMoved(data, handleUp(false)),
      boardMoved(data, handleDown(false)),
      boardMoved(data, handleRight(false)),
      boardMoved(data, handleLeft(false))
    ];
    return moves.includes(true) ? false : true;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setBest(Math.max(...scorelist, score));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);




  return (
    <div {...handlers}>
      <div className="App">
        {win || gameOver

          ?

          <Gameoverlay
            onClickNewGame={onClickNewGame}
            overlay={overlay}
            onClickKeepGoing={onClickKeepGoing} />
          :
          <>
            <Board
              data={data}
              score={score}
              best={best}
              onClickNewGame={onClickNewGame}
              initBoard={initBoard}
            />
            <div className="app__contents">
              <Gamecontrol
                onUndo={onUndo}
                onRedo={onRedo}
                onReplay={onReplay}
                disableUndo={win || !history.length || replay}
                disableRedo={!undolist.length || replay}
                disableReplay={!history.length || replay} />
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default App;
