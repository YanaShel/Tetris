const main = document.querySelector('.main');

const playField = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,2,0,0,2,2],
    [0,0,0,0,2,2,0,0,2,2],
];

const GAME_SPEED = 400;

const draw = () => {
    let mainInnerHtml = '';
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                mainInnerHtml += '<div class="cell movingCell"></div>'
            } else if (playField[y][x] === 2) {
                mainInnerHtml += '<div class="cell fixedCell"></div>'
            } else {
                mainInnerHtml += '<div class="cell"></div>'
            }
        }
    }
    main.innerHTML = mainInnerHtml;
};

const canTetroMoveDown = () =>  {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if(playField[y][x] === 1) {
                if (y === playField.length - 1 || playField[y + 1][x] === 2) {
                    return false;
                }
            }
        }
    }
    return true;
};

const moveTetroDown = () => {
    if (canTetroMoveDown()) {
        for (let y = playField.length - 1; y >= 0; y--) {
            for (let x = 0; x < playField[y].length; x++) {
                if (playField[y][x] === 1) {
                    playField[y + 1][x] = 1;
                    playField[y][x] = 0;
                }
            }
        }
    }  else {
        fixTetro();
    }
};

const canTetroMoveLeft = () => {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if(playField[y][x] === 1) {
                if (x === 0 || playField[y][x - 1] === 2) {
                    return false;
                }
            }
        }
    }
    return true;
};

const moveTetroLeft = () => {
    if (canTetroMoveLeft()) {
        for (let y = playField.length - 1; y >= 0; y--) {
            for (let x = 0; x < playField[y].length; x++) {
                if (playField[y][x] === 1) {
                    playField[y][x - 1] = 1;
                    playField[y][x] = 0;
                }
            }
        }
    }
};

const canTetroMoveRight = () => {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if(playField[y][x] === 1) {
                if (x === 9 || playField[y][x + 1] === 2) {
                    return false;
                }
            }
        }
    }
    return true;
};

const moveTetroRight = () => {
    if (canTetroMoveRight()) {
        for (let y = playField.length - 1; y >= 0; y--) {
            for (let x = 9; x >= 0; x--) {
                if (playField[y][x] === 1) {
                    playField[y][x + 1] = 1;
                    playField[y][x] = 0;
                }
            }
        }
    }
};

const removeFullLines = () => {
    for (let y = 0; y < playField.length; y++) {
        let canRemoveLine = true;
        let count = 1;
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] !== 2) {
                canRemoveLine = false;
            }
        }
        if (canRemoveLine) {
            playField.splice(y, count);
            playField.unshift([0,0,0,0,0,0,0,0,0,0]);
        }
    }
};

const fixTetro = () => {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                playField[y][x] = 2;
            }
        }
    }

    removeFullLines();
    playField[0] = [0,0,0,1,1,0,0,0,0,0];
    playField[1] = [0,0,0,1,1,0,0,0,0,0];
};

draw();

const startGame = () =>{
    moveTetroDown();
    draw();
    setTimeout(startGame, GAME_SPEED);
};

setTimeout(startGame, GAME_SPEED);

document.onkeydown = function (evt) {
    switch (evt.key) {
        case `ArrowLeft`:
            moveTetroLeft();
            break;
        case `ArrowRight`:
            moveTetroRight();
            break;
        case `ArrowDown`:
            moveTetroDown();
            break;
    }
    draw();
};

