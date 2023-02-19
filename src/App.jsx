import { useState } from "react";

import "./App.css";

function App() {
  const [circles, setCircles] = useState([]);
  const [history, setHistory] = useState([]);

  function addCircle(e) {
    if (history.length > 0) {
      setHistory([]);
    }
    const { clientX, clientY } = e;
    setCircles([...circles, { x: clientX, y: clientY }]);
  }

  function handleUndo() {
    setHistory((prev) => {
      const lastAddedCircle = circles[circles.length - 1];
      return [...prev, lastAddedCircle];
    });

    setCircles([...circles.slice(0, circles.length - 1)]);
  }

  function handleDo() {
    setCircles([...circles, history[history.length - 1]]);
    setHistory([...history.slice(0, history.length - 1)]);
  }

  return (
    <div className="App">
      <div className="btns">
        <button disabled={!circles.length} onClick={handleUndo}>
          Undo
        </button>
        <button disabled={!history.length} onClick={handleDo}>
          Do
        </button>
      </div>
      <div className="canvas" onClick={addCircle}>
        {circles.map((circle, index) => {
          return (
            <div
              key={index}
              className="circle"
              style={{ top: `${circle.y - 25}px`, left: `${circle.x - 25}px` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default App;