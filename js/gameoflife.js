function seed() {return Array.from(arguments);}

function same([x, y], [j, k]) { return x === j && y === k;}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  for(const livingCell of this){
    if(same(livingCell, cell))
        return true
  }
  return false
}

const printCell = (cell, state) => {
  if(contains.call(state, cell)){
    return '\u25A3'
  }
  return '\u25A2';
};

const corners = (state = []) => {
  if(state.length === 0){
    return {
      topRight: [0,0],
      bottomLeft: [0,0],
    }
  }
      // we should get max of x, max of y for topRight 
    // we should get min of x, min of y for bottomLeft 
    const INF = Infinity
    let max_x = -INF
    let max_y = -INF
    let min_x = INF
    let min_y = INF
    for(const [x, y] of state){
      if(x>max_x){
        max_x = x
      } 
      if(x < min_x){
        min_x = x
      }
      if(y>max_y){
        max_y = y 
      } 
      if(y < min_y){
        min_y = y
      }
    }
    return {
      topRight: [max_x, max_y],
      bottomLeft: [min_x, min_y]
    }

};

const printCells = (state) => {
  const {topRight, bottomLeft} = corners(state);
  let state_repr = "";
  for(let y =bottomLeft[1]; y<=topRight[1]; y++){
    for(let x =bottomLeft[0]; x<=topRight[0]; x++){
      state_repr += x === bottomLeft[0] ? printCell([x, y], state) : ` ${printCell([x, y], state)}`
    }
    state_repr +='\n';
  }
  return state_repr;
};

const getNeighborsOf = ([x, y]) => {};

const getLivingNeighbors = (cell, state) => {};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;