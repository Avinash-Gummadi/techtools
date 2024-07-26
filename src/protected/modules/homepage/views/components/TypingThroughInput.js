import React, { useEffect, useRef, useState } from "react";
import useTyping from "react-typing-game-hook";

const TypingThroughInput = ({ text, paraSize }) => {
  const [duration, setDuration] = useState(0);
  const [rStarttime, setrStarttime] = useState('');
  const [rEndtime, setrEndtime] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const letterElements = useRef(null);

  const {
    states: {
      charsState,
      length,
      currIndex,
      currChar,
      phase,
      correctChar,
      errorChar,
      startTime,
      endTime
    },
    actions: { insertTyping, deleteTyping, resetTyping }
  } = useTyping(text, { skipCurrentWordOnSpace: false, pauseOnError: true });

  // Set WPM
  useEffect(() => {
    if (phase === 2 && endTime && startTime) {
      setDuration(Math.floor((endTime - startTime) / 1000));
      const edate = new Date(endTime);
      setrEndtime(edate.toTimeString());
    } else {
      setDuration(0);
    }
    if (startTime) {
      const sdate = new Date(startTime);
      setrStarttime(sdate.toTimeString());
    }
  }, [phase, startTime, endTime]);

  // Handle key presses
  const handleKeyDown = (e, letter, control) => {
    if (letter === "Escape") {
      resetTyping();
    } else if (letter === "Backspace") {
      deleteTyping(control);
    } else if (letter.length === 1) {
      insertTyping(letter);
    }
    if (letter === " ") {
      if (e.keyCode === 32) {
        e.preventDefault();
      }
    }
  };

  return (
    <>
      <div
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, e.key, e.ctrlKey)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={paraSize > 5 ? { outline: "none", position: "relative" } : { textAlign: "center", outline: "none", position: "relative" }}
      >
        <div
          ref={letterElements}
          className="tracking-wide pe-none user-select-none mb-3"
          tabIndex={0}
          style={{ outline: "none" }}
        >
          {text.split("").map((letter, index) => {
            let state = charsState[index];
            let color =
              state === 0
                ? "text-dark"
                : state === 1
                ? "text-success"
                : "text-danger";
            return (
              <span key={letter + index} className={`${phase !== 2 && isFocused && currIndex + 1 === index ? "curr-letter" : ""} ${color}`} style={paraSize > 5 ? { fontSize: "1.5rem" } : { fontSize: "2.5rem" }}>
                {letter}
              </span>
            );
          })}
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
        {startTime && rStarttime && <p className="mr-3 mb-0 font-weight-bold bg-dark text-white p-1 rounded"> Start Time: {rStarttime.split(" ")[0]}</p>}
        {endTime && rEndtime && <p className="mr-3 mb-0 font-weight-bold bg-dark text-white p-1 rounded"> End Time: {rEndtime.split(" ")[0]}</p>}
        <p className="mr-3 mb-0 font-weight-bold text-info"> Position: {currIndex + 1}</p>
        {currChar && phase === 1 && <p className="mr-3 mb-0 font-weight-bold text-black"> Character: "<span style={{ color: "red" }}>{currChar}</span>"</p>}
        <p className="mr-3 mb-0 font-weight-bold text-success">Rights: {correctChar}</p>
        <p className="mr-3 mb-0 font-weight-bold text-danger">Wrongs: {errorChar}</p>
        {phase === 2 && startTime && endTime ? (
          <>
            <p className="text-dark mr-3 mb-0 font-weight-bold">
              WPM: {Math.round(((60 / duration) * correctChar) / 5)}
            </p>
            <p className="text-warning mr-3 mb-0 font-weight-bold">Duration: {duration}s</p>
            <p className="mr-3 mb-0 font-weight-bold" style={{ color: "#0026ff" }}>
              Accuracy: {(((length - errorChar) / length) * 100).toFixed(2)}%
            </p>
          </>
        ) : null}
      </div>
      {startTime && <button className="btn-warning btn-sm rounded border mr-3" onClick={() => resetTyping()}>try again(ESC)</button>}
    </>
  );
};

export default TypingThroughInput;