// app.js – Core logic for the Simple Calculator
// -------------------------------------------------
// This script defines the Calculator class, a minimal UI controller, and
// binds both mouse and keyboard events to make the calculator functional.
// It is loaded with the `defer` attribute, so the DOM is already available.

// -------------------------------------------------
// 1. Calculator class
// -------------------------------------------------
class Calculator {
  // Private fields (ES2022 syntax)
  #operand1 = '';
  #operand2 = '';
  #operator = '';
  #result = null;

  // Append a digit or decimal point to the current operand
  setOperand(value) {
    // Guard against invalid characters
    if (!/^[0-9.]$/.test(value)) return;

    // Determine which operand we are editing
    const editingFirst = this.#operator === '';
    if (editingFirst) {
      // Prevent multiple decimal points
      if (value === '.' && this.#operand1.includes('.')) return;
      // Avoid leading zeros like "00" (except when the number is "0.")
      if (value === '0' && this.#operand1 === '0') return;
      if (value !== '.' && this.#operand1 === '0') this.#operand1 = '';
      this.#operand1 += value;
    } else {
      if (value === '.' && this.#operand2.includes('.')) return;
      if (value === '0' && this.#operand2 === '0') return;
      if (value !== '.' && this.#operand2 === '0') this.#operand2 = '';
      this.#operand2 += value;
    }
  }

  // Store the operator and prepare for the second operand
  setOperator(op) {
    if (!['+', '-', '*', '/'].includes(op)) return;
    // If we already have a result (after previous calculation) and no operand2,
    // start a new expression using the result as operand1.
    if (this.#result !== null && this.#operand2 === '') {
      this.#operand1 = String(this.#result);
      this.#result = null;
    }
    // If operand1 is empty and there is no previous result, ignore the operator.
    if (this.#operand1 === '' && this.#result === null) return;
    this.#operator = op;
  }

  // Perform the calculation based on the stored operator and operands
  calculate() {
    const a = parseFloat(this.#operand1);
    const b = parseFloat(this.#operand2);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      throw new Error('Incomplete expression');
    }
    let res;
    switch (this.#operator) {
      case '+':
        res = this.add(a, b);
        break;
      case '-':
        res = this.subtract(a, b);
        break;
      case '*':
        res = this.multiply(a, b);
        break;
      case '/':
        if (b === 0) throw new Error('Division by zero');
        res = this.divide(a, b);
        break;
      default:
        throw new Error('No operator selected');
    }
    // Store the result and prepare for a new expression
    this.#result = res;
    this.#operand1 = String(res);
    this.#operand2 = '';
    this.#operator = '';
    return res;
  }

  // Helper arithmetic methods (pure functions)
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) { return a / b; }

  // Reset the calculator to its initial state
  clear() {
    this.#operand1 = '';
    this.#operand2 = '';
    this.#operator = '';
    this.#result = null;
  }

  // Return the value that should be shown on the display
  getDisplayValue() {
    if (this.#operand2 !== '') return this.#operand2;
    if (this.#operand1 !== '') return this.#operand1;
    if (this.#result !== null) return String(this.#result);
    return '';
  }
}

// Expose globally for debugging or external use
window.Calculator = Calculator;

// -------------------------------------------------
// 2. UI controller (singleton)
// -------------------------------------------------
const ui = {
  displayEl: document.getElementById('display'),
  buttonEls: document.querySelectorAll('.btn'),

  updateDisplay(value) {
    this.displayEl.value = value;
  },

  showError(message) {
    const original = this.displayEl.value;
    this.displayEl.value = message;
    this.displayEl.classList.add('error');
    setTimeout(() => {
      this.displayEl.value = original;
      this.displayEl.classList.remove('error');
    }, 1500);
  },
};

// -------------------------------------------------
// 3. Event binding – mouse & keyboard
// -------------------------------------------------
const calc = new Calculator();

// Helper to process a button press (same logic for click & key)
function handleInput(key) {
  if (/^[0-9.]$/.test(key)) {
    calc.setOperand(key);
    ui.updateDisplay(calc.getDisplayValue());
  } else if (['+', '-', '*', '/'].includes(key)) {
    calc.setOperator(key);
    // Operator press does not change display immediately
  } else if (key === '=') {
    try {
      calc.calculate();
      ui.updateDisplay(calc.getDisplayValue());
    } catch (err) {
      ui.showError(err.message);
    }
  } else if (key === 'C') {
    calc.clear();
    ui.updateDisplay('');
  }
}

// Click listeners for all calculator buttons
ui.buttonEls.forEach(btn => {
  const key = btn.dataset.key;
  btn.addEventListener('click', () => handleInput(key));
});

// Keyboard support – map physical keys to the same actions
document.addEventListener('keydown', e => {
  const keyMap = {
    Enter: '=',
    '=': '=',
    Backspace: 'C', // treat backspace as clear for this simple UI
    Escape: 'C',
  };
  let key = e.key;
  if (keyMap[key]) key = keyMap[key];
  if (/^[0-9.]$/.test(key) || ['+', '-', '*', '/', '=', 'C'].includes(key)) {
    e.preventDefault();
    handleInput(key);
  }
});

// Ensure the display is cleared on load
ui.updateDisplay('');
