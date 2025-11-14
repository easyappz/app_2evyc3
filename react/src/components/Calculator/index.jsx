import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);

  const resetAll = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
    setJustCalculated(false);
  };

  const inputDigit = (digit) => {
    setDisplay((prev) => {
      if (justCalculated) {
        setJustCalculated(false);
        return String(digit);
      }
      if (waitingForSecond) {
        setWaitingForSecond(false);
        return String(digit);
      }
      if (prev === '0') return String(digit);
      return prev + String(digit);
    });
  };

  const inputDecimal = () => {
    setDisplay((prev) => {
      let hasDot = false;
      for (let i = 0; i < prev.length; i += 1) {
        if (prev[i] === '.') { hasDot = true; break; }
      }
      if (waitingForSecond || justCalculated) {
        setWaitingForSecond(false);
        setJustCalculated(false);
        return '0.';
      }
      if (!hasDot) return prev + '.';
      return prev;
    });
  };

  const performCalc = (a, b, op) => {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '×') return a * b;
    if (op === '÷') return b === 0 ? NaN : a / b;
    return b;
  };

  const handleOperator = (nextOp) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator && !waitingForSecond) {
      const result = performCalc(firstOperand, inputValue, operator);
      setFirstOperand(result);
      setDisplay(String(result));
    }

    setOperator(nextOp);
    setWaitingForSecond(true);
    setJustCalculated(false);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator === null || firstOperand === null) return;
    const result = performCalc(firstOperand, inputValue, operator);
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
    setJustCalculated(true);
  };

  const toggleSign = () => {
    setDisplay((prev) => {
      const n = parseFloat(prev);
      if (Number.isNaN(n)) return prev;
      return String(n * -1);
    });
  };

  const percent = () => {
    setDisplay((prev) => {
      const n = parseFloat(prev);
      if (Number.isNaN(n)) return prev;
      return String(n / 100);
    });
  };

  return (
    <div data-easytag="id1-react/src/components/Calculator/index.jsx" className="calc">
      <div className="calc__wrapper">
        <div className="calc__screen" aria-label="Экран калькулятора">{display}</div>
        <div className="calc__keys">
          <button className="btn btn--func" onClick={resetAll}>C</button>
          <button className="btn btn--func" onClick={toggleSign}>±</button>
          <button className="btn btn--func" onClick={percent}>%</button>
          <button className="btn btn--op" onClick={() => handleOperator('÷')}>÷</button>

          <button className="btn" onClick={() => inputDigit(7)}>7</button>
          <button className="btn" onClick={() => inputDigit(8)}>8</button>
          <button className="btn" onClick={() => inputDigit(9)}>9</button>
          <button className="btn btn--op" onClick={() => handleOperator('×')}>×</button>

          <button className="btn" onClick={() => inputDigit(4)}>4</button>
          <button className="btn" onClick={() => inputDigit(5)}>5</button>
          <button className="btn" onClick={() => inputDigit(6)}>6</button>
          <button className="btn btn--op" onClick={() => handleOperator('-')}>−</button>

          <button className="btn" onClick={() => inputDigit(1)}>1</button>
          <button className="btn" onClick={() => inputDigit(2)}>2</button>
          <button className="btn" onClick={() => inputDigit(3)}>3</button>
          <button className="btn btn--op" onClick={() => handleOperator('+')}>+</button>

          <button className="btn btn--zero" onClick={() => inputDigit(0)}>0</button>
          <button className="btn" onClick={inputDecimal}>,</button>
          <button className="btn btn--eq" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
