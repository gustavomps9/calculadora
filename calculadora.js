const display = document.getElementById("display");
const history = document.getElementById("history");

function appendToDisplay(input) {
    const operators = ['+', '-', '*', '/'];
    const lastChar = display.value.slice(-1);

    if (operators.includes(input) && operators.includes(lastChar)) {
        return;
    }

    display.value += input;
}

function clearDisplay() {
    display.value = "";
    history.innerHTML = "";
}

function calculate() {
    try {
        const result = safeEval(display.value);
        history.innerHTML += `<p>${display.value} = ${result}</p>`;
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

function safeEval(expression) {
    return Function('return ' + expression)();
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
