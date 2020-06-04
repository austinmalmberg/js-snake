import Snake from './snake.js';
import Food from './food.js';
import DIRECTIONS from './directions.js';

let lastRefresh = 0;

const gameBoard = document.getElementById('game-board');
const scoreCard = document.getElementById('score');

let food, snake;

const BOARD_SIZE = 21;

function main(timestamp) {
    // request a new animation frame
    window.requestAnimationFrame(main);

    // calculate time since last render to limit refresh rate
    const elapsed = timestamp - lastRefresh;

    // cap refresh rate to SNAKE_SPEED times per second
    if (elapsed < 1000 / snake.SNAKE_SPEED) return;

    // update last refresh time
    lastRefresh = timestamp;

    // game loop
    update();

    console.log(snake.gameOver);

    if (snake.gameOver) {
        if (snake.score === BOARD_SIZE * BOARD_SIZE) {
            // victory
        } else {
            // defeat
            console.log('you lose')
        }

        initNewGame();
    }

    draw();
}

function initNewGame() {
    snake = new Snake(gameBoard, BOARD_SIZE);
    food = new Food(gameBoard, BOARD_SIZE, snake);
}

function update() {
    if (lastDirectionEntered !== null) snake.setDirection(lastDirectionEntered);

    const [nextX, nextY] = snake.nextHeadPosition();
    snake.eatsFood = (food.x === nextX && food.y === nextY);

    snake.update();

    if (snake.eatsFood) {
        food.setRandomPosition(snake);
        snake.eatsFood = false;
    }
}

function draw() {
    // clear previous game board
    gameBoard.innerHTML = '';

    food.draw();
    snake.draw();

    scoreCard.innerText = snake.bodyLength;
}

let lastDirectionEntered = null;

document.addEventListener('keypress', (event) => {
    for (const direction of Object.values(DIRECTIONS)) {
        if (direction.keyCode === event.code) {
            lastDirectionEntered = direction;
        }
    }
});

// initialize variables
initNewGame();

// request the first animation frame
window.requestAnimationFrame(main);
