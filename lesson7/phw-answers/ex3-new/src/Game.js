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