import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
function Password() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const copypass = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, length, numberAllowed, charAllowed]);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Password Generator
        </h2>
        <div className="mb-4">
          <input
            type="text"
            id="passwordOutput"
            value={password}
            className="bg-gray-100 p-2 w-full rounded border border-gray-300"
            ref={copypass}
            readOnly
          />
        </div>
        <div className="mb-4">
          <button
            id="copyButton"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              navigator.clipboard.writeText(password);
            }}
          >
            Copy Password
          </button>
        </div>
        <div className="mb-4">
          <label className="block">
            <span>
              Password Length: <span id="lengthDisplay">{length}</span>
            </span>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="slider mt-1"
              id="lengthSlider"
              onChange={(e) => setLength(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              id="includeChars"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <span className="ml-2">Include Characters</span>
          </label>
          <br></br>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              id="includeNumbers"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <span className="ml-2">Include Numbers</span>
          </label>
        </div>
      </div>
    </>
  );
}

export default Password;
