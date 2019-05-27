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