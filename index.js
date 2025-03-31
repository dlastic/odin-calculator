let firstNumber = "";
let operator = null;
let secondNumber = "";
let displayValue = "0";

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

function updateDisplay(value) {
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
  operator = null;
  displayValue = "0";
  document.querySelector("#display").textContent = displayValue;
}

function handleOperator(op) {
  firstNumber = displayValue;
  operator = op;
  updateDisplay(operator);
}

function handleEquals() {
  if (operator && firstNumber !== "" && displayValue !== "") {
    secondNumber = displayValue.split(operator)[1];
    displayValue = String(operate(operator, firstNumber, secondNumber));
    document.querySelector("#display").textContent = displayValue;
    operator = null;
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