export default class Food {
    constructor(gameBoard, maxSize, snake) {
        this.gameBoard = gameBoard;
        this.maxSize = maxSize;

        this.setRandomPosition(snake);
    }

    setRandomPosition(snake) {
        const a = [...Array(this.maxSize * this.maxSize).keys()];

        let node = snake.head;
        while (node !== null) {
            const i = (node.x - 1) * this.maxSize + (node.y - 1);
            a.splice(i, 1); // remove index
            node = node.next;
        }

        const rand = Math.floor(Math.random() * a.length);
        const positionAsInteger = a[rand];

        this.x = Math.floor(positionAsInteger / this.maxSize) + 1;
        this.y = positionAsInteger % this.maxSize + 1;
    }

    draw() {
        const element = document.createElement('div');
        element.style.gridRowStart = this.x;
        element.style.gridColumnStart = this.y;
        element.classList.add('food');
        this.gameBoard.appendChild(element);
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.x = y;
    }
}