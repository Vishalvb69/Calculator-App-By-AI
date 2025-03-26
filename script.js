let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    document.getElementById('output').textContent = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function handleOperator(op) {
    const inputNum = parseFloat(currentInput);
    
    if (operation && !shouldResetDisplay) {
        calculate();
    }
    
    previousInput = currentInput;
    operation = op;
    shouldResetDisplay = true;
}

function calculate() {
    const prevNum = parseFloat(previousInput);
    const currentNum = parseFloat(currentInput);
    
    if (isNaN(prevNum) || isNaN(currentNum)) return;
    
    let result;
    
    switch (operation) {
        case '+':
            result = prevNum + currentNum;
            break;
        case '-':
            result = prevNum - currentNum;
            break;
        case '*':
            result = prevNum * currentNum;
            break;
        case '/':
            if (currentNum === 0) {
                currentInput = 'Error';
                updateDisplay();
                return;
            }
            result = prevNum / currentNum;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}