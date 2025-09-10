const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let current = "";

function updateDisplay() {
  display.textContent = current || "0";
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    if (value === "C") {
      current = "";
    } else if (value === "=") {
      try {
        current = eval(current.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-"));
      } catch {
        current = "Error";
      }
    } else {
      current += value;
    }
    updateDisplay();
  });
});

document.addEventListener("keydown", e => {
  if (e.key.match(/[0-9+\-*/.]/)) {
    current += e.key.replace("*", "×").replace("/", "÷");
  } else if (e.key === "Enter") {
    try {
      current = eval(current.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-"));
    } catch {
      current = "Error";
    }
  } else if (e.key === "Backspace") {
    current = current.slice(0, -1);
  } else if (e.key.toLowerCase() === "c") {
    current = "";
  }
  updateDisplay();
});
