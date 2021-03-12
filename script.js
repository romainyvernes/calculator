function add(num1, num2) {
    let operation;
    operation = num1 + num2;
    return Math.round(operation * 10 ** 10) / 10 ** 10;
}

function subtract(num1, num2) {
    let operation;
    operation = num1 - num2;
    return Math.round(operation * 10 ** 10) / 10 ** 10;
}

function multiply(num1, num2) {
    let operation;
    operation = num1 * num2;
    return Math.round(operation * 10 ** 10) / 10 ** 10;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return 'Error';
    }
    let operation;
    if (num1 < 0) {
        operation = ((num1 * -1) / num2) * -1;
    } else {
        operation = num1 / num2;
    }
    return Math.round(operation * 10 ** 10) / 10 ** 10;
}

function operate(operator, num1, num2) {
    let result;
    
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case 'x':
            result = multiply(num1, num2);
            break;
        case '÷':
            result = divide(num1, num2);
            break;
    }

    return result.toString();
}

function updateDisplay(container, keyValue) {
    let firstOperand;
    let secondOperand;
    let operator;
    // if full operation displayed, assign values for operate function
    if (/[0-9].+[+\-\÷x].+[0-9]$/.test(displayValue)) {
        operator = displayValue.match(/ [+\-\÷x] /).toString().trim();
        firstOperand = displayValue.split(` ${operator} `)[0];
        secondOperand = displayValue.split(` ${operator} `)[1];
    }
    // check for each input key's value to determine display
    if (/[0-9]/.test(keyValue)) {
        if (displayValue === '0') {
            displayValue = keyValue;
        } else if (/[0-9]$|\.$/.test(displayValue)) {
            displayValue += keyValue;
        } else if (/[+\-\÷x]$/.test(displayValue)) {
            displayValue += ' ' + keyValue;
        }
    } else if (/[+\-\÷x]/.test(keyValue)) {
        if (/[0-9]$/.test(displayValue)) {
            if (/ [+\-\÷x] /.test(displayValue)) {
                displayValue = operate(operator, +firstOperand, +secondOperand) +
                        ' ' + keyValue;
            } else {
                displayValue += ' ' + keyValue;
            }
        } else if (/\.$/.test(displayValue)) {
            displayValue = displayValue.slice(0, displayValue.length - 1);
            if (/[+\-\÷x]/.test(displayValue)) {
                displayValue = operate(operator, +firstOperand, +secondOperand) +
                ' ' + keyValue;
            } else {
                displayValue += ' ' + keyValue;
            }
        } else if (/[+\-\÷x]$/.test(displayValue)) {
            let currentOperator = displayValue.slice(-1);
            displayValue = displayValue.replace(currentOperator, keyValue);
        }
    } else if (keyValue === '.') {
        if (/[0-9]$/.test(displayValue) && !/[0-9]+\.[0-9]+$/.test(displayValue)) {
            displayValue += '.';
        }
    } else if (keyValue === '=') {
        if (/[0-9].+[+\-\÷x].+[0-9]$/.test(displayValue)) {
            displayValue = operate(operator, +firstOperand, +secondOperand);
        }
    } else if (keyValue === 'C') {
        if (displayValue.length !== 1 && /[^a-wy-z]$/.test(displayValue)) {
            displayValue = displayValue.slice(0, displayValue.length - 1);
            while (/ $/.test(displayValue)) {
                displayValue = displayValue.slice(0, displayValue.length - 1);
            }
        } else {
            displayValue = '0';
        }
    } else if (keyValue === 'AC') {
        displayValue = '0';
    }
    // if display longer than one line, enable two-line display
    if (displayValue.length > 11) {
        container.style.paddingTop = '10px';
    } else {
        container.style.paddingTop = '45px';
    }
    // limit display to 24 characters
    if (displayValue.length > 24) {
        displayValue = displayValue.slice(0, 24);
    }

    container.textContent = displayValue;
}

const pad = document.querySelector('#pad');
const display = document.querySelector('#display');
const KEYS = [
    { symbol: 'AC', id: 'all-clear' },
    { symbol: 'C', id: 'clear' },
    { symbol: '÷', id: 'divide' },
    { symbol: '7', id: 'seven' },
    { symbol: '8', id: 'eight' },
    { symbol: '9', id: 'nine' },
    { symbol: 'x', id: 'multiply' },
    { symbol: '4', id: 'four' },
    { symbol: '5', id: 'five' },
    { symbol: '6', id: 'six' },
    { symbol: '-', id: 'subtract' },
    { symbol: '1', id: 'one' },
    { symbol: '2', id: 'two' },
    { symbol: '3', id: 'three' },
    { symbol: '+', id: 'add' },
    { symbol: '0', id: 'zero' },
    { symbol: '.', id: 'decimal' },
    { symbol: '=', id: 'equal' }
];
let displayValue = '0';

for (let i = 0; i < KEYS.length; i++) {
    const calcElement = document.createElement('button');
    calcElement.className = 'key';
    calcElement.id = KEYS[i].id;
    calcElement.value = KEYS[i].symbol;
    calcElement.textContent = KEYS[i].symbol;
    calcElement.addEventListener('click', e => {
        updateDisplay(display, e.target.value);
        this.blur();
    });
    pad.appendChild(calcElement);
}

document.addEventListener('keydown', e => {
    let key = e.key;
    switch (key) {
        case '*':
            key = 'x';
            break;
        case '/':
            key = '÷';
            break;
        case 'Backspace':
            key = 'C';
            break;
        case 'Enter':
            key = '=';
            break;
    }
    updateDisplay(display, key);
});

display.textContent = displayValue;