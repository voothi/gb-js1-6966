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