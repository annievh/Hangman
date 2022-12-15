let vocab;
let wordsArr;
let catSelect;

window.onload = function () {
  // Ajax call
  let url = "vocabularies.json";
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      build(xmlhttp.responseText);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  // end of ajax call

  //loop for keyboard button
  const keysBtn = document.querySelectorAll(".keyBtn");
  keysBtn.forEach((btn) => {
    btn.addEventListener("click", letterPress);
  });

  //button variables
  const newGameBtn = document.querySelector("#newGameBtn");
  const countriesBtn = document.querySelector("#countriesBtn");
  const flowersBtn = document.querySelector("#flowersBtn");
  const legalBtn = document.querySelector("#legalBtn");
  const temporalBtn = document.querySelector("#temporalBtn");
  const okBtn = document.querySelector("#okBtn");
  const resetGameBtn = document.querySelector("#resetGameBtn");

  //button listeners
  newGameBtn.addEventListener("click", startGame);
  resetGameBtn.addEventListener("click", newGame);
  countriesBtn.addEventListener("click", catPick0);
  flowersBtn.addEventListener("click", catPick1);
  legalBtn.addEventListener("click", catPick2);
  temporalBtn.addEventListener("click", catPick3);
  okBtn.addEventListener("click", ok);
};

function newGame(){
  location.reload(true); 
}

function disableLetters(){
  const keysBtn = document.querySelectorAll(".keyBtn");
  keysBtn.forEach((btn) => {
    btn.classList.add("disabled");
    btn.style.color = "white";
  });

}
function letterPress() {
  let letter = this.innerHTML;
  //disable letter
  this.classList.add("disabled");
  this.style.color = "white";

  GameController.processLetter(letter);

  GameController.report();

  let report = GameController.report();
  console.log(report);
  let guessesRemaining = report.guessesRemaining;
  let guess = report.guess;
  let word = report.word;
  if (word.includes(letter)) { 
    let guessArea = document.getElementById("word");
    guessArea.innerHTML = guess;
  } else { 
    let html = "";
    html += '<img src ="guess';
    html += guessesRemaining;
    html += '.png" alt="a set of gallows" id ="img">';
    let imageContainer = document.getElementById("image");
    imageContainer.innerHTML = html;
  }

  let gameState = report.gameState;
  if (gameState == 'GAME_OVER_WIN' || gameState == 'GAME_OVER_LOSE'){
    disableLetters();
    document.getElementById("gameOverScreen").classList.remove("d-none");
    if(gameState == 'GAME_OVER_WIN'){
      document.getElementById("popUpWin").classList.remove("d-none");
    } else if(gameState == 'GAME_OVER_LOSE'){
      document.getElementById("popUpLost").classList.remove("d-none");
    }
  }

}
function catPick0() {
  catSelect = 0;

  let html = "";
  html += '<h2>';
  html += 'Countries';
  html += '</h2>';
  let heading = document.getElementById("category");
  heading.innerHTML = html;

  console.log(catSelect);
}
function catPick1() {
  catSelect = 1;

  let html = "";
  html += '<h2>';
  html += 'Flowers';
  html += '</h2>';
  let heading = document.getElementById("category");
  heading.innerHTML = html;
  console.log(catSelect);
}
function catPick2() {
  catSelect = 2;
  let html = "";
  html += '<h2>';
  html += 'Legal';
  html += '</h2>';
  let heading = document.getElementById("category");
  heading.innerHTML = html;
  console.log(catSelect);
}
function catPick3() {
  catSelect = 3;

  let html = "";
  html += '<h2>';
  html += 'Temporal';
  html += '</h2>';
  let heading = document.getElementById("category");
  heading.innerHTML = html;
  console.log(catSelect);
}
function build(text) {
  let data = JSON.parse(text);
  vocab = data.vocabularies;
  let catArr = [];
  wordsArr = [];
  for (let i = 0; i < vocab.length; i++) {
    let temp = vocab[i];
    catArr.push(temp.categoryName);
    wordsArr.push(temp.words);
  }

}
function startGame() {
  document.querySelector("#newGameScreen").classList.add("d-none");
  document.querySelector("#categorySelect").classList.remove("d-none");
}

function hidePanel() {
  document.getElementById("categorySelect").classList.add("d-none");
}
function hideNewGame() {
  document.getElementById("newGameBtn").classList.add("d-none");
}

function blank(word) {
  let arr = word.split("");
  let blankStr = "";
  arr.forEach((letter) => (blankStr += " _"));
  return blankStr;
}
function getSelected() {
  let selected;

  if (document.getElementById("countriesBtn").clicked == true) {
    selected = wordsArr[0];
  } else if (document.getElementById("flowersBtn").clicked == true) {
    selected = wordsArr[1];
  } else if (document.getElementById("legalBtn").click == true) {
    selected = wordsArr[2];
  } else {
    selected = wordsArr[3];
  }
  let btn = document.querySelector("#btn btn-warning btn-md col-5 p-2 m-2");
  switch (catSelect) {
    case 0:
      btn = document.getElementById("countriesBtn");
      selected = wordsArr[0];
      break;
    case 1:
  }
  return selected;
}

function randomWord(array) {
  let random;
  random = wordsArr[catSelect][Math.floor(Math.random() * array.length)];
  return random;
}
function ok() {
  if (catSelect != null){
  hidePanel();

  let cat = getSelected();
  console.log(cat);
  let word = randomWord(cat);

  console.log(word);

  GameController.newGame(word);
  document.querySelector("#gameBoard").classList.remove("d-none");

  blank(word);

  let guessArea = document.getElementById("word");
  guessArea.innerHTML = blank(word);

  document.getElementById("image").classList.remove("d-none");
}}


