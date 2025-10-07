import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);

  const num = (n) => {
    setDisplay(display === '0' ? n : display + n);
  };

  const oper = (o) => {
    setPrev(parseFloat(display));
    setOp(o);
    setDisplay('0');
  };

  const equals = () => {
    const a = prev;
    const b = parseFloat(display);
    let result = 0;
        
    if (op === '+') result = a + b;
    else if (op === '-') result = a - b;
    else if (op === '×') result = a * b;
    else if (op === '÷') result = a / b;
    
    setDisplay(result.toString());
    setPrev(null);
    setOp(null);
  };

  const clear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
  };

  return (

    <div style={{ background: '#ddd',height:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center',width:'100%', 
      borderRadius: '20px',



    }}>
      
      
      <div style={{ 
        background: 'linear-gradient(90deg, #154193ff 0%, #2a8f98ff 100%)',
        color: 'white',
        padding: '15px', 
        width: '280px',
        border: '3px solid #00050dff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px black'
        
      }}>
        
        
        <h3 style={{ margin: '0 0 10px 0' }}>Calculadora</h3>
        
        <div style={{
          background: '#b0bbc398',
          padding: '15px',
          fontSize: '28px',
          border: '2px solid #000000ff',
          marginBottom: '50px'  

        }}>

          {display}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
          <button onClick={() => num('7')} style={btn}>7</button>
          <button onClick={() => num('8')} style={btn}>8</button>
          <button onClick={() => num('9')} style={btn}>9</button>
          <button onClick={() => oper('÷')} style={btn}>÷</button>
          
          <button onClick={() => num('4')} style={btn}>4</button>
          <button onClick={() => num('5')} style={btn}>5</button>
          <button onClick={() => num('6')} style={btn}>6</button>
          <button onClick={() => oper('×')} style={btn}>×</button>
          
          <button onClick={() => num('1')} style={btn}>1</button>
          <button onClick={() => num('2')} style={btn}>2</button>
          <button onClick={() => num('3')} style={btn}>3</button>
          <button onClick={() => oper('-')} style={btn}>-</button>
          
          <button onClick={() => num('0')} style={btn}>0</button>
          <button onClick={clear} style={btn}>C</button>
          <button onClick={equals} style={btn}>=</button>
          <button onClick={() => oper('+')} style={btn}>+</button>
        </div>
      </div>


    </div>
  );
}

const btn = {
  background: '#2f5dabff',
  color: 'white',
  border: '2px solid #2563eb',
  padding: '15px',
  fontSize: '18px',
  cursor: 'pointer',
  boxShadow: '0 4px 8px black',
  borderRadius: '10px',
};