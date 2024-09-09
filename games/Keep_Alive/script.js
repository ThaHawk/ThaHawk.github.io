
console.log("script.js connected");

const maxTime = 60; // time in seconds
var curTime = maxTime;    // current time

const maxWoodStores = 10;
var curWoodStores = 0;

const maxFireLevel = 10;
var curFireLevel = 0;

var woodCooldown = 0;

const labelTimeRemaining = document.querySelector(".timeRemaining");
const labelFireLevel = document.querySelector(".labelFireLevel");
const labelWoodStores = document.querySelector(".labelWoodStores");
const btnStartGame = document.querySelector(".btnStartGame");
const imgFire = document.querySelector(".imgFire");
const btnAddFuel = document.querySelector(".btnAddFuel");
const btnChopWood = document.querySelector(".btnChopWood");
const gameStateText = document.querySelector(".gameStateText");

var gameClock;
var gameState = 0; //0 off, 1 on, 2 loss, 3 win

// init
stopGame();

// Event listeners
btnChopWood.addEventListener( "click" , addWoodStores );
btnAddFuel.addEventListener( "click" , addFuel );

/**
 * @returns true if game should end
 */
function gameEnd(){
  if (curFireLevel <= 0){
    console.log("Fire extinguished.");
    gameState = 2; //0 off, 1 on, 2 loss, 3 win
    return true;
  }

  if (curTime <= 0){
    console.log("Time's up.");
    gameState = 3; //0 off, 1 on, 2 loss, 3 win
    return true;
  }

  // if no conditions are met, return false telling the game to go on
  return false;
}

/**
 * Runs 10 times per second to check the state of the game.
 */
function ticker() {
  // check if game needs to end
  if (gameEnd()){
    console.log("Stopping game.")
    stopGame();
    return;
  }

  // some chance to lower flame level
  var percentToReduce = 5;
  reduceFlame(percentToReduce);

  // lower cooldown
  woodCooldown -= 1;
  if (woodCooldown <= 0)
  {
    btnChopWood.disabled = false;
  }

  // tick down the time
  curTime -= 0.1;
  labelTimeRemaining.textContent = curTime.toFixed(1);

}

/**
 * some chance to reduce flame
 */
function reduceFlame(chance) {
  if (Math.random()*100 < chance){
    removeFire();
  }
}

/**
 * Stops all concurrent processes and resets labels
 */
function stopGame() {
  // turn game buttons gray
  btnAddFuel.disabled = true;
  btnChopWood.disabled = true;
  // reset variables
  curFireLevel = 0;
  curWoodStores = 0;
  curTime = maxTime;
  // stop counting down
  clearInterval(gameClock);
  // reset labels
  labelFireLevel.textContent = curFireLevel;
  labelWoodStores.textContent = curWoodStores;
  labelTimeRemaining.textContent = curTime;
  // change button to "Press to stop";
  btnStartGame.textContent = "Press to start";
  btnStartGame.addEventListener("click", startGame);
  btnStartGame.removeEventListener("click", stopGame);
  // show win or loss
  
  if (gameState == 2) { // loss
    gameStateText.textContent = "You Lose!";
    gameStateText.style.color = "Red";
  }
  else if (gameState == 3) { // win
    gameStateText.textContent = "You Win!";
    gameStateText.style.color = "Green";
  }

}

// FUNCTION: start new game
function startGame() {
  // set start variabels
  curTime = maxTime;
  curFireLevel = maxFireLevel/2;
  curWoodStores = 0;

  // turn game buttons on
  btnChopWood.disabled = false;

  // start counting down
  gameClock = setInterval( ticker, 100 );

  // change button to "Press to stop";
  btnStartGame.textContent = "Press to stop";
  btnStartGame.addEventListener("click", stopGame);
  btnStartGame.removeEventListener("click", startGame);

  // set labels
  labelFireLevel.textContent = curFireLevel;
  gameStateText.textContent = "";

}

// FUNCTION: update wood stores
function addWoodStores() {
  if (woodCooldown <= 0 && !woodAtMax()){
    curWoodStores += 1;
    labelWoodStores.textContent = curWoodStores;
    woodCooldown = 5; // adds a two second cooldown
    btnChopWood.disabled = true; // gray out button while cold
    btnAddFuel.disabled = false;
  }
  else {
    console.log("Can't chop more trees!");
  }
}


function addFuel() {
  if (curWoodStores > 0 && !fireAtMax()){
    addFire();
    removeWood();
  }

  if (fireAtMax()){
    console.log("Log Wasted!");
  }
}

/**
 * adds wood and updates label
 */
function addWood() {
  curWoodStores++;
  labelWoodStores.textContent = curWoodStores;
}

/**
 * adds wood and updates label
 */
function removeWood() {
  curWoodStores--;
  labelWoodStores.textContent = curWoodStores;
}

/**
 * increases flame level by one and updates label
 */
function addFire() {
  curFireLevel++;
  labelFireLevel.textContent = curFireLevel;
}
/**
 * increases flame level by one and updates label
 */
function removeFire() {
  curFireLevel--;
  labelFireLevel.textContent = curFireLevel;
}

/**
 * checks to see if wood is at its capacity
 * @returns true if wood stores are at capacity
 */
function woodAtMax() {
  if (curWoodStores >= maxWoodStores) {
    return true;
  }
  else {
    return false;
  }
}

/**
 * Checks if the fire is at its capacity
 * @returns true if maxed out
 */
function fireAtMax() {
  if (curFireLevel >= maxFireLevel) {
    return true;
  }
  else {
    return false;
  }
}

