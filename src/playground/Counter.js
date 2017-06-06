import React from 'react'

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) => (
  <div>
    <h1>Counter</h1>
      <p>
        Value: {value} times clicked,
        <button onClick={onIncrement}>
          +
        </button>
        <button onClick={onDecrement}>
          -
        </button>
        <button onClick={onIncrementAsync}>
          + (async)
        </button>
      </p>
  </div>
)
export default Counter
