# SimpleCalculatorWebApp

**SimpleCalculatorWebApp** is a lightweight, browser‑based calculator that performs basic arithmetic operations. It is built with pure HTML, CSS, and JavaScript—no build tools, frameworks, or server‑side components are required.

---

## Features
- **Basic arithmetic**: addition, subtraction, multiplication, division, and modulus.
- **Responsive UI**: works on desktop, tablets, and mobile devices.
- **Mouse / Touch support**: click or tap the on‑screen buttons.
- **Keyboard input**: use the number keys, `+ - * / %`, `Enter` (or `=`) for evaluation, and `Esc` / `Backspace` to clear.
- **Clear button**: resets the display and internal state.
- **Error handling**: division by zero and malformed expressions display a friendly error message instead of crashing.
- **Self‑contained**: just open `index.html` in a browser—no installation or compilation needed.

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Markup | **HTML5** – defines the calculator layout (`index.html`). |
| Styling | **CSS3** – provides the visual design and responsive behavior (`styles.css`). |
| Logic | **JavaScript (ES6)** – handles user interaction, expression parsing, and display updates (`app.js`). |

---

## Setup & Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/SimpleCalculatorWebApp.git
   cd SimpleCalculatorWebApp
   ```
2. **Open the app**
   - Locate `index.html` in the project root.
   - Double‑click the file or open it with your favorite browser (Chrome, Firefox, Edge, Safari, etc.).
   - No additional build steps, package managers, or server configuration are required.

---

## Usage Guide
### Operating the Calculator
- **Mouse / Touch**: Click or tap any of the numeric or operator buttons displayed on the screen.
- **Keyboard**:
  - Numbers `0‑9` and the decimal point `.` input digits.
  - Operators: `+` (addition), `-` (subtraction), `*` (multiplication), `/` (division), `%` (modulus).
  - `Enter` or `=` evaluates the current expression.
  - `Esc` or `Backspace` clears the display (same as the **C** button).

### Clear Button
- The **C** button (or pressing `Esc`/`Backspace`) resets the calculator, clearing the current expression and any error messages.

### Error Handling
- **Division by zero** or any invalid expression (e.g., `5++2`) triggers an error message such as `Error` or `Invalid expression` in the display.
- The calculator automatically clears the error state on the next valid input.

---

## Screenshots
> _Add screenshots here to illustrate the UI on desktop and mobile._

```
[Desktop view]
[Mobile view]
```

---

## Contributing
Contributions are welcome! Follow these steps to get started:
1. Fork the repository.
2. Create a new branch for your feature or bug‑fix.
3. Make your changes, ensuring the existing functionality remains intact.
4. Test the calculator in multiple browsers and screen sizes.
5. Submit a pull request with a clear description of what you changed and why.

Please adhere to the existing code style (ES6 modules, consistent naming, and clear comments).

---

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.

---

## References
- `index.html` – the main HTML file containing the calculator layout.
- `styles.css` – stylesheet that defines the look and responsive behavior.
- `app.js` – JavaScript module that implements all interactive features.
