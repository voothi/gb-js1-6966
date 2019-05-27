class Board {
    /**
     * @param {Settings} settings объект настроек.
     * @param {Snake} snake объект змейки.
     */
    constructor(settings, snake) {
        this.settings = settings;
        this.snake = snake;

        this.boardEl = document.getElementById('game');
    }

    /**
     * Метод отрисовывает игровое поле.
     */
    renderBoard() {
        this.boardEl.innerHTML = '';
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardEl.appendChild(tr);

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    /**
     * Метод отрисовывает змейку на доске.
     */
    renderSnake() {
        const snakeHeadEl = this.getCellEl(this.snake.head.x, this.snake.head.y);
        snakeHeadEl.classList.add('snakeHead');
        const snakeBodyElems = this.getSnakeBodyElems(this.snake.body);
        if (snakeBodyElems) {
            snakeBodyElems.forEach(function(tdEl) {
                tdEl.classList.add('snakeBody');
            })
        }
    }

    clearBoard() {
        const tdElems = document.querySelectorAll('td');
        tdElems.forEach(function(td) {
            td.className = "";
        });
    }

    /**
     * Получаем ячейку таблицы.
     * @param {number} x координата по оси х.
     * @param {number} y координата по оси y.
     * @returns {HTMLTableCellElement} тег td
     */
    getCellEl(x, y) {
        return this.boardEl.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    /**
     * Получаем набор тегов td, представляющих тело змейки.
     * @param {array} bodyCoords массив объектов с координатами
     * @returns {HTMLTableCellElement[]|null} возвращается набор тегов td если были
     * переданы координаты, иначе null.
     */
    getSnakeBodyElems(bodyCoords) {
        if (bodyCoords.length > 0) {
            let bodyElems = [];
            for (let value of bodyCoords) {
                let elem = this.getCellEl(value.x, value.y);
                bodyElems.push(elem);
            }
            return bodyElems;
        }
        return null;
    }

    /**
     * Является ли следующий шаг, шагом в стену.
     * @param {Object} nextCellCoords - координаты ячейки, куда змейка собирается сделать шаг.
     * @param {number} nextCellCoords.x
     * @param {number} nextCellCoords.y
     * @returns {Boolean}
     */
    isNextStepToWall(nextCellCoords) {
        let nextCell = this.getCellEl(nextCellCoords.x, nextCellCoords.y);
        if (nextCell === null) {
            return true;
        }
        return false;
    }

    renderFood(coords) {
        const foodCell = this.getCellEl(coords.x, coords.y);
        foodCell.classList.add('food');
    }

    isHeadOnFood() {
        return this.boardEl.querySelector('.snakeHead').classList.contains('food');
    }
}
class Food {
    constructor(settings, snake, board) {
        this.x = null;
        this.y = null;

        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }

    init() {
        this.setNewFood();
    }

    setNewFood() {
        const coords = this.generateRandomCoordinates();
        this.board.renderFood(coords);
    }

    setFood() {
        this.board.renderFood(this);
    }

    generateRandomCoordinates() {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount);
            this.y = Math.floor(Math.random() * this.settings.rowsCount);
            let cell = this.board.getCellEl(this.x, this.y);

            if (cell === null) {
                continue;
            }
            if (cell.classList.contains('snakeHead') || cell.classList.contains('snakeBody')) {
                continue;
            }
            return this;
        }
    }
}
class Game {
    /**
     * @param {Settings} settings 
     * @param {Status} status
     * @param {Board} board
     * @param {Snake} snake
     * @param {Menu} menu
     * @param {Food} food
     */
    constructor(settings, status, board, snake, menu, food) {
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;

        this.tickIdentifier = null;
        this.messageEl = document.getElementById('message');
    }

    init() {
        this.board.renderBoard();
        this.board.renderSnake();
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this), this.newGame.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }

    start() {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.tickIdentifier = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    }

    pause() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            clearInterval(this.tickIdentifier);
        }
    }

    newGame() {
        console.log('new game');
    }

    doTick() {
        this.snake.changeHeadCoords();
        if (this.isGameLost()) {
            return;
        }
        if (this.board.isHeadOnFood()) {
            // this.snake.increaseBody();
            this.food.setNewFood();
        }
        // this.snake.changeBodyCoords();
        this.board.clearBoard();
        this.food.setFood();
        this.board.renderSnake();
    }

    isGameLost() {
        if (this.board.isNextStepToWall(this.snake.head)) {
            clearInterval(this.tickIdentifier);
            this.setMessage('Вы проиграли');
            return true;
        }
        return false;
    }

    /**
     * В зависимости от нажатой кнопки (вверх, вниз, влево, вправо) будет вызываться соответствующий метод.
     * @param {KeyboardEvent} event 
     */
    pressKeyHandler(event) {
        switch (event.key) {
            case "ArrowUp":
                this.snake.changeDirection('up');
                break;
            case "ArrowDown":
                this.snake.changeDirection('down');
                break;
            case "ArrowLeft":
                this.snake.changeDirection('left');
                break;
            case "ArrowRight":
                this.snake.changeDirection('right');
                break;
        }
    }

    setMessage(text) {
        this.messageEl.innerText = text;
    }
}
window.addEventListener('load', () => {
    const settings = new Settings({ speed: 5, winLength: 5 });
    const status = new Status();
    const snake = new Snake();
    const board = new Board(settings, snake);
    const menu = new Menu();
    const food = new Food(settings, snake, board);
    const game = new Game(settings, status, board, snake, menu, food);
    game.init();
    food.init();
    // board.renderSnake(snake);
    // console.dir(status);
});
class Menu {
    constructor() {
        this.startBtnEl = document.getElementById('startBtn');
        this.pauseBtnEl = document.getElementById('pauseBtn');
    }

    addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler, newGameBtnClickHandler) {
        this.startBtnEl.addEventListener('click', startBtnClickHandler);
        this.pauseBtnEl.addEventListener('click', pauseBtnClickHandler);
    }
}
class Settings {
    /**
     * @param {Object} params - Парметры игры.
     * @param {number} params.rowsCount - количество строк игрового поля.
     * @param {number} params.colsCount - количество колонок игрового поля.
     * @param {number} params.speed - скорость перемещения змейки.
     * @param {number} params.winLength - какую длину надо наесть, чтобы выиграть.
     */
    constructor(params) {
        let defaultParams = {rowsCount: 21, colsCount: 21, speed: 2, winLength: 50};
        Object.assign(defaultParams, params);

        if (defaultParams.rowsCount < 10 || defaultParams.rowsCount > 30) {
            throw new Error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }
        this.rowsCount = defaultParams.rowsCount;

        if (defaultParams.colsCount < 10 || defaultParams.colsCount > 30) {
            throw new Error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }
        this.colsCount = defaultParams.colsCount;

        if (defaultParams.speed < 1 || defaultParams.speed > 10) {
            throw new Error('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }
        this.speed = defaultParams.speed;

        if (defaultParams.winLength < 5 || defaultParams.winLength > 50) {
            throw new Error('Неверные настройки, значение winLength должно быть в диапазоне [5, 50].');
        }
        this.winLength = defaultParams.winLength;
    }
}
class Snake {
    constructor() {
        this.possibleDirections = ['down', 'up', 'left', 'right'];

        this.head = {
            x: 1,
            y: 1,
        };
        this.body = [];

        this.direction = 'down';
    }

    /**
     * Меняем направление движения.
     * @param {string} direction направление может быть down, up, left, right.
     * @throws {Error} при передаче не корректного направления выбрасывается ошибка.
     */
    changeDirection(newDirection) {
        if (!this.possibleDirections.includes(newDirection)) {
            throw new Error('Передано не верное направление. Вы передали: ' + newDirection);
        }
        if (this.isPassedOppositeDirection(newDirection)) {
            return;
        }
        this.direction = newDirection;
    }

    isPassedOppositeDirection(newDirection) {
        if (this.direction == 'down' && newDirection == 'up') {
            return true;
        }
        if (this.direction == 'up' && newDirection == 'down') {
            return true;
        }
        if (this.direction == 'left' && newDirection == 'right') {
            return true;
        }
        if (this.direction == 'right' && newDirection == 'left') {
            return true;
        }
        return false;
    }

    changeHeadCoords() {
        switch (this.direction) {
            case "down":
                this.head.y++;
                break;
            case "up":
                this.head.y--;
                break;
            case "left":
                this.head.x--;
                break;
            case "right":
                this.head.x++;
                break;
        }
    }

    changeBodyCoords() {
        for (let bodyCell of this.body) {
            switch (this.direction) {
                case "down":
                    bodyCell.y++;
                    break;
                case "up":
                    bodyCell.y--;
                    break;
                case "left":
                    bodyCell.x--;
                    break;
                case "right":
                    bodyCell.x++;
                    break;
            }
        }
    }

    increaseBody() {
        console.log('increase body');
        let lastHeadPosition = {}
        Object.assign(lastHeadPosition, this.head);
        
        if (this.body.length == 0) {
            switch (this.direction) {
                case "down":
                    lastHeadPosition.y = this.head.y - 1;
                    break;
                case "up":
                    lastHeadPosition.y = this.head.y + 1;
                    break;
                case "left":
                    lastHeadPosition.x = this.head.x + 1;
                    break;
                case "right":
                    lastHeadPosition.x = this.head.x - 1;
                    break;
            }
            console.log(lastHeadPosition);
            throw "1";
            this.body.push(lastHeadPosition);
        }
        console.log(this.body);
        throw "ew";
    }
}
/** Здесь будет хранится статус игры, например играем мы, завершили или остановлено. */
class Status {
    constructor() {
        this.setPaused();
    }

    /** Это значит что мы играем. */
    setPlaying() {
        this.condition = 'playing';
    }

    /** Это значит что игра на паузе. */
    setPaused() {
        this.condition = 'paused';
    }

    /** Это значит что игра завершена. */
    setFinished() {
        this.condition = 'finished';
    }

    /**
     * @returns {Boolean} если мы сейчас играем, тогда true, иначе false.
     */
    isPlaying() {
        return this.condition === 'playing';
    }

    /**
     * @returns {Boolean} если сейчас игра на паузе, тогда true, иначе false.
     */
    isPaused() {
        return this.condition === 'paused';
    }
}
//# sourceMappingURL=maps/app.js.map
