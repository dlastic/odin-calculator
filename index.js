let firstNumber = "";
let operator = "";
let secondNumber = "";
let displayValue = "0";
let shouldResetDisplay = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}

function operate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);   
    case "/":
      return divide(a, b);
    default:
      return "Error: Invalid operator";
  }
}

function roundResult(value) {
  const rounded = Number(value.toPrecision(8));
  return rounded.toString().length > 10 ? rounded.toExponential(4) : String(rounded);
}

function updateDisplay(value) {
  if (shouldResetDisplay && !isNaN(value)) {
    displayValue = "";
    shouldResetDisplay = false;
  }

  if (value === ".") {
    const parts = operator ? displayValue.split(operator) : [displayValue];
    if (parts[parts.length - 1].includes(".")) return;
  }

  // Different behaviour depending on the current display text
  if (!isNaN(value)) {
    displayValue === "0" ? displayValue = value : displayValue += value;
  } else if (isNaN(displayValue.at(-1))) {
    displayValue = displayValue.replace(/.$/, operator);  
  } else {
    displayValue += value
  }
  document.querySelector("#display").textContent = displayValue;
}

function clearDisplay() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  displayValue = "0";
  shouldResetDisplay = false;
  document.querySelector("#display").textContent = displayValue;
}

function handleOperator(op) {
  secondNumber = displayValue.split(operator)[1];
  // If operator and secondNumber exists
  if (operator && secondNumber) {
    handleEquals();
    operator = op;
    updateDisplay(operator);
  } else {
    firstNumber = displayValue;
    operator = op;
    updateDisplay(operator);
  }
  shouldResetDisplay = false;
}

function handleEquals() {
  secondNumber = displayValue.split(operator)[1];

  // Handle dividing by zero
  if (operator === "/" && secondNumber == 0) {
    alert("Error: Dividing by 0");
    clearDisplay();
    return;
  }

  if (operator && firstNumber && secondNumber) {
    displayValue = roundResult(operate(operator, firstNumber, secondNumber));
    document.querySelector("#display").textContent = displayValue;
    firstNumber = displayValue;
    operator = "";
    shouldResetDisplay = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.textContent;
      if (!isNaN(value) || value === ".") {
        updateDisplay(value);
      } else if (["+", "-", "*", "/"].includes(value)) {
        handleOperator(value);
      } else if (value === "=") {
        handleEquals();
      } else if (value === "C") {
        clearDisplay();
      }
    });
  });
});