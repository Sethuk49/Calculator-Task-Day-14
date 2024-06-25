document.addEventListener('DOMContentLoaded', () => {
    const keys = [
        'C', '0','=', '+',
        '7', '8', '9', '-',
        '4', '5', '6', '*',
        '1', '2', '3', '/',
    ];

    const calculator = document.querySelector('#calculator');
    const display = document.querySelector('#display');
    const keysContainer = document.querySelector('#keys');

    let currentInput = '';
    let storedValue = '';
    let operator = '';
    let resultDisplayed = false;

    keys.forEach(key => {
        const button = document.createElement('button');
        button.textContent = key;
        button.classList.add('btn', 'btn-light');

        if (key.match(/[+\-*/=]/)) {
            button.classList.add('operator');
        }

        button.addEventListener('click', () => handleButtonClick(key));

        keysContainer.appendChild(button);
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key.match(/[0-9.]/)) {
            handleButtonClick(key);
        } else if (key.match(/[+\-*/=]/)) {
            handleButtonClick(key);
        } else if (key === 'Enter') {
            handleButtonClick('=');
        } else {
            alert('Only numbers are allowed');
        }
    });

    function handleButtonClick(key) {
        if (key === 'C') {
            clearDisplay();
        } else if (key.match(/[0-9.]/)) {
            if (resultDisplayed) {
                currentInput = '';
                resultDisplayed = false;
            }
            currentInput += key;
            updateDisplay(currentInput);
        } else if (key.match(/[+\-*/]/)) {
            if (operator) {
                calculate();
            }
            storedValue = currentInput;
            currentInput = '';
            operator = key;
        } else if (key === '=') {
            calculate();
        }
    }

    function calculate() {
        if (storedValue && currentInput && operator) {
            const result = eval(`${storedValue} ${operator} ${currentInput}`);
            updateDisplay(result);
            currentInput = result;
            operator = '';
            resultDisplayed = true;
        }
    }

    function clearDisplay() {
        currentInput = '';
        storedValue = '';
        operator = '';
        updateDisplay('0');
    }

    function updateDisplay(value) {
        display.textContent = value;
    }
});
