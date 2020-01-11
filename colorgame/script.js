var colorNum = 6;
var colors = [];
var pickedColor;
var h1Background = "steelblue";
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  // Mode buttons event listeners
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      if (!this.classList.contains("selected")) {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        this.textContent === "Easy" ? (colorNum = 3) : (colorNum = 6);
        reset();
      }
    });
  }
}

function setupSquares() {
  // Squares event listeners
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
      var clickedColor = this.style.backgroundColor;
      // Correct guess
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColor(pickedColor);
        h1.style.backgroundColor = pickedColor;
        resetButton.textContent = "Play Again?";
      }
      // Wrong guess
      else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(colorNum);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  h1.style.backgroundColor = h1Background;
  resetButton.textContent = "New Colors";
  // Update colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else squares[i].style.display = "none";
  }
}

function changeColor(color) {
  // Loop through all squares
  for (var i = 0; i < squares.length; i++) {
    // Change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // Make an array
  var arr = [];
  // Add num random colors to array
  for (var i = 0; i < num; ++i) {
    arr[i] = randomColor();
  }
  // Return that array
  return arr;
}

function randomColor() {
  // Pick values between 0 - 255
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  var color = "rgb(" + red + ", " + green + ", " + blue + ")";
  return color;
}

// Reset button
resetButton.addEventListener("click", function() {
  reset();
});
