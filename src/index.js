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

let incorrectGuesses = 0;
let correctGuesses = 0;
let guessedLetters = generateLettersObj();

const GAME_DATA = [
  {
    secretWord: "RAINBOW",
    hint: "A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light.",
  },
  {
    secretWord: "LANGUAGE",
    hint: "A system of communication consisting of words, gestures, and syntax.",
  },
  {
    secretWord: "WHISPER",
    hint: "To speak very softly or quietly, often in a secretive manner.",
  },
  {
    secretWord: "VACATION",
    hint: "A period of time devoted to pleasure, rest, or relaxation.",
  },
  {
    secretWord: "NOSTALGIA",
    hint: "A sentimental longing or wistful affection for the past.",
  },
  {
    secretWord: "CURIOSITY",
    hint: "A strong desire to know or learn something.",
  },
];

console.log(getRandomInt(0, GAME_DATA.length));
let { secretWord, hint } = GAME_DATA[getRandomInt(0, GAME_DATA.length)];

const hangmanImages = [
  hangman0,
  hangman1,
  hangman2,
  hangman3,
  hangman4,
  hangman5,
  hangman6,
];

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function generateLettersObj() {
  const lettersObj = {};

  for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    const letter = String.fromCharCode(i);
    lettersObj[letter] = false;
  }

  return lettersObj;
}

function getCypheredWord() {
  correctGuesses = 0;

  const letters = secretWord.split("").map((letter) => {
    if (guessedLetters[letter]) {
      correctGuesses++;
      return letter;
    } else {
      return "_";
    }
  });

  const cypheredWord = letters.join(" ");
  return cypheredWord;
}

function updateHangman() {
  const hangmanImg = document.querySelector(".hangman img");
  hangmanImg.src = hangmanImages[incorrectGuesses];
}

function updateQuiz() {
  const secretWordNode = document.querySelector(".secret-word");
  const incorrectGuessesNode = document.querySelector(".incorrect-guesses");

  if (secretWordNode) {
    secretWordNode.innerHTML = getCypheredWord(secretWord, guessedLetters);
  }
  if (incorrectGuesses) {
    incorrectGuessesNode.innerHTML = `Incorrect guesses: <span>${incorrectGuesses} / 6`;
  }
}

function wasGuessSuccessful(letter) {
  return secretWord.split("").includes(letter);
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

      guessedLetters[letter] = true;

      if (!wasGuessSuccessful(letter)) {
        incorrectGuesses++;
      }

      if (incorrectGuesses == 6) {
        showModal(false);
      }

      updateQuiz();
      updateHangman();

      if (correctGuesses == secretWord.length) {
        showModal(true);
      }
    });

    virtualKeyboard.append(key);
  }

  return virtualKeyboard;
}

function createQuiz() {
  const quiz = document.createElement("div");
  quiz.className = "quiz";
  quiz.innerHTML = `
    <h1 class="secret-word">${getCypheredWord(secretWord, guessedLetters)}</h1>
    <h2 class="hint">Hint: ${hint}</h2>
    <h2 class="incorrect-guesses">Incorrect guesses: <span>${incorrectGuesses} / 6</span></h2>
  `;

  const virtualKeyboard = createVirtualKeyboard(secretWord, guessedLetters);
  quiz.append(virtualKeyboard);

  return quiz;
}

function createHangman() {
  const hangman = document.createElement("div");
  hangman.className = "hangman";
  hangman.innerHTML = `<img src="${hangmanImages[incorrectGuesses]}" />`;

  return hangman;
}

function startGame() {
  const body = document.body;
  body.innerHTML = "";

  const container = document.createElement("div");
  container.className = "container";

  incorrectGuesses = 0;
  guessedLetters = generateLettersObj();

  ({ secretWord, hint } = GAME_DATA[getRandomInt(0, GAME_DATA.length)]);

  const hangman = createHangman();
  const quiz = createQuiz();
  const modal = createModal();

  container.append(hangman);
  container.append(quiz);
  body.append(container);
  body.append(modal);
}

function createModal() {
  const modalWrapper = document.createElement("div");
  modalWrapper.className = "modal__wrapper";

  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
    <h2 class="modal__text">YOU LOSE!</h2>
  `;

  const restartButton = document.createElement("button");
  restartButton.className = "modal__btn";
  restartButton.innerHTML = "RESTART";
  restartButton.addEventListener("click", startGame);

  modal.append(restartButton);

  modalWrapper.append(modal);

  return modalWrapper;
}

function updateModal(isWin) {
  const modalText = document.querySelector(".modal__text");
  modalText.innerHTML = `YOU ${isWin ? "WIN! 🤩" : "LOSE! 😓"}`;
}

function showModal(isWin) {
  updateModal(isWin);

  const modalWrapper = document.querySelector(".modal__wrapper");
  modalWrapper.classList.add("active");
}

startGame();
