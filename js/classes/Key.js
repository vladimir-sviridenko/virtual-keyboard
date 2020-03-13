class Key {
  constructor(code, keyBoard) {
    this.code = code;
    this.keyBoard = keyBoard;

    this.key = "";

    this.element = document.createElement("div");
    this.element.className = `keyboard__key key ${this.code}`;

    this.languageElements = [];
    this.isCapsLockPressed = false;

    this.initializeKey();
    this.addKeyboardEvents();
    this.addMouseEvents();
  }

  initializeKey() {
    this.keyBoard.languages.forEach((language) => {
      const languageElement = document.createElement("span");
      this.languageElements.push(languageElement);
      languageElement.classList.add(`key__${language.name}`);

      const caseDownElement = document.createElement("span");
      caseDownElement.classList.add("key__caseDown");
      const caseUpElement = document.createElement("span");
      caseUpElement.classList.add("key__caseUp");

      if (!this.isCommonKey()) {
        [caseDownElement.innerText, caseUpElement.innerText] = language[this.code];
      } else {
        caseDownElement.innerText = this.keyBoard.commonKeys[this.code];
        caseUpElement.innerText = this.keyBoard.commonKeys[this.code];
      }

      languageElement.prepend(caseDownElement);
      languageElement.prepend(caseUpElement);

      this.element.prepend(languageElement);
    });

    this.setLetter(this.keyBoard.currentLanguageIndex, this.isCapsLockPressed);
  }

  hideAllLetters() {
    for (let i = 0; i < this.languageElements.length; i += 1) {
      this.languageElements[i].hidden = true;
      const [caseUpElement, caseDownElement] = this.languageElements[i].children;
      caseDownElement.hidden = true;
      caseUpElement.hidden = true;
    }
  }

  setLetter(languageIndex, upperCase = this.isCapsLockPressed) {
    this.hideAllLetters();
    const [caseUpElement, caseDownElement] = this.languageElements[languageIndex].children;
    if (upperCase) {
      caseUpElement.hidden = false;
      this.key = caseUpElement.innerText;
    } else {
      caseDownElement.hidden = false;
      this.key = caseDownElement.innerText;
    }
    this.languageElements[languageIndex].hidden = false;
  }

  isCommonKey() {
    let isCommonKey = false;
    if (this.keyBoard.commonKeys[this.code]) {
      isCommonKey = true;
    }
    return isCommonKey;
  }

  addKeyboardEvents() {
    // TODO add behavior for some special keys
    document.addEventListener("keydown", (event) => {
      if (event.code === this.code) {
        this.keyDown();
      }
      if (event.code === "CapsLock") {
        if (!this.isCapsLockPressed) {
          this.isCapsLockPressed = true;
          if (this.code === "CapsLock") {
            this.element.classList.add("keyboard__key_active");
          }
        } else {
          this.isCapsLockPressed = false;
          if (this.code === "CapsLock") {
            this.element.classList.remove("keyboard__key_active");
          }
        }
        this.setLetter(this.keyBoard.currentLanguageIndex);
      } else if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        this.setLetter(this.keyBoard.currentLanguageIndex, !this.isCapsLockPressed);
      } else if (event.code === "Backspace") {
        this.keyBoard.removeChar();
      } else if (event.code === this.code) {
        if (this.isCommonKey()) {
          this.key = "";
        }
        switch (this.code) {
          case "Enter": this.key = "\n"; break;
          case "Tab": this.key = "\t"; break;
          case "Space": this.key = " "; break;
          default: break;
        }
        this.keyBoard.inputChar(this.key);
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.code === this.code) {
        this.keyUp();
      } else if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        this.setLetter(this.keyBoard.currentLanguageIndex);
      }
    });
  }

  addMouseEvents() {
    // TODO copy behavior of keyboard (addKeyboardEvents())
    this.element.addEventListener("mousedown", () => {
      this.keyDown();

      document.addEventListener("mouseup", () => {
        this.keyUp();
      });
    });
  }

  keyDown() {
    if (!this.element.classList.contains("keyboard__key_active") && this.code !== "CapsLock") {
      this.element.classList.add("keyboard__key_active");
    }
  }

  keyUp() {
    if (this.code !== "CapsLock") {
      this.element.classList.remove("keyboard__key_active");
    }
  }
}

export default Key;
