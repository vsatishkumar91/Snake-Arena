let snakeDirection = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 1;
let currentScore = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

food = { x: 6, y: 7 };


musicSound.play();
let hiScore = localStorage.getItem("highScore");
if (hiScore === null) {
    hiscoreval = 0;
    localStorage.setItem("highScore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiScore);
    highScore.innerHTML = "High Score: " + hiScore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    snakeDirection = { x: 0, y: 0 } // Start the game
    moveSound.play();
    console.log(snakeDirection.x + " " + snakeDirection.y);
    switch (e.key) {
        
        case "ArrowUp":
            if(snakeDirection.y === 0) {
                snakeDirection.x = 0;
                snakeDirection.y = -1;
            }
            break;

        case "ArrowDown":
            if(snakeDirection.y === 0) {
                snakeDirection.x = 0;
                snakeDirection.y = 1;
            }
            break;

        case "ArrowLeft":
            if(snakeDirection.x === 0) {
                snakeDirection.x = -1;
                snakeDirection.y = 0;
            }
            break;

        case "ArrowRight":
            if(snakeDirection.y === 0) {
                snakeDirection.x = 1;
                snakeDirection.y = 0;
            }
            break;

        default:
            break;
    }

});

function main(time) {
    window.requestAnimationFrame(main);
    if ((time - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = time;

    gameEngine();
}

function gameEngine() {
    if (isGameFinish()) {
        gameOverSound.play();
        musicSound.pause();
        snakeDirection = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        snakeDirection = { x: 0, y: 0 };
        musicSound.play();
        currentScore = 0;
    }

    if(isFoodCaptured()) {
        foodSound.play();
        currentScore += 1;
        if(currentScore>hiscoreval){
            hiscoreval = currentScore;
            localStorage.setItem("highScore", JSON.stringify(hiscoreval));
            highScore.innerHTML = "High Score: " + hiscoreval;
        }
        score.innerHTML = "Score: " + currentScore;
        speed = currentScore/5 + 1;
        level.innerHTML = "Level : " + Math.floor(speed);
        snakeArr.unshift({x: snakeArr[0].x + snakeDirection.x, y: snakeArr[0].y + snakeDirection.y});        
        food = getNewFood();
    }

    moveSnake();
    displaySnakeOnBoard();
    displayFoodOnBoard();

}

function isGameFinish() {
    // If snake head touches to its own body
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }
    // If snake touches to wall
    if (snakeArr[0].x >= 25 || snakeArr[0].x <= 0 || snakeArr[0].y >= 25 || snakeArr[0].y <= 0) {
        return true;
    }

    return false;
}

function isFoodCaptured() {
    return snakeArr[0].y === food.y && snakeArr[0].x === food.x;
}

function getNewFood() {
    let a = 2;
    let b = 23;
    return {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
}

function moveSnake() {
    // move body of snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    // move snake head
    snakeArr[0].x += snakeDirection.x;
    snakeArr[0].y += snakeDirection.y;
}

function displaySnakeOnBoard() {
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('snake-head');
            snakeElement.classList.add(getOpenMouthClass());
            ;
        }
        else{
            snakeElement.classList.add('snake-body');
        }
        e
        board.appendChild(snakeElement);
    });

}

function displayFoodOnBoard() {
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('snake-food')
    board.appendChild(foodElement);
}

function getOpenMouthClass() {
    if(snakeDirection.x == 0) {
        if(snakeDirection.y == 1) {
            return "down";
        } else {
            return "up";
        }
    }
    else if(snakeDirection.y == 0) {
        if(snakeDirection.x == 1) {
            return "right";
        } else {
            return "left";
        }
    }
    return "";
}
