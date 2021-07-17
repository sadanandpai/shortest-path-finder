function getRandom(max) {
  return Math.floor(Math.random() * max);
}

export function delay(time){
  return new Promise((resolve) => setTimeout(resolve, time))
}

export function generateGrid(rows, cols, value) {
  return Array.from(new Array(rows), () => new Array(cols).fill(value));
}

export function randomMazeGenerator(rows, cols) {
  const grid = generateGrid(rows, cols, 0);

  grid.forEach((row) => {
    row.forEach((_, pos) => {
      if (Math.random() < 0.25) {
        row[pos] = 1;
      }
    });
  });

  const entry = { x: getRandom(rows), y: getRandom(cols) };
  const exit = {x: -1, y: -1};
  do{
    exit.x = getRandom(rows);
    exit.y = getRandom(cols);
  }while(exit.x === entry.x && exit.y === entry.y);

  grid[entry.x][entry.y] = 2;
  grid[exit.x][exit.y] = 3;
  return [grid, entry, exit];
}
