import { useState } from "react";
import "./counterStyles.css";

export default function Counters() {
  return (
    <div className="Counters">
      <Steps />
    </div>
  );
}

function Steps() {
  const [steps, setSteps] = useState(1);
  const [counter, setCounter] = useState(0);

  function IncrementCounter() {
    setCounter(() => counter + steps);
  }

  function decrementCounter() {
    setCounter(() => counter - steps);
  }
  function handleReset() {
    setSteps(1);
    setCounter(0);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "5px",
        }}
      >
        <input
          type="range"
          name="step"
          id="step"
          min="0"
          max="10"
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
        />
        <div>{`Step: ${steps}`}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "5px",
        }}
      >
        <input
          type="text"
          name="counter"
          id="counter"
          value={counter}
          onChange={(e) => setCounter(Number(e.target.value))}
        />
        <button onClick={decrementCounter}>-</button>

        <button onClick={IncrementCounter}>+</button>
      </div>
      <div>
        <Messages counts={counter} />
        <div>
          {counter !== 0 || steps > 1 ? (
            <button className="Reset" onClick={handleReset}>
              reset
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Messages({ counts }) {
  // const [date, setDate] = useState(0);
  let currentTime = new Date();
  currentTime.setDate(currentTime.getDate() + counts);

  // function changeDate() {
  //   currentTime.setDate(currentTime.getDate() + counts);
  //   setDate(currentTime);
  // }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "5px",
        }}
      >
        <p>
          {counts === -1 && `Yesterday was ${currentTime.toDateString()}`}
          {counts === 0 && `Today is ${currentTime.toDateString()}`}
          {counts === 1 && `Tommorrow is ${currentTime.toDateString()}`}
          {counts < -1 &&
            `${Math.abs(counts)} days ago was ${currentTime.toDateString()}`}
          {counts > 1 &&
            `${counts} days from Today is ${currentTime.toDateString()}`}
        </p>
      </div>
    </>
  );
}
