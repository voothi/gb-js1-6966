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