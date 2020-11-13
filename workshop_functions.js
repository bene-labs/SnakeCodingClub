//
// Draw functions
//

function drawSquare(x, y, colour) {
    const gameBoard = document.getElementById("gameBoard").getContext("2d");
    gameBoard.fillStyle = colour;
    gameBoard.fillRect(x * SQUARE_SIZE, y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
}

function drawBoard(width, height, colour) {
    const gameBoard = document.getElementById("gameBoard").getContext("2d");

    gameBoard.canvas.width = width * SQUARE_SIZE;
    gameBoard.canvas.height = height * SQUARE_SIZE;
    gameBoard.fillStyle = colour;
    gameBoard.fillRect(0, 0, width * SQUARE_SIZE, height * SQUARE_SIZE);
}

function drawScore(score) {
    const scoreDiv = document.getElementById("score");

    scoreDiv.innerHTML = "Score " + score;
}

function drawSnakeBody(snakeBody, snakeBodyColour, snakeLength) {
    for (var i = 1; i < snakeLength; i++) {
        drawSquare(snakeBody[i].x, snakeBody[i].y, snakeBodyColour);
    }
}

//
// Snake logic functions
//

function snakeBodyMovement(snake_body, snake_length, snake_head, fruit_eaten) {
    snake_body.unshift({x: snake_head.x, y: snake_head.y})
    if (fruit_eaten === false) {
        snake_body.pop()
    }
    if (snake_bite_body(snake_body, snake_head, snake_length) === true) {
        game.status = "stop"
        show_game_over();
    }
}

function snake_bite_body(snake_body, snake_head, snake_length)
{
    for (var i = 1; i < snake_length; i += 1) {
        if (snake_body[i].x === snake_head.x && snake_body[i].y === snake_head.y) {
            return (true)
        }
    }
    return (false)
}

function show_game_over() {
    const div = document.getElementById('gameOver');
    div.style.visibility = "visible"
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

//
// Game Logic
//

var canvas;
var context;
var oldTimeStamp;
var accumulator = 0;

window.onload = init;

function init(){
    canvas = document.getElementById('gameBoard');
    context = canvas.getContext('2d');

    // Start the first frame request
    window.requestAnimationFrame(game_loop);
    document.addEventListener("keydown", (event) => {
        event.preventDefault();
            onKeyDown(event.code);
    });
}

function game_loop(timeStamp) {
    //Calculate the number of seconds passed
    //since the last frame
    var secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    if (secondsPassed) {
        accumulator = accumulator + (secondsPassed * 1000)
    }
    const speed = game && game.speed ? game.speed : 100;
    if (accumulator >  speed) {
        accumulator = 0;
        loop();
    }
    draw();
    // Keep requesting new frames
    window.requestAnimationFrame(game_loop);
}