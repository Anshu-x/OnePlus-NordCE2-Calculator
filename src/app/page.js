"use client";

import { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaBackspace, FaEquals } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { RiDivideLine } from "react-icons/ri";

export default function Home() {
  const numbers = ["00", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "."];
  const [solve, setSolve] = useState("");
  const [count, setCount] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [history, setHistory] = useState([]);

  const clear = () => {
    setSolve((prev) => prev.slice(0, -1));
  };

  const operations = [
    { icon: <RiDivideLine />, value: "/" },
    { icon: <IoCloseSharp />, value: "*" },
    { icon: <AiOutlineMinus />, value: "-" },
    { icon: <AiOutlinePlus />, value: "+" },
  ];

  const handleEquals = () => {
    try {
      if (/[\+\-\*\/]$/.test(solve)) {
        alert("Invalid input operation!");
        return;
      }
      const result = eval(solve);
      setHistory([...history, { expression: solve, result: result.toString() }]);
      setSolve(result.toString());
      setIsSolved(true);
    } catch {
      alert("Invalid input operation!");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (!isNaN(key) || key === ".") {
        setSolve((prev) => prev + key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        if (!/[\+\-\*\/]$/.test(solve)) {
          setSolve((prev) => prev + key);
        }
      } else if (key === "Enter") {
        handleEquals();
      } else if (key === "Backspace") {
        clear();
      } else if (key === "Escape") {
        setSolve("");
        setCount(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [solve]);

  return (
    <main className="pt-24 pb-20 flex w-full items-center justify-center h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      <div className="mx-auto w-[320px] md:w-[420px] bg-black pb-5 overflow-hidden shadow-2xl shadow-[#000000] rounded-3xl">
        {/* Display Screen */}
        <div className="bg-gray-800 rounded-b-3xl w-full h-[200px] md:h-[250px] flex justify-end items-end p-5 text-4xl font-semibold relative">
          <p className={`absolute top-5 left-5 font-light transition-all duration-500 ${solve.length ? "scale-y-0" : ""}`}>
            Calculator
          </p>
          <span className={solve.length > 16 ? "text-xl" : ""}>{solve}</span>
        </div>

        {/* Buttons */}
        <div className="w-full flex px-4 py-5 items-start text-white font-semibold text-3xl">
          <div className="w-4/5 flex items-center flex-wrap">
            <button
              onClick={() => {
                setSolve("");
                setCount(0);
              }}
              className="m-2 w-12 md:w-20 h-12 md:h-20 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-500"
            >
              AC
            </button>
            <button
              onClick={clear}
              className="m-2 w-12 md:w-20 h-12 md:h-20 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-500 flex items-center justify-center text-3xl"
            >
              <FaBackspace />
            </button>
            <button
              onClick={() => setSolve(solve + "%")}
              className="m-2 w-12 md:w-20 h-12 md:h-20 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-500"
            >
              %
            </button>
            {numbers
              .sort((a, b) => b - a)
              .map((num, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isSolved) {
                      setSolve(num.toString());
                      setIsSolved(false);
                    } else if (num === "." && count === 0) {
                      setSolve(solve + num);
                      setCount(1);
                    } else if (num !== ".") {
                      setSolve(solve + num);
                    }
                  }}
                  className="m-2 w-12 md:w-20 h-12 md:h-20 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-500"
                >
                  {num}
                </button>
              ))}
          </div>

          {/* Operations */}
          <div className="space-y-5">
            {operations.map((op, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!/[\+\-\*\/]$/.test(solve)) {
                    setSolve(solve + op.value);
                  }
                }}
                className="m-2 w-12 md:w-20 h-12 md:h-20 bg-gray-700 hover:bg-gray-600 transition-all duration-500 flex text-4xl items-center justify-center rounded-full"
              >
                {op.icon}
              </button>
            ))}
            <button
              onClick={handleEquals}
              className="m-2 w-12 md:w-20 h-12 md:h-20 bg-orange-500 hover:bg-orange-400 transition-all duration-500 flex items-center justify-center rounded-full"
            >
              <FaEquals />
            </button>
          </div>
        </div>

        {/* History */}
        <div className="bg-gray-900 p-4 rounded-b-3xl text-white">
          <h3 className="text-lg font-semibold">History</h3>
          <ul className="list-disc pl-5">
            {history.map((item, index) => (
              <li key={index}>
                {item.expression} = {item.result}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
