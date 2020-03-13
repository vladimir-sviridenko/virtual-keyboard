class KeyboardOutput {
  constructor() {
    this.textarea = document.createElement("textarea");
    this.textarea.classList.add("output");
    this.textarea.setAttribute("autofocus", true);
    this.textarea.onblur = () => {
      this.textarea.focus();
    };
    this.textarea.addEventListener("keydown", (event) => {
      event.preventDefault();
    });
  }

  output(char) {
    const cursorPosition = this.textarea.selectionEnd;
    const start = this.textarea.value.slice(0, cursorPosition);
    const end = this.textarea.value.slice(cursorPosition, this.textarea.textLength);

    this.textarea.value = start + char + end;
    this.textarea.selectionEnd = cursorPosition + 1;
  }

  remove() {
    //  TODO, should remove one char, now removes all text;
    const cursorPosition = this.textarea.selectionEnd;
    if (cursorPosition !== 0) {
      const start = this.textarea.value.slice(0, cursorPosition - 1);
      const end = this.textarea.value.slice(cursorPosition, this.textarea.textLength);

      this.textarea.value = start + end;
      this.textarea.selectionEnd = cursorPosition - 1;
    }
  }
}

export default KeyboardOutput;
