import DIRECTIONS from './directions.js';

class Node {
    constructor(x, y, prev, next) {
        this.x = x;
        this.y = y;
        this.prev = prev;
        this.next = next;
    }
}

export default class Snake {
    constructor(gameBoard, maxSize) {
        this.SNAKE_SPEED = 5;

        this.gameBoard = gameBoard;
        this.maxSize = maxSize;

        this.head = new Node(11, 11, null, null);
        this.head.next = new Node(11, 10, this.head, null);

        this.bodyLength = 2;
        this.gameOver = false;
        this.eatsFood = false;

        this.direction = DIRECTIONS.RIGHT;  // set initial direction to the right
    }

    update() {
        let [dx, dy] = this.nextHeadPosition();

        // check if the snake will collide with itself
        let node = this.head;
        while(node.next !== null) {
            node = node.next;
            if (dx === node.x && dy === node.y) {
                this.gameOver = true;
                return;
            }
        }

        // attach a new node to the current head
        const temp = new Node(dx, dy, null, this.head);
        this.head.prev = temp;
        this.head = temp;

        if (this.eatsFood) {
            this.bodyLength++;
        } else {
            // drop the tail if the snake does not eat food on this update
            node.prev.next = null;
        }
    }

    draw() {
        let node = this.head;
        while (node !== null) {
            const element = document.createElement('div');
            element.style.gridRowStart = node.x;
            element.style.gridColumnStart = node.y;
            element.classList.add('snake');
            this.gameBoard.appendChild(element);

            node = node.next;
        }
    }

    nextHeadPosition() {
        let dx = this.head.x + this.direction.x;
        let dy = this.head.y + this.direction.y;

        // wrap vertical
        if (dx === 0) dx = this.maxSize;
        else if (dx > this.maxSize) dx = 1;

        // wrap horizontal
        if (dy === 0) dy = this.maxSize;
        else if (dy > this.maxSize) dy = 1;

        return [dx, dy];
    }

    setDirection(direction) {
        if (this.direction === direction) return;

        // do not allow inputs for opposite directions
        if (this.direction === DIRECTIONS.UP && direction === DIRECTIONS.DOWN ||
            this.direction === DIRECTIONS.DOWN && direction === DIRECTIONS.UP ||
            this.direction === DIRECTIONS.LEFT && direction === DIRECTIONS.RIGHT ||
            this.direction === DIRECTIONS.RIGHT && direction === DIRECTIONS.LEFT
        ) return;

        this.direction = direction;
    }
}