
import React, { useState } from 'react';

function App() {
  // Declare a state variable 'count' and a function to update it, 'setCount'
  const [count, setCount] = useState(0);

  // Increment handler with an upper limit
  const handleIncrement = () => {
    if (count < 20) {
      setCount(count + 1);
    } else {
      alert("Count cannot go beyond 20!");
    }
  };

  // Decrement handler with a lower limit
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      alert("Count cannot go below 0!");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter: {count}</h1>
      <button 
        onClick={handleIncrement} 
        style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}
      >
        Increment
      </button>
      <button 
        onClick={handleDecrement} 
        style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}
      >
        Decrement
      </button>
      <button 
        onClick={() => setCount(0)} 
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Reset
      </button>
    </div>
  );
}



export default App
