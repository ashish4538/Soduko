var numSelected = null;
var tileSelected = null;

var errors = 0;
let sudoku = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  
  let sudoku2 = JSON.parse(JSON.stringify(sudoku));//creates a deep copy only known method
  
  let changesMade = false;
  let fields = [];
  let counter = 0;
  let sudoku3;


 

  window.onload = function () {

    const constantValue = prompt("Please enter a constant value: -- (higher the value , lesser the difficulty and make it less than 80 )");

    // Check if the user entered a value and display it in an alert
    if (constantValue !== null || constantValue>80) {
      alert("You entered: " + constantValue);
    }
    generateRandomSudoku(constantValue);
    
   
    setGame();


  };



  function generateRandomSudoku(numbers) {
    while (!sudoku_complete() || sudoku_invalid(sudoku)) {
      // new empty sudoku
      sudoku3 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      sudoku = JSON.parse(JSON.stringify(sudoku3));
  
      // how many numbers are entered already?
      let numbersDone = 0;
  
      while (numbersDone < numbers) {
        let fieldX = Math.floor(Math.random() * 9);
        let fieldY = Math.floor(Math.random() * 9);
        let number = Math.floor(Math.random() * 9) + 1;
        //alert("" + fieldX + " " + fieldY + " " + number);
  
        if (sudoku3[fieldX][fieldY] === 0) {
          sudoku3[fieldX][fieldY] = number;
          if (duplicateNumberExists(sudoku3, fieldX, fieldY)) {
            sudoku3[fieldX][fieldY] = 0;
            continue;
          } else {
            numbersDone++;
          }
          //alert("" + numbersDone);
        }
      }
      sudoku = JSON.parse(JSON.stringify(sudoku3));
      solveSudoku1(sudoku,0,0);
     // solveSudoku();
    }
  }














  


 // tests if a sudoku is complete and returns either true or false
 function sudoku_complete() {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (sudoku[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }
  
  //Tests if there are any duplicate numbers in a sudoku
  function sudoku_invalid(s) {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (duplicateNumberExists(s, i, j)) {
          return true;
        }
      }
    }
    return false;
  }





function solveSudoku1(grid,row,col){
    
    if(row==8 && col==9)return true;
    if(col==9){
        row++;
        col=0;
    }
    if(grid[row][col]>0){
        return  solveSudoku1(grid,row,col+1);
    }
    for(let i=1;i<=9;i++){
        let ngrid=JSON.parse(JSON.stringify(grid));
        ngrid[row][col]=i;
        if(!duplicateNumberExists(ngrid,row,col)){
             grid[row][col]=i;
             if(solveSudoku1(grid,row,col+1))return true;
        }
        grid[row][col]=0;
    }
    return false;
}









  // solves a sudoku

  
  // returns true if there are two equal numbers in the same row
  function duplicateNumberInRow(s, fieldY) {
    numbers = new Array();
    for (var i = 0; i < 9; i++) {
      if (s[i][fieldY] !== 0) {
        if (numbers.includes(s[i][fieldY])) {
          return true;
        } else {
          numbers.push(s[i][fieldY]);
        }
      }
    }
    return false;
  }
  
  // returns true if there are two equal numbers in the same col
  function duplicateNumberInCol(s, fieldX) {
    numbers = new Array();
    for (var i = 0; i < 9; i++) {
      if (s[fieldX][i] !== 0) {
        if (numbers.includes(s[fieldX][i])) {
          return true;
        } else {
          numbers.push(s[fieldX][i]);
        }
      }
    }
    return false;
  }
  
  // returns true if there are two equal numbers in the same box
  function duplicateNumberInBox(s, fieldX, fieldY) {
    boxX = Math.floor(fieldX / 3);
    boxY = Math.floor(fieldY / 3);
    numbers = new Array();
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        x = i + 3 * boxX;
        y = j + 3 * boxY;
        if (s[x][y] !== 0) {
          if (numbers.includes(s[x][y])) {
            return true;
          } else {
            numbers.push(s[x][y]);
          }
        }
      }
    }
    return false;
  }
  
  // returns true if there are two equal numbers in the same row, col or box
  function duplicateNumberExists(s, fieldX, fieldY) {
    if (duplicateNumberInRow(s, fieldY)) {
      return true;
    }
    if (duplicateNumberInCol(s, fieldX)) {
      return true;
    }
    if (duplicateNumberInBox(s, fieldX, fieldY)) {
      return true;
    }
    return false;
  }
  


  

  





function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if(sudoku3[r][c]!=0){
                tile.innerText = sudoku3[r][c].toString();
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (sudoku[r][c].toString() == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

console.log(sudoku);