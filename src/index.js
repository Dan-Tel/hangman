import "./style.scss";
import html from "./index.html";
import hangman0 from "./assets/images/hangman-0.svg";
import hangman1 from "./assets/images/hangman-1.svg";
import hangman2 from "./assets/images/hangman-2.svg";
import hangman3 from "./assets/images/hangman-3.svg";
import hangman4 from "./assets/images/hangman-4.svg";
import hangman5 from "./assets/images/hangman-5.svg";
import hangman6 from "./assets/images/hangman-6.svg";
import virtualKeyboardHover from "./assets/audio/virtual-keyboard-hover.mp3";

function generateLettersObj() {
  const lettersObj = {};

  for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    const letter = String.fromCharCode(i);
    lettersObj[letter] = false;
  }

  return lettersObj;
}

function getCypheredWord(secretWord, guessedLetters) {
  const letters = secretWord.split("").map((letter) => {
    if (guessedLetters[letter]) {
      return letter;
    } else {
      return "_";
    }
  });

  const cypheredWord = letters.join(" ");
  return cypheredWord;
}

function createVirtualKeyboard() {
  const virtualKeyboard = document.createElement("div");
  virtualKeyboard.className = "virtual-keyboard";

  for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    const letter = String.fromCharCode(i);

    const key = document.createElement("div");
    key.className = "virtual-keyboard__key";
    key.innerHTML = letter;

    key.addEventListener("click", () => {
      if (key.classList.contains("used")) return;

      new Audio(virtualKeyboardHover).play();
      key.classList.add("used");
    });

    virtualKeyboard.append(key);
  }

  return virtualKeyboard;
}

function createQuiz(secretWord, guessedLetters) {
  const quiz = document.createElement("div");
  quiz.className = "quiz";
  quiz.innerHTML = `
    <h1 class="secret-word">${getCypheredWord(secretWord, guessedLetters)}</h1>
    <h2 class="hint">Hint: ${hint}</h2>
    <h2 class="incorrect-guesses">Incorrect guesses: <span>${incorrectGuesses} / 6</span></h2>
  `;

  const virtualKeyboard = createVirtualKeyboard();
  quiz.append(virtualKeyboard);

  return quiz;
}

function createHangman(hangmanImages, incorrectGuesses) {
  const hangman = document.createElement("div");
  hangman.className = "hangman";
  hangman.innerHTML = `<img src="${hangmanImages[incorrectGuesses]}" />`;

  return hangman;
}

const body = document.body;
const container = document.createElement("div");
container.className = "container";

let incorrectGuesses = 0;
const guessedLetters = generateLettersObj();

let secretWord = "RAINBOW";
let hint =
  "A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light.";

const hangmanImages = [
  hangman0,
  hangman1,
  hangman2,
  hangman3,
  hangman4,
  hangman5,
  hangman6,
];

const hangman = createHangman(hangmanImages, incorrectGuesses);
const quiz = createQuiz(secretWord, guessedLetters);

container.append(hangman);
container.append(quiz);
body.append(container);
