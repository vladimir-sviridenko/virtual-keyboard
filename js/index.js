/* eslint-disable import/extensions */
import Keyboard from "./classes/Keyboard.js";
import KeyboardOutput from "./classes/KeyboardOutput.js";

(function main() {
  const keyboard = new Keyboard();
  const output = new KeyboardOutput();
  keyboard.setOutputInterface(output);

  document.body.prepend(keyboard.element);
  document.body.prepend(output.textarea);
}());
