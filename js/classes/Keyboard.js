/* eslint-disable import/extensions */
import Key from "./Key.js";

import commonKeys from "../keyValues/commonKeys.js";
import enKeys from "../keyValues/enKeys.js";
import ruKeys from "../keyValues/ruKeys.js";

class Keyboard {
  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("keyboard");

    this.commonKeys = commonKeys;
    this.languages = [enKeys, ruKeys];
    this.currentLanguageIndex = 0;
    this.initializeCurrentLanguageIndex();

    this.keys = [];
    this.initializeKeyboard();
    this.initializeSwitchLanguageEvent();
  }

  initializeCurrentLanguageIndex() {
    this.currentLanguageIndex = localStorage.getItem("language");
    if (this.currentLanguageIndex !== null) {
      this.currentLanguageIndex = JSON.parse(this.currentLanguageIndex);
    } else {
      localStorage.setItem("language", 0);
    }
  }

  initializeKeyboard() {
    const keyCodes = [
      ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
      ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete"],
      ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
      ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
      ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"],
    ];

    for (let i = 0; i < keyCodes.length; i += 1) {
      this.keys[i] = [];
      for (let j = 0; j < keyCodes[i].length; j += 1) {
        const key = new Key(keyCodes[i][j], this);
        this.keys[i].push(key);
      }
    }

    const keyRows = [];
    for (let i = 0; i < this.keys.length; i += 1) {
      const keyRow = document.createElement("div");
      keyRow.classList.add("keyboard__row");
      for (let j = 0; j < this.keys[i].length; j += 1) {
        keyRow.append(this.keys[i][j].element);
      }
      keyRows.unshift(keyRow);
    }

    keyRows.forEach((keyRow) => {
      this.element.prepend(keyRow);
    });
  }

  initializeSwitchLanguageEvent() {
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.altKey) {
        this.switchToNextLanguage();
        this.getKeysFlatArray().forEach((key) => {
          key.setLetter(this.currentLanguageIndex);
        });
      }
    });
  }

  getKeysFlatArray() {
    const flatArray = [];
    for (let i = 0; i < this.keys.length; i += 1) {
      for (let j = 0; j < this.keys[i].length; j += 1) {
        flatArray.push(this.keys[i][j]);
      }
    }
    return flatArray;
  }

  switchToNextLanguage() {
    if (this.currentLanguageIndex + 1 < this.languages.length) {
      this.currentLanguageIndex += 1;
    } else {
      this.currentLanguageIndex = 0;
    }
  }

  setOutputInterface(outputInterface) {
    this.outputInterface = outputInterface;
  }

  inputChar(char) {
    this.outputInterface.output(char);
  }

  removeChar() {
    this.outputInterface.remove();
  }
}

export default Keyboard;
