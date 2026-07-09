const express = require('express');
const router = express.Router();

// 1. Advanced Master Calculator Route
router.get('/calculate/:operation/:num1/:num2', (req, res) => {
  const operation = req.params.operation.toLowerCase();
  const firstNum = Number(req.params.num1);
  const secondNum = Number(req.params.num2);
  
  let result = 0;
  let symbol = '';

  if (operation === 'add') { result = firstNum + secondNum; symbol = '+'; }
  else if (operation === 'subtract') { result = firstNum - secondNum; symbol = '-'; }
  else if (operation === 'multiply') { result = firstNum * secondNum; symbol = '×'; }
  else if (operation === 'divide') { result = firstNum / secondNum; symbol = '÷'; }
  else { return res.send('<h1>❌ Error</h1><p>Please use add, subtract, multiply, or divide.</p>'); }

  res.send(`
    <div style="font-family: sans-serif; padding: 20px;">
      <h2 style="color: #2196F3;">🧮 Express Master Calculator</h2>
      <p style="font-size: 18px;">Calculation: <b>${firstNum}</b> ${symbol} <b>${secondNum}</b></p>
      <h1 style="color: #4CAF50;">Total Answer = ${result}</h1>
    </div>
  `);
});

// 2. Query String Math Route
router.get('/math', (req, res) => {
  const op = req.query.op;
  const n1 = Number(req.query.n1);
  const n2 = Number(req.query.n2);

  let result = 0;
  if (op === 'multiply') result = n1 * n2;
  else if (op === 'add') result = n1 + n2;
  else return res.send('<h1>Error</h1><p>Please provide correct op, n1, and n2 values.</p>');

  res.send(`<h1>🔍 Query API Result: ${result}</h1>`);
});

// 3. Interactive Calculation Form Page
router.get('/calc-form', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; max-width: 300px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
      <h3 style="color: #2196F3; text-align: center;">⚡ POST Calculator</h3>
      <form action="/calc-submit" method="POST" style="display: flex; flex-direction: column; gap: 10px;">
        <input type="number" name="num1" placeholder="First Number" required style="padding: 8px;">
        <input type="number" name="num2" placeholder="Second Number" required style="padding: 8px;">
        <button type="submit" style="background: #4CAF50; color: white; padding: 10px; border: none; border-radius: 4px; cursor: pointer;">Calculate Total</button>
      </form>
    </div>
  `);
});

// 4. Handle the secure Form POST submission layout
router.post('/calc-submit', (req, res) => {
  const number1 = Number(req.body.num1);
  const number2 = Number(req.body.num2);
  const answer = number1 + number2;

  res.send(`<h1>📬 POST Success! Result: ${answer}</h1><br><a href="/calc-form">Go Back</a>`);
});

// ALWAYS KEEP THIS LINE AT THE VERY BOTTOM OF THE FILE
module.exports = router;
