//
// variables
//

// size of square tiles in pixels
const SQUARE_SIZE = 25;

// Informations about the game status
const game = {
    status: "playing",
    score: 0,
    speed: 100
}

const board = {
    width:  30,
    height: 30,
    colour: "lightgreen",
}

const snake = {
    length: 3,
    headColour: "red",
    bodyColour: "green",
    headPosition: {x:board.width / 2, y:board.height / 2},
    direction: RIGHT,
    hasEaten: false,
    body: [
        {x:board.width / 2,     y: board.height / 2},
        {x:board.width / 2 - 1, y: board.height / 2},
        {x:board.width / 2 - 2, y: board.height / 2},
    ]
}

const fruit = {
    colour: "blue",
    position: {x: get_random_number(0, board.width - 1), y: get_random_number(0, board.height - 1)},
}

//
// Functions
//

function moveSnake() {
    if (snake.direction === RIGHT) {
        if (snake.headPosition.x === board.width - 1) {
            snake.headPosition.x = 0;
        } else {
            snake.headPosition.x += 1;
        }
    }
    if (snake.direction === LEFT) {
        if (snake.headPosition.x === 0) {
            snake.headPosition.x = board.width - 1;
        } else {
            snake.headPosition.x -= 1;
        }
    }
    if (snake.direction === UP) {
        if (snake.headPosition.y === 0) {
            snake.headPosition.y = board.height - 1;
        } else {
            snake.headPosition.y -= 1;
        }
    }
    if (snake.direction === DOWN) {
        if (snake.headPosition.y === board.height - 1) {
            snake.headPosition.y = 0;
        } else {
            snake.headPosition.y += 1;
        }
    }
}

function eatFruit() {
    if (snake.headPosition.x === fruit.position.x &&
        snake.headPosition.y === fruit.position.y ) {
        snake.hasEaten = true;
        game.score += 10;
        snake.length += 1;
    }
}

function respawnFruit() {
    if (snake.hasEaten === true) {
        fruit.position.x = get_random_number(0, board.width - 1);
        fruit.position.y = get_random_number(0, board.height - 1);
        snake.hasEaten = false;
    }
}

function loop() {
    if (game.status === "playing") {
        moveSnake();
        eatFruit();
        snake_body_movement(snake.body, snake.length, snake.headPosition, snake.hasEaten);
        respawnFruit();
    }
}

function draw() {
    drawBoard(board.width, board.height, board.colour);
    for (var i = 0; i < snake.length; i++) {
        drawSquare(snake.body[i].x, snake.body[i].y, snake.bodyColour);
    }
    drawSquare(snake.headPosition.x, snake.headPosition.y, snake.headColour);
    drawSquare(fruit.position.x, fruit.position.y, fruit.colour);
    drawScore(game.score);
}

function onKeyDown(keyCode) {
    if (keyCode === ARROW_RIGHT && snake.direction != LEFT) {
        snake.direction = RIGHT;
    }
    if (keyCode === ARROW_LEFT && snake.direction != RIGHT) {
        snake.direction = LEFT;
    }
    if (keyCode === ARROW_UP && snake.direction != DOWN) {
        snake.direction = UP;
    }
    if (keyCode === ARROW_DOWN && snake.direction != UP) {
        snake.direction = DOWN;
    }
}