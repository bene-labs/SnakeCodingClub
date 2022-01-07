//
// variables
//

// size of square tiles in pixels
const SQUARE_SIZE = 25;

// Informations about the game status
const game = {
    status: "playing",
    score: 0,
    speed: 100,
    active_fruits: 0,
    max_fruits: 1
}

const board  = {
    width: 30,
    height: 20,
    color: "#3f4540"
}

const snake_settings = {
    length: 5,
    direction: RIGHT,
    head_starting_pos: {x: Math.trunc(board.width / 2), y: Math.trunc(board.height / 2)},
}

const snake = {
    color: "green",
    length: snake_settings.length,
    direction: snake_settings.direction,
    head_pos: snake_settings.head_starting_pos,
    body: createSnakeBody(snake_settings.length, snake_settings.direction, snake_settings.head_starting_pos)
}

let fruits = {
    positions: [],
    color: "red",
}

//
// Functions
//

function createSnakeBody(length, direction, head_pos) {
    let xIncrement = 0
    let yIncrement = 0
    let body = [{x: head_pos.x, y: head_pos.y}]

    switch (String(direction)) {
        case "Up":
            yIncrement = 1
            break
        case "Down":
            yIncrement = -1
            break
        case "Right":
            xIncrement = -1
            break
        case "Left":
            xIncrement = 1
            break
    }

    for (let i = 1; i < length; i++) {
        body.push({x: body[i-1].x + xIncrement, y: body[i-1].y + yIncrement})
    }
    return body
}

function moveSnakeHead() {
    switch (snake.direction) {
        case UP:
            snake.head_pos.y = (snake.head_pos.y > 0 ? snake.head_pos.y - 1 : board.height - 1)
            break
        case DOWN:
            snake.head_pos.y = (snake.head_pos.y < board.height - 1 ? snake.head_pos.y + 1 : 0)
            break
        case LEFT:
            snake.head_pos.x = (snake.head_pos.x > 0 ? snake.head_pos.x - 1 : board.width - 1)
            break
        case RIGHT:
            snake.head_pos.x = (snake.head_pos.x < board.width - 1 ? snake.head_pos.x + 1 : 0)
            break
        default:
            break
    }
}

function getAvailableSpaces() {
    let availableSpaces = []
    for (let y = 0; y < board.height; y++) {
        for (let x = 0; x < board.width; x++) {
            if (!snake.body.some(obj => obj.x === x && obj.y === y)) {
                availableSpaces.push({x, y})
            }
        }
    }
    return availableSpaces
}

function spawnFruitIfMissing() {

    if (game.active_fruits < game.max_fruits) {
        let availableSpaces = getAvailableSpaces()
        if (availableSpaces.length !== 0) {
            fruits.positions.push(availableSpaces[getRandomNumber(0, availableSpaces.length - 1)])
            game.active_fruits += 1
        }
    }
}

function tryEatFruits() {
    fruits.positions = fruits.positions.filter(obj => !(obj.x === snake.head_pos.x && obj.y === snake.head_pos.y))
    game.score += game.active_fruits - fruits.positions.length
    snake.length += game.active_fruits - fruits.positions.length
    console.log(`fruits: ${game.active_fruits}, left: ${fruits.positions.length}`)
    game.active_fruits = fruits.positions.length
}

function loop() {
    if (!(document.getElementById('gameOver').style.visibility === "visible")) {
        moveSnakeHead()
        snakeBodyMovement(snake.body, snake.length, snake.head_pos, game.score)
        tryEatFruits()
        spawnFruitIfMissing()
    }
}

function draw() {
    drawBoard(board.width, board.height, board.color)
    drawSnakeBody(snake.body, snake.color, snake.length)

    drawSquare(snake.body[0].x, snake.body[0].y, "#006400") // draws the head of the snake

    // draw fruits
    for (let position of fruits.positions) {
        drawSquare(position.x, position.y, fruits.color)
    }

    drawScore(game.score)
}

function onKeyDown(keyCode) {
    if (keyCode === ARROW_RIGHT && snake.direction !== LEFT && snake.direction !== RIGHT) {
        snake.direction = RIGHT;
    }
    else if (keyCode === ARROW_LEFT && snake.direction !== RIGHT && snake.direction !== LEFT) {
        snake.direction = LEFT;
    }
    else if (keyCode === ARROW_UP && snake.direction !== DOWN && snake.direction !== UP) {
        snake.direction = UP;
    }
    else if (keyCode === ARROW_DOWN && snake.direction !== UP && snake.direction !== DOWN) {
        snake.direction = DOWN;
    }
}