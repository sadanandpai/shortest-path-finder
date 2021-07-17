import React, { useRef } from "react";
import styled from "@emotion/styled";

import { Box } from "./Box";
import { cellType, wallType, cellWidth, cellGap } from "../common/config";

// Dynamic grid with rows and columns with config sizes for each cell
const GridContainer = styled.div`
  margin: auto;
  display: inline-grid;
  grid-template-rows: repeat(${(props) => props.rows}, ${cellWidth}px);
  grid-template-columns: repeat(${(props) => props.cols}, ${cellWidth}px);
  grid-column-gap: ${cellGap}px;
  grid-row-gap: ${cellGap}px;
`;

// Display the grid and update the grid handling click, move events
export function Grid({ grid, setGridCell, clickType, isInProgress }) {
  const isMouseDown = useRef(false);

  function onMouseDown(event) {
    if (isInProgress.current) {
      return;
    }

    if (clickType === cellType || clickType === wallType) {
      isMouseDown.current = true;
      onCellHover(event);
    }
    setGridCell(+event.target.dataset.i, +event.target.dataset.j);
  }

  function onMouseUp() {
    isMouseDown.current = false;
  }

  function onMouseLeave() {
    isMouseDown.current = false;
  }

  function onCellHover(event) {
    if (isMouseDown.current && event.target.classList.contains("box")) {
      setGridCell(+event.target.dataset.i, +event.target.dataset.j);
    }
  }

  return (
    <GridContainer
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseOver={onCellHover}
      onMouseLeave={onMouseLeave}
      rows={grid.length}
      cols={grid[0].length}
    >
      {grid.map((row, i) =>
        row.map((cell, j) => <Box key={i + ":" + j} i={i} j={j} clickType={cell} />)
      )}
    </GridContainer>
  );
}
