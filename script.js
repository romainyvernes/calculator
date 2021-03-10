function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

const pad = document.querySelector('#pad');
const KEYS = [
    { symbol: 'AC', id: 'all-clear' },
    { symbol: 'C', id: 'clear' },
    { symbol: '÷', id: 'divide' },
    { symbol: 7, id: 'seven' },
    { symbol: 8, id: 'eight' },
    { symbol: 9, id: 'nine' },
    { symbol: 'x', id: 'multiply' },
    { symbol: 4, id: 'four' },
    { symbol: 5, id: 'five' },
    { symbol: 6, id: 'six' },
    { symbol: '-', id: 'subtract' },
    { symbol: 1, id: 'one' },
    { symbol: 2, id: 'two' },
    { symbol: 3, id: 'three' },
    { symbol: '+', id: 'add' },
    { symbol: 0, id: 'zero' },
    { symbol: '.', id: 'decimal' },
    { symbol: '=', id: 'equal' }
];

for (let i = 0; i < KEYS.length; i++) {
    const calcElement = document.createElement('div');
    calcElement.className = 'key';
    calcElement.id = KEYS[i].id;
    calcElement.textContent = KEYS[i].symbol;
    pad.appendChild(calcElement);
}