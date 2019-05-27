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