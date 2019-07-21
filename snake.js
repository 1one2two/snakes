var ru;
window.onload = function () {
    pg_ = document.getElementById("sc");
    pan_ = pg_.getContext("2d");
    pg = document.getElementById("pg");
    pan = pg.getContext("2d");
    document.addEventListener("keydown", env => move(String(env.keyCode)));
    ru = setInterval(game, 1000 / 4);
    ressets();
}

w = 20;
function ressets() {
    snake_x = snake_y = 10;
    move_x = 0;
    move_y = 0;
    food_x = food_y = 15;
    snake = [];
    snake_length = 5;
    point = 0;
    over = false;
}

function game() {
    snake_x += move_x;
    snake_y += move_y;

    snake_x = snake_x < 0 ? w - 1 : snake_x;
    snake_x = snake_x > w - 1 ? 0 : snake_x;
    snake_y = snake_y < 0 ? w - 1 : snake_y;
    snake_y = snake_y > w - 1 ? 0 : snake_y;

    if (move_x != move_y)
        snake.map((value) => {
            if (value.x == snake_x && value.y == snake_y) {
                over = true;
            }
        })

    if (over) {
        clearInterval(ru);
        alert("Game over");
        ressets();
        ru = setInterval(game, 1000 / 8);
    }

    if (snake_x == food_x && snake_y == food_y) {
        snake_length += 1;
        point += 1;
        food_x = Math.floor(Math.random() * w);
        food_y = Math.floor(Math.random() * w);

        pan_.fillStyle = "#FFFFFF";
        pan_.fillRect(0, 0, pg_.width, pg_.height);

        pan_.fillStyle = "#000000";
        pan_.font = "20px Arial";
        pan_.fillText("Score:" + String(point), 10, 20);
    }

    snake.push({ x: snake_x, y: snake_y });
    while (snake.length > snake_length) snake.shift();

    pan.beginPath();
    pan.fillStyle = "#82E762";//green
    pan.fillRect(0, 0, pg.width, pg.height)

    pan.fillStyle = "#62BEE7";//body blue
    snake.map((value, index) => { if (index < snake.length - 1) pan.fillRect(value.x * w + 1, value.y * w + 1, w - 1, w - 1); })

    pan.fillStyle = "#6292E7";//head blue
    pan.fillRect(snake[snake.length - 1].x * w, snake[snake.length - 1].y * w, w - 1, w - 1)

    pan.fillStyle = "red";
    pan.fillRect(food_x * w, food_y * w, w - 1, w - 1);

    var img = document.getElementById("apple");
    pan.drawImage(img, food_x * w, food_y * w, w - 2, w - 2);
    //pan.fillStyle = "red";
    //pan.arc(food_x * w + 10, food_y * w + 10, 10, 0, 2 * Math.PI);
    //pan.fill();

    //pan.stroke();
}

function move(val) {
    switch (String(val)) {
        case "37":
            if ((move_x == move_y) || move_x === 0) {
                move_x = -1; move_y = 0;
            }
            break;
        case "38":
            if ((move_x == move_y) || move_y === 0) {
                move_x = 0; move_y = -1;
            }
            break;
        case "39":
            if ((move_x == move_y) || move_x === 0) {
                move_x = 1; move_y = 0;
            }
            break;
        case "40":
            if ((move_x == move_y) || move_y === 0) {
                move_x = 0; move_y = 1;
            }
            break;
    }
}

function keypush(env) {
    move(String(env.keyCode));
}