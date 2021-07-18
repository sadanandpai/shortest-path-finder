import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "@emotion/styled";
import "react-toastify/dist/ReactToastify.css";

import { AiFillGithub } from "react-icons/ai";
import { Dimensions } from "./components/Dimensions";
import { Grid } from "./components/Grid";
import { Controls } from "./components/Controls";

import { startBreadthFirstSearchAlgo } from "./common/bfsAlgo";
import { generateGrid } from "./common/helper";
import { cellType, wallType, entryType, exitType } from "./common/config";

const Title = styled.h2`
  margin-top: 5px;
  text-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
`;

const Main = styled.main`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

// Opacity is used to hide the toast between screen sizes to stop duplication
const ToastContainerWeb = styled(ToastContainer)`
  opacity: 0;
  @media (min-width: 768px) {
    opacity: 1;
  }
`;

const ToastContainerMobile = styled(ToastContainer)`
  opacity: 1;
  @media (min-width: 768px) {
    opacity: 0;
  }
`;

function setCell(ref, x = -1, y = -1) {
  ref.current.x = x;
  ref.current.y = y;
}

function hasMatch(ref, x, y) {
  if (ref.current.x === x && ref.current.y === y) return true;
  return false;
}

export function App() {
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(55);
  const [grid, setGrid] = useState(generateGrid(rows, cols));
  const [clickType, setClickType] = useState(1);
  const isInProgress = useRef(false);
  const entry = useRef({ x: -1, y: -1 });
  const exit = useRef({ x: -1, y: -1 });

  // appData object will be shared across the components
  const appData = {
    rows,
    cols,
    grid,
    clickType,
    setRows,
    setCols,
    setGrid,
    setClickType,
    isInProgress,
    entry,
    exit,
    resetGrid,
    startBFS: startSearch,
    setGridCell,
  };

  function resetGrid() {
    setGrid(generateGrid(rows, cols));
    setCell(entry);
    setCell(exit);
    isInProgress.current = false;
  }

  async function startSearch() {
    if (entry.current.x < 0 || exit.current.x < 0) {
      toast.error("Entry & Exit are mandatory", { toastId: 0 }); // just an id to prevent duplicates
      return false;
    }

    isInProgress.current = true;
    await startBreadthFirstSearchAlgo(grid, setGrid, entry.current, exit.current, isInProgress);
  }

  function setGridCell(x, y, type = clickType) {
    const newGrid = [...grid];
    newGrid[x][y] = type;

    // if click is wall or cell, reset if that cell was entry or exit
    if (type === cellType || type === wallType) {
      if (hasMatch(entry, x, y)) {
        setCell(entry);
      } else if (hasMatch(exit, x, y)) {
        setCell(exit);
      }
    }

    // remove the previous entry if new one is already set
    if (type === entryType) {
      if (entry.current.x !== -1) {
        newGrid[entry.current.x][entry.current.y] = cellType;
      }
      setCell(entry, x, y);
    }

    // remove the previous exit if new one is already set
    if (type === exitType) {
      if (exit.current.x !== -1) {
        newGrid[exit.current.x][exit.current.y] = cellType;
      }
      setCell(exit, x, y);
    }

    setGrid(newGrid);
  }

  return (
    <>
      <Title>
        Shortest Path Finder
        <a href="https://github.com/sadanandpai/shortest-path-finder">
          <AiFillGithub />
        </a>
      </Title>
      <Dimensions {...appData} />
      <Main>
        <Controls {...appData} />
        <Grid {...appData} />
        <ToastContainerWeb autoClose={3000} pauseOnFocusLoss={false} toastId={3} />
        <ToastContainerMobile
          position="bottom-center"
          pauseOnFocusLoss={false}
          autoClose={3000}
          newestOnTop={true}
        />
      </Main>
    </>
  );
}
