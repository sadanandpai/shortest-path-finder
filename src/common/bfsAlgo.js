import { generateGrid, delay } from "./helper";
import { toast } from "react-toastify";
import { searchType, pathType } from "../common/config";

/**
 * @description Set given value to a cell and call setGrid
 * @param {*} grid : 2D array;
 * @param {*} setGrid
 * @param {*} x
 * @param {*} y
 * @param {*} value
 */
function setGridCell(grid, setGrid, x, y, value) {
  const newGrid = [...grid]; // though its an array of array, shallow copy should work fine
  newGrid[x][y] = value; // set the value to the specific cell
  setGrid(newGrid);
}

/**
 * @description
 * @param {*} grid : 2D array;
 * @param {*} setGrid
 * @param {*} positions : Array of {x, y} coordinates
 * @param {*} value
 * @param {*} entry
 */
function setGridCells(grid, setGrid, positions, value, entry) {
  const newGrid = [...grid];
  positions.forEach((position) => {
    if (!(position.x === entry.x && position.y === entry.y)) {
      // check if position is not same as entry
      newGrid[position.x][position.y] = value; // set value of cell
    }
  });
  setGrid(newGrid);
}

/**
 *
 * @param {*} grid : ;
 * @param {*} parents
 * @param {*} visited
 * @param {*} queue
 * @returns
 */
function getAddToQueueIfAllowedFunction(grid, parents, visited, queue) {
  const rows = grid.length;
  const cols = grid[0].length;

  return function (x, y, nextX, nextY) {
    // check if the next coordinate is within the grid
    if (nextX >= 0 && nextY >= 0 && nextX < rows && nextY < cols) {
      // the next coordinate should neither be visited before nor should be a wall
      if (!visited[nextX][nextY] && grid[nextX][nextY] !== 1) {
        queue.push({ x: nextX, y: nextY }); // push to the queue
        parents[nextX][nextY] = { x, y }; // update its parents
        visited[nextX][nextY] = true; // mark as visited
      }
    }
  };
}

/**
 * @description Reverse trace the path from exit to entry using parents info
 * @param {*} entry
 * @param {*} exit
 * @param {*} parents
 * @param {*} grid
 * @param {*} setGrid
 * @param {*} isInProgress
 * @returns
 */
async function tracePath(entry, exit, parents, grid, setGrid, isInProgress) {
  let x = exit.x;
  let y = exit.y;
  [x, y] = [parents[x][y].x, parents[x][y].y];

  let pathLength = 0;
  // if entry and exit are next to each other
  if (entry.x === x && entry.y === y) {
    return pathLength;
  }

  // Start marking the path with a small delay
  do {
    setGridCell(grid, setGrid, x, y, pathType);
    await delay(100);
    [x, y] = [parents[x][y].x, parents[x][y].y]; // set parents for next iteration
    pathLength += 1;
  } while (isInProgress.current && (entry.x !== x || entry.y !== y)); // check if entry is reached

  return pathLength;
}

// The Breadth First Search Algorithm (Use different alogirthm if needed)
export async function startBreadthFirstSearchAlgo(grid, setGrid, entry, exit, isInProgress) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = generateGrid(rows, cols, false); // initalize visited arrays
  const parents = generateGrid(rows, cols, -1); // initalize parents arrays

  const queue = [entry]; // Add entry coordinate to the queue
  visited[entry.x][entry.y] = true; // mark it as visited

  // get the function for reuse with coordinates
  const addToQueueIfAllowed = getAddToQueueIfAllowedFunction(grid, parents, visited, queue);

  let isPathFound = false;
  outerLoop: while (queue.length) {
    // iterate till queue items are over
    const length = queue.length;

    const loopQueue = []; // loopQueue is used for marking the coordinates after each inner iteration
    for (let k = 0; k < length; k++) {
      const value = queue.shift();

      if (value.x === exit.x && value.y === exit.y) {
        // if exit is found, stop searching
        isPathFound = true;
        break outerLoop;
      }

      if (!isInProgress.current) {
        break outerLoop;
      }

      // Validate and add next coordinates to the queue (All 4 directions i.e up, down, left, right)
      addToQueueIfAllowed(value.x, value.y, value.x + 1, value.y);
      addToQueueIfAllowed(value.x, value.y, value.x - 1, value.y);
      addToQueueIfAllowed(value.x, value.y, value.x, value.y + 1);
      addToQueueIfAllowed(value.x, value.y, value.x, value.y - 1);

      // push the processed coordinate to queue for marking
      loopQueue.push({ x: value.x, y: value.y });
    }

    // mark all the cells which are covered
    setGridCells(grid, setGrid, loopQueue, searchType, entry);
    await delay(200);
  }

  if (isPathFound && isInProgress.current) {
    // trace the path only if present
    toast.success("Path found!!! 😃");
    const pathLength = await tracePath(entry, exit, parents, grid, setGrid, isInProgress);

    if (isInProgress.current) {
      toast("Shortest path length is " + (pathLength + 1));
    }
    return;
  }

  // if no path found
  if (isInProgress.current) {
    toast.warning("No path found!!! 😟");
    return;
  }
}
