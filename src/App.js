import { useReducer, useEffect, useRef } from 'react';
import './App.css';
import stopwatch from "./assets/stopwatch.png";

const initialState = {
  isRunning: false,
  time: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...state, isRunning: true };
    case 'stop':
      return { ...state, isRunning: false };
    case 'reset':
      return { isRunning: false, time: 0 };
    case 'tick':
      return { ...state, time: state.time + 1 };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const idRef = useRef(0);

  useEffect(() => {
    if (!state.isRunning) { 
      return; 
    }
    idRef.current = setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => {
      clearInterval(idRef.current);
      idRef.current = 0;
    };
  }, [state.isRunning]);
  
  return (
    <div className="container">
      <img src={stopwatch} alt="stopwatch" />
      <h1>{state.time}s</h1>
      <div>
        <button onClick={() => dispatch({ type: 'start' })}>
          Start
        </button>
        <button onClick={() => dispatch({ type: 'stop' })}>
          Stop
        </button>
        <button onClick={() => dispatch({ type: 'reset' })}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
