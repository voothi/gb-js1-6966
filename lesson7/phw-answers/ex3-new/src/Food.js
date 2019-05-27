class Food {
    constructor() {
        this.x = null;
        this.y = null;
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings объект настроек
     * @param {Snake} snake объект змейки
     * @param {Board} board объект игрового поля
     */
    init(settings, snake, board) {
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }

    /**
     * Метод устанавливает новое случайное положение еды на игровом
     * поле.
     */
    setNewFood() {
        const coords = this.generateRandomCoordinates();
        this.board.renderFood(coords);
    }

    /**
     * Метод устанавливает на игровом поле еду по текущим
     * координатам.
     */
    setFood() {
        this.board.renderFood(this);
    }

    /**
     * Метод генерирует новый объект еды со случайным
     * положением на игровом поле
     * @returns {Food}
     */
    generateRandomCoordinates() {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount);
            this.y = Math.floor(Math.random() * this.settings.rowsCount);
            let cell = this.board.getCellEl(this.x, this.y);

            if (cell === null) {
                continue;
            }
            if (cell.classList.contains('snakeBody')) {
                continue;
            }
            return this;
        }
    }
}