"use strict";

let snake = {
    body: null,
    direction: null,
    lastStepDirection: null,
    maxX: null,
    maxY: null,

    init(startPoint, direction, maxX, maxY) {
        // this.body = [
        //     {x: 5, y: 5}, это голова
        //     {x: 6, y: 5},
        //     {x: 7, y: 5}
        // ];
        this.body = [startPoint];
        this.lastStepDirection = direction;
        this.direction = direction;
        this.maxX = maxX;
        this.maxY = maxY;
    },

    getNextStepHeadPoint() {
        let firstPoint = this.body[0];

        switch (this.direction) {
            case 'up':
                return {x: firstPoint.x, y: firstPoint.y !== 0 ? firstPoint.y - 1 : this.maxY};
            case 'down':
                return {x: firstPoint.x, y: firstPoint.y !== this.maxY ? firstPoint.y + 1 : 0};
            case 'right':
                return {x: firstPoint.x !== this.maxX ? firstPoint.x + 1 : 0, y: firstPoint.y};
            case 'left' :
                return {x: firstPoint.x !== 0 ? firstPoint.x - 1 : this.maxX, y: firstPoint.y};
        }
    },

    isBodyPoint(point) {
        return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },
    makeStep() {
        //Откуда стартуем
        //[{x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}]

        //Что у нас
        //[{x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}]

        //Что должны получить
        //[{x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}]

        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint());
        this.body.pop();
    },

    setDirection(direction) {
        this.direction = direction;
    },

    incrementBody() {
        //сейчас, до того как сделаем шаг.
        //[{x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}]

        let lastBodyIdx = this.body.length - 1;
        let lastBodyPoint = this.body[lastBodyIdx];
        let lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.body.push(lastBodyPointClone);

        //как у нас до хода - добавляем еще такую же ячейку, чтобы при шаге последняя
        //точка не была удалена
        //[{x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}, {x: 7, y: 5}]

        //когда делает шаг
        //[{x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}]

        //как должно быть после хода
        //[{x: 4, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 7, y: 5}]
    }
};

let renderer = {
    cells: {},
    renderMap(rowsCount, colsCount) {
        let table = document.getElementById('game');
        table.innerHTML = '';

        for (let row = 0; row < rowsCount; row++) {
            let tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                let td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);
                this.cells[`x${col}_y${row}`] = td;
            }
        }
    },

    render(snakePointArray, foodPoint) {
        for (let key of Object.getOwnPropertyNames(this.cells)) {
            this.cells[key].className = 'cell';
        }
        
        snakePointArray.forEach((point, idx) => {
            this.cells[`x${point.x}_y${point.y}`].classList.add(idx === 0 ? 'snakeHead' : 'snakeBody');
        });

        this.cells[`x${foodPoint.x}_y${foodPoint.y}`].classList.add('food');
    }
};

let food = {
    x: null,
    y: null,

    setFoodCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    getFoodCoordinates() {
        return {
            x: this.x,
            y: this.y,
        }
    },

    isFoodPoint(point) {
        return this.x === point.x && this.y === point.y;
    }
};

let status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    }
};

let settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winLength: 50,

    validate() {
        if (this.rowsCount < 10 || this.rowsCount > 30) {
            console.error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
            return false;
        }

        if (this.colsCount < 10 || this.colsCount > 30) {
            console.error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
            return false;
        }

        if (this.speed < 1 || this.speed > 10) {
            console.error('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
            return false;
        }

        if (this.winLength < 5 || this.winLength > 50) {
            console.error('Неверные настройки, значение winLength должно быть в диапазоне [5, 50].');
            return false;
        }

        return true;
    },
};

let score = {
    count: 0,
    countEl: null,

    init() {
        this.countEl = document.getElementById('score-count');
        this.drop();
    },

    increment() {
        this.count++;
        this.render();
    },

    drop() {
        this.count = 0;
        this.render();
    },

    render() {
        this.countEl.textContent = this.count;
    }
};

