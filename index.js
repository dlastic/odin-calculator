let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = "";

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

function operate(operator, a, b) {
  switch (operator) {
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
  displayValue += value;
  document.querySelector("#display").textContent = displayValue;
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (!isNaN(button.textContent) || button.textContent === ".") {
        updateDisplay(button.textContent);
      }
    });
  });
});