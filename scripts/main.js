const chosenLetter = document.getElementById("letter");
const inputCheckbox = [...document.querySelectorAll("input[type=checkbox]")];
const inputText = [...document.querySelectorAll("input[type=text]")];
const divText = [...document.querySelectorAll(".text")];
const labels = [...document.querySelectorAll("label")];
const timerBox = document.querySelector(".timer-box");
const buttonPause = document.getElementById("pause");
const buttonReset = document.getElementById("reset");

function ableInputs() {
  setTimeout(() => {
    const allTypeText = inputText.every((input) => {
      return input.disabled === true;
    });
    if (allTypeText) {
      inputText.forEach((i) => {
        i.disabled = false;
        i.style.cursor = "text";
      });
    }
    const allTypeCheckBox = inputCheckbox.every((checkbox) => {
      return checkbox.disabled === true;
    });
    if (allTypeCheckBox) {
      inputCheckbox.forEach((c) => {
        c.disabled = false;
        c.style.cursor = "text";
      });
    }
  }, 5000);
}

ableInputs();
sortedLetter();
disabledField();
setTimeout(() => {
    timer();
}, 5500);

function sortedLetter() {
  let alphabetArray = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "y", "x", "z",
  ];

  setTimeout(() => {
    chosenLetter.innerHTML = `Letra sorteada: ${alphabetArray[Math.floor(Math.random() * alphabetArray.length)].toUpperCase()}`;
  }, 3000);
}

function disabledField() {
  inputCheckbox.forEach((checkBox, index) => {
    checkBox.addEventListener("change", (evt) => {
      isFullField(index);
      inputText.forEach((input, i) => {
        if (i === index) {
          input.disabled = true;
        } else {
          input.disabled = false;
        }
      });
    });
  });
}

function timer() {
  let millisecondsTime = 0;
  let secondsTime = 0;
  let minutesTime = 0;
  let intervalId = null;
  let isPaused = false;

  let updateTimer = () => {
    millisecondsTime += 10;

    if (millisecondsTime >= 1000) {
      millisecondsTime = 0;
      secondsTime++;
    }
    if (secondsTime >= 60) {
      secondsTime = 0;
      minutesTime++;
    }

    timerBox.innerHTML = `${formatTime(minutesTime)}:${formatTime(secondsTime)}:${formatTime(millisecondsTime / 10)}`;
  };

  intervalId = setInterval(updateTimer, 10);

  timerBox.style.visibility = "visible";

  const resetTimer = () => {
    clearInterval(intervalId);
    millisecondsTime = 0;
    secondsTime = 0;
    minutesTime = 0;
    timerBox.innerHTML = "00:00:00";
  };

  buttonPause.addEventListener("click", () => {
    isPaused = !isPaused; 
    if (!isPaused) {
        intervalId = setInterval(updateTimer, 10);
    }else{
        clearInterval(intervalId);
    }
    buttonPause.innerText = isPaused ? "Continuar" : "Pausar";
  });

  buttonReset.addEventListener("click", ()=>{
    resetTimer();
    buttonPause.innerText = "Começar";
  });
}

function formatTime(value) {
  return value < 10 ? "0" + value : value;
}

function isFullField(index) {
  const inputTextString = inputText[index].value;
  const currentDivText = divText[index];
  const currentLabel = labels[index].innerText;

  if (inputTextString === "") {
    currentDivText.innerHTML = `Digite um valor para ${currentLabel}`;
    currentDivText.style.visibility = "visible";
  } else if (!isNaN(inputTextString)) {
    currentDivText.innerHTML = "Não pode haver valores numéricos";
    currentDivText.style.visibility = "visible";
  } else {
    currentDivText.style.visibility = "hidden";
  }
}
