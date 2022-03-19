const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const height = canvas.height;
const width = canvas.width;
/*
0: white
1: red
2: blue
3: orange
4: green
5: yellow
6: undefined
*/
colors = {
  0: "blue",
  1: "green",
  2: "white",
  3: "yellow",
  4: "red",
  5: "rgb(255, 100, 0)",
  6: "grey"
}
class Rubiks {
  constructor(size) {
    this.cube = [];
    this.size = size;
    for (var i = 0; i < size; i++) {
      this.cube[i] = [];
      for (var j = 0; j < size; j++) {
        this.cube[i][j] = [];
        for (var k = 0; k < size; k++) {
          this.cube[i][j][k] = new Piece([i==0?0:i==size-1?1:6, j==0?2:j==size-1?3:6, k==0?4:k==size-1?5:6])
        }
      }
    }
  }
  draw(faceNumber, posX, posY, size, rot, reverse) {
    var arr = []
    for (var i = 0; i < this.size; i++) {
      arr[i] = []
      for (var j = 0; j < this.size; j++) {
        arr[i][j] = "white";
      }
    }
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        arr[i][j] = colors[
          this.cube[faceNumber == 0 ? 0 : faceNumber == 1 ? this.size - 1 : i]
          [faceNumber == 0 || faceNumber == 1 ? i : faceNumber == 4 || faceNumber == 5 ? j : faceNumber == 2 ? 0 : this.size - 1]
          [faceNumber == 4 ? 0 : faceNumber == 5 ? this.size - 1 : j].colors[Math.floor(faceNumber/2)]
        ];
      }
    }
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        var a = i;
        var b = j;
        for (var k = 0; k < rot; k++) {
          var c = a
          a = b;
          b = c;
          a = (this.size - 1) - a;
        }
        if (reverse) {
          b = (this.size - 1) - b;
        }
        context.fillStyle = arr[i][j];
        context.fillRect(posX + a * size, posY + b * size, size, size);
        context.strokeStyle = "black";
        context.strokeRect(posX + a * size, posY + b * size, size, size);
      }
    }
  }
  turn(axis, row, turns) {
    for (var p = 0; p < turns; p++) {
      var newSlice = [];
      for (var i = 0; i < this.size; i++) {
        newSlice[i] = [];
        for (var j = 0; j < this.size; j++) {
          newSlice[i][j] = [];
        }
      }
      for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
          var a, b, c, d, e, f;
          if (axis == 0) {
            a = row;
            b = (this.size - 1) - i;
            c = j;
            e = 2;
            f = 1;
          }
          if (axis == 1) {
            a = j;
            b = row;
            c = (this.size - 1) - i
            e = 2;
            f = 0;
          }
          if (axis == 2) {
            a = (this.size - 1) - i;
            b = j;
            c = row;
            e = 0;
            f = 1;
          }
          //change position
          newSlice[j][i] = this.cube[a][b][c];
          //swap 2nd and 3rd color
          var d = newSlice[j][i].colors[e];
          newSlice[j][i].colors[e] = newSlice[j][i].colors[f];
          newSlice[j][i].colors[f] = d;
        }
      }
      for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
          var a, b, c;
          if (axis == 0) {
            a = row;
            b = i;
            c = j;
          }
          if (axis == 1) {
            a = j;
            b = row;
            c = i;
          }
          if (axis == 2) {
            a = i;
            b = j;
            c = row;
          }
          this.cube[a][b][c] = newSlice[i][j]
        }
      }
    }
  }
  rotate(axis, time) {
    for (var i = 0; i < n; i++) {
      this.turn(axis, i, time)
    }
  }
  isSolved() {
    var solved = true;
    var cur = this.cube[0][0][0].colors[0];
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if (cur!=this.cube[0][i][j].colors[0]) {
          solved = false;
        }
        cur = this.cube[0][i][j].colors[0];
      }
    }
    var cur = this.cube[this.size - 1][0][0].colors[0];
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if (cur!=this.cube[this.size - 1][i][j].colors[0]) {
          solved = false;
        }
        cur = this.cube[this.size - 1][i][j].colors[0];
      }
    }
    var cur = this.cube[0][0][0].colors[1];
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if (cur!=this.cube[i][0][j].colors[1]) {
          solved = false;
        }
        cur = this.cube[i][0][j].colors[1];
      }
    }
    var cur = this.cube[0][this.size - 1][0].colors[1];
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if (cur!=this.cube[i][this.size - 1][j].colors[1]) {
          solved = false;
        }
        cur = this.cube[i][this.size - 1][j].colors[1];
      }
    }
    var cur = this.cube[0][0][0].colors[2];
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if (cur!=this.cube[i][j][0].colors[2]) {
          solved = false;
        }
        cur = this.cube[i][j][0].colors[2];
      }
    }
    var cur = this.cube[0][0][this.size - 1].colors[2];
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        if (cur!=this.cube[i][j][this.size - 1].colors[2]) {
          solved = false;
        }
        cur = this.cube[i][j][this.size - 1].colors[2];
      }
    }
    return solved;
  }
}
class Piece {
  constructor(colors) {
    this.colors = colors;
  }
}
posX = 250;
posY = 100;
n = 3;
size = 150 / n;
var cube = new Rubiks(n);
var started = false;
var timer = 0;

function draw(time) {
  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);
  context.closePath();
  context.strokeStyle = "white";
  cube.draw(3, posX + size * n, posY, size, 0, true);
  cube.draw(0, posX, posY + size * n, size, 1, true);
  cube.draw(4, posX + size * n, posY + size * n, size, 0, true);
  cube.draw(1, posX + size * n * 2, posY + size * n, size, 3, false);
  cube.draw(2, posX + size * n, posY + size * n * 2, size, 0, false);
  cube.draw(5, posX + size * n, posY + size * n * 3, size, 0, false);
  if (started) {
    timer += 1
  }
  if (cube.isSolved()) {
   started = false;
  }
  context.beginPath();
  context.fillStyle = "white";
  context.font = '20px serif';
  context.fillText((timer / 100), 450, 750)
  context.closePath();
}
setInterval(draw, 10);
