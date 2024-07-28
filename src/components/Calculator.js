import React, { useState, useRef } from "react";
import { Heart, Star, Sparkles, Volume2, Delete } from "lucide-react";
import ButtonWrapper from "./ButtonWrapper";
import { Howl } from "howler";
import FloatingHearts from "./FloatingHearts";

import clickSound from "../sounds/click.wav";
import calculateSound from "../sounds/calculate.mp3";
import errorSound from "../sounds/error.wav";
import clearSound from "../sounds/clear.mp3";
import toggleSounds from "../sounds/toggle.mp3";

const Calculator = () => {
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const soundRef = useRef(null);

  const initializeAudio = () => {
    if (!isAudioInitialized) {
      soundRef.current = {
        click: new Howl({ src: [clickSound] }),
        calculate: new Howl({ src: [calculateSound] }),
        error: new Howl({ src: [errorSound] }),
        clear: new Howl({ src: [clearSound] }),
        toggle: new Howl({ src: [toggleSounds] }),
      };
      setIsAudioInitialized(true);
    }
  };

  const [display, setDisplay] = useState("");
  const [isSoundOn, setIssoundOn] = useState(true);

  const playSound = (soundName) => {
    if (isSoundOn && soundRef.current[soundName] && soundRef.current) {
      soundRef.current[soundName].play();
    }
  };

  const handleClick = (value) => {
    initializeAudio();
    setDisplay(display + value);
    playSound("click");
  };

  const handleCalculate = () => {
    initializeAudio();
    if (display !== "Error") {
      try {
        setDisplay(eval(display).toString());
        playSound("calculate");
      } catch (error) {
        setDisplay("Error");
        playSound("error");
      }
    } else {
      playSound("error");
    }
  };

  const handleDeleteLast = () => {
    initializeAudio();
    setDisplay(display.slice(0, -1));
    playSound("click");
  };

  const handleClear = () => {
    initializeAudio();
    setDisplay("");
    playSound("clear");
  };

  const toggleSound = () => {
    initializeAudio();
    setIssoundOn(!isSoundOn);
    playSound("toggle");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-purple-200 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200 to-transparent animate-shimmer-move"></div>
      </div>
      <FloatingHearts />
      <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-2xl max-w-xs mx-auto border-2 border-transparent animate-shimmer relative overflow-hidden ">
        <div className="flex items-center mb-4">
          <Star className="text-yellow-400 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-pink-600 font-sans">
            I am just a girl🎀
          </h2>
          <Star className="text-yellow-400 mr-2" size={24} />
        </div>

        <div className=" w-full bg-pink-100 p-3 rounded-lg mb-4 text-right text-2xl font-bold text-pink-700 shadow-inner overflow-scroll no-scrollbar">
          {display || "0"}
        </div>

        <div className="grid grid-cols-4 w-full mb-4 gap-3">
          {["7", "8", "9", "/"].map((btn) => (
            <ButtonWrapper
              key={btn}
              onClick={() => handleClick(btn)}
              className={`${
                btn === "/"
                  ? "bg-purple-400 hover:bg-purple-500"
                  : "bg-pink-300 hover:bg-pink-400 "
              }text-white font-bold py-3 px-4 rounded-lg`}
            >
              {btn}
            </ButtonWrapper>
          ))}
          {["4", "5", "6", "*"].map((btn) => (
            <ButtonWrapper
              key={btn}
              onClick={() => handleClick(btn)}
              className={`${
                btn === "*"
                  ? "bg-purple-400 hover:bg-purple-500"
                  : "bg-pink-300 hover:bg-pink-400 "
              }text-white font-bold py-3 px-4 rounded-lg`}
            >
              {btn}
            </ButtonWrapper>
          ))}
          {["1", "2", "3", "-"].map((btn) => (
            <ButtonWrapper
              key={btn}
              onClick={() => handleClick(btn)}
              className={`${
                btn === "-"
                  ? "bg-purple-400 hover:bg-purple-500"
                  : "bg-pink-300 hover:bg-pink-400 "
              }text-white font-bold py-3 px-4 rounded-lg `}
            >
              {btn}
            </ButtonWrapper>
          ))}
          {[".", "0", "+", "="].map((btn) => (
            <ButtonWrapper
              key={btn}
              onClick={btn === "=" ? handleCalculate : () => handleClick(btn)}
              className={`${
                btn === "=" || btn === "+" || btn === "."
                  ? "bg-purple-400 hover:bg-purple-500"
                  : "bg-pink-300 hover:bg-pink-400 "
              }text-white font-bold py-3 px-4 rounded-lg`}
            >
              {btn}
            </ButtonWrapper>
          ))}
        </div>
        <div className="grid grid-cols-4 w-full mb-4 gap-3">
          <ButtonWrapper
            onClick={handleClear}
            className="bg-pink-600 text-white font-bold py-3 px-4  rounded-lg col-span-3 mb-4"
          >
            Clear
          </ButtonWrapper>
          <ButtonWrapper
            onClick={handleDeleteLast}
            className="bg-pink-600 text-white font-bold py-3 px-4 rounded-lg col-span-1 mb-4"
          >
            <Delete />
          </ButtonWrapper>
        </div>

        <div className="flex justify-between items-center w-full ">
          <div className="flex space-x-2">
            <Heart className="text-pink-500" size={24} />
            <Sparkles className="text-yellow-400" />
            <Heart className="text-pink-500" size={24} />
          </div>
          <div>
            <button
              onClick={toggleSound}
              className="text-pink-500 hover:text-pink-600"
            >
              <Volume2 size={24} className={isSoundOn ? "" : "opacity-50"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calculator;
