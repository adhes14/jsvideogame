const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const livesSpan = document.querySelector('#lives');
const timeSpan = document.querySelector('#time');
const recordSpan = document.querySelector('#record');
const resultP = document.querySelector('#result');

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let timestart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined
};

const giftPosition = {
    x: undefined,
    y: undefined
};

let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        winGame();
        return;
    }

    if (!timestart) {
        timestart = Date.now();
        timeInterval = setInterval(showTime, 200);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    showLives();

    enemyPositions = [];
    game.clearRect(0,0,canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

            if (col == 'O' && !playerPosition.x && !playerPosition.y) {
                playerPosition.x = posX;
                playerPosition.y = posY;
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({x: posX, y: posY});
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;
    if (giftCollision) {
        winLevel();
    };

    const enemyCollition = enemyPositions.find(e => {
        const enemyCollitionX = e.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollitionY = e.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollitionX && enemyCollitionY;
    });

    if (enemyCollition) {
        loseLevel();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

moveByKeys = {
    ArrowUp: moveUp,
    ArrowLeft: moveLeft,
    ArrowRight: moveRight,
    ArrowDown: moveDown,
};

window.addEventListener('keydown', e => moveByKeys[e.key]());

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function winLevel() {
    console.log('You win this level');
    level++;
    startGame();
}

function loseLevel() {
    console.log('You crashed with an enemy');
    lives--;
    console.log('lives:', lives);
    if (lives <= 0) {
        level = 0;
        lives = 3;
        clearInterval(timeInterval);
        timestart = undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function winGame() {
    console.log('You won the game');
    clearInterval(timeInterval);
    const recordTime = localStorage.getItem('record_time');
    if (recordTime) {
        if (recordTime >= timePlayer) {
            localStorage.setItem('record_time', timePlayer);
            resultP.textContent = 'You did a better record!!! congratulations 🥳';
        } else {
            resultP.textContent = 'What a shame 😥!!! You didn\'t get a better record';
        }
    } else {
        localStorage.setItem('record_time', timePlayer);
        resultP.textContent = 'This is your first time, now you have the challange to overcome your own result!';
    }
}

function moveUp() {
    if (playerPosition.y - elementsSize + 1 > elementsSize)
        playerPosition.y -= elementsSize;
    startGame();
}
function moveLeft() {
    if (playerPosition.x - elementsSize + 1 > elementsSize)
        playerPosition.x -= elementsSize;
    startGame();
}
function moveRight() {
    if (playerPosition.x < canvasSize )
        playerPosition.x += elementsSize;
    startGame();
}
function moveDown() {
    if (playerPosition.y < canvasSize)
        playerPosition.y += elementsSize;
    startGame();
}

function showLives() {
    const hearts = Array(lives).fill(emojis['HEART']);
    livesSpan.innerHTML = "";
    hearts.forEach(heart => livesSpan.append(heart));
}

function showTime() {
    console.log('hello');
    timePlayer = Date.now() - timestart;
    timeSpan.textContent = timePlayer;
}

function showRecord() {
    recordSpan.textContent = localStorage.getItem('record_time');
}
