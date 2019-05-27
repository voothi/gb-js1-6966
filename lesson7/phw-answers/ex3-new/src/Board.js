class Board {
    constructor() {
        this.boardEl = document.getElementById('game');
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings объект настроек.
     * @param {Snake} snake объект змейки.
     */
    init(settings, snake) {
        this.settings = settings;
        this.snake = snake;
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
        const snakeBodyElems = this.getSnakeBodyElems(this.snake.body);
        if (snakeBodyElems) {
            snakeBodyElems.forEach(function(tdEl) {
                tdEl.classList.add('snakeBody');
            })
        }
    }

    /**
     * Метод очищает игровое поле.
     */
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
     * @returns {boolean}
     */
    isNextStepToWall(nextCellCoords) {
        let nextCell = this.getCellEl(nextCellCoords.x, nextCellCoords.y);
        if (nextCell === null) {
            return true;
        }
        return false;
    }

    /**
     * Метод рисует еду на игровом поле.
     * @param {Object} coords будущее расположение еды на поле
     * @param {number} coords.x координата x
     * @param {number} coords.y координата y
     */
    renderFood(coords) {
        const foodCell = this.getCellEl(coords.x, coords.y);
        foodCell.classList.add('food');
    }

    /**
     * Метод проверяет съела ли змейка еду.
     * @returns {boolean} true если змейка находится на еде, иначе false.
     */
    isHeadOnFood() {
        return this.boardEl.querySelector('.food').classList.contains('snakeBody');
    }
}