let game = {
    settings,
    status,
    renderer,
    food,
    snake,
    score,
    tickInterval: null,

    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);
        if (!this.settings.validate()) {
            return;
        }

        this.renderer.renderMap(this.settings.rowsCount, this.settings.colsCount);

        this.score.init();

        this.setEventHandlers();

        this.reset();
    },

    reset() {
        this.stop();

        this.score.drop();

        this.snake.init(
            this.getStartSnakePoint(), 
            'up',
            this.settings.colsCount - 1, 
            this.settings.rowsCount - 1
        );

        this.food.setFoodCoordinates(this.getRandomCoordinates());

        this.render();
    },

    render() {
        this.renderer.render(this.snake.body, this.food.getFoodCoordinates());
    },

    play() {
        //ставим статус в играем
        this.status.setPlaying();
        //запускать шаги змейки
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.settings.speed)
        //меняем кнопку игры на стоп
        this.changePlayButton('Стоп');
    },

    stop() {
        //ставим статус в стоп
        this.status.setStopped();
        //останавливаем шаги змейки
        clearInterval(this.tickInterval);
        //меняем кнопку игры на старт
        this.changePlayButton('Старт');
    },

    finish() {
        //ставим статус в финиш
        this.status.setFinished();
        //останавливаем шаги змейки
        clearInterval(this.tickInterval);
        //меняем кнопку игры, сделаем серой и напишем игра закончена
        this.changePlayButton('Игра закончена', true);
    },

    tickHandler() {
        if (!this.canSnakeMakeStep()) {
            this.finish();
            return;
        }

        if (this.food.isFoodPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.incrementBody();
            this.score.increment();
            this.food.setFoodCoordinates(this.getRandomCoordinates());
            if (this.isGameWon()) {
                this.finish();
            }
        }

        this.snake.makeStep();
        this.render();
    },

    isGameWon() {
        return this.snake.body.length > this.settings.winLength;
    },

    canSnakeMakeStep() {
        let nextHeadPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isBodyPoint(nextHeadPoint);
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => this.playClickHandler());
        document.getElementById('newGameButton').addEventListener('click', () => this.newGameClickHandler());
        document.addEventListener('keydown', () => this.keyDownHandler(event));
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) {
            return;
        }

        let direction = this.getDirectionByCode(event.code);
        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    canSetDirection(direction) {
        return direction === 'up' && this.snake.lastStepDirection !== 'down' ||
               direction === 'right' && this.snake.lastStepDirection !== 'left' ||
               direction === 'down' && this.snake.lastStepDirection !== 'up' ||
               direction === 'left' && this.snake.lastStepDirection !== 'right';
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
          }
    },

    changePlayButton(textContent, isDisabled = false) {
        let playButton = document.getElementById('playButton');
        playButton.textContent = textContent;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    getStartSnakePoint() {
        return {
            x: Math.floor(this.settings.colsCount / 2),
            y: Math.floor(this.settings.rowsCount / 2),
        };
    },

    getRandomCoordinates() {
        //без оператора spread
        //[{x: 5, y: 5}, [{x: 5, y: 5}, {x: 5, y: 5}, {x: 5, y: 5}]]
        //с оператором spread
        //[{x: 5, y: 5}, {x: 5, y: 5}, {x: 5, y: 5}, {x: 5, y: 5}]
        let exclude = [this.food.getFoodCoordinates(), ...this.snake.body];
        console.log(exclude);
        while (true) {
            //случайная точка в пределах игрового поля
            let rndPoint = {
                x: Math.floor(Math.random() * this.settings.colsCount),
                y: Math.floor(Math.random() * this.settings.rowsCount),
            };

            //проверяем не содержится ли в массиве exclude нашей случайной точки
            let excludeContainsRndPoint = exclude.some(function (exPoint) {
                return rndPoint.x === exPoint.x && rndPoint.y === exPoint.y;
            });

            //if (координата не содержится в массиве exclude) {}
            if (!excludeContainsRndPoint) {
                console.log(rndPoint);
                return rndPoint;
            }
        }
    },
}

window.onload = () => game.init({ speed: 5, winLength: 5 });