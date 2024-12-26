function swapBlocks() {
  const block4 = document.querySelector(".block-4-content");
  const block5 = document.querySelector(".block-5-content");

  const tempContent = block4.innerHTML;
  block4.innerHTML = block5.innerHTML;
  block5.innerHTML = tempContent;
}

function calculateTriangleArea() {
  const existingResult = document.getElementById("triangleAreaResult");
  if (existingResult) {
    existingResult.remove();
  }

  const base = 5;
  const height = 10;
  const area = (base * height) / 2;

  const resultElement = document.createElement("p");
  resultElement.id = "triangleAreaResult";
  resultElement.textContent = `Площа трикутника: ${area}`;
  document.querySelector(".block-3").appendChild(resultElement);
}

document.addEventListener("DOMContentLoaded", () => {
  const block3 = document.querySelector(".block-3");

  if (sessionStorage.getItem("reloadAfterCookieDeletion")) {
    sessionStorage.removeItem("reloadAfterCookieDeletion");
    return;
  }

  const savedData = document.cookie
    .split("; ")
    .find((row) => row.startsWith("minValues="));

  if (savedData) {
    const minValues = decodeURIComponent(savedData.split("=")[1]);
    alert(
      `Збережені мінімальні числа: ${minValues}\nДані будуть видалені після натискання "OK".`
    );

    document.cookie =
      "minValues=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    alert("Cookies видалено. Перезавантажте сторінку.");

    sessionStorage.setItem("reloadAfterCookieDeletion", "true");

    location.reload();
  } else {
    const form = document.createElement("form");
    form.innerHTML = `
        <label>Введіть 10 чисел (через кому):</label><br>
        <input type="text" id="numbers" placeholder="1, 2, 3, ..." /><br>
        <button type="button" onclick="findMinValues()">Знайти мінімальні</button>
      `;
    block3.appendChild(form);
  }
});

function findMinValues() {
  const input = document.getElementById("numbers").value;
  const numbers = input
    .split(",")
    .map((num) => parseFloat(num.trim()))
    .filter((num) => !isNaN(num));
  const min = Math.min(...numbers);
  const minCount = numbers.filter((num) => num === min).length;

  alert(`Мінімальне число: ${min}, Кількість: ${minCount}`);
  document.cookie = `minValues=${encodeURIComponent(min)}; path=/`;
}

document.addEventListener("DOMContentLoaded", () => {
  const block3 = document.querySelector(".block-3");

  const savedColor = localStorage.getItem("Colorblock3");
  if (savedColor) {
    block3.style.color = savedColor;
  } else {
    const color = prompt(
      "Введіть колір для тексту блоку 3 (наприклад, red, blue):"
    );
    if (color) {
      block3.style.color = color;
      localStorage.setItem("Colorblock3", color);
      block3.style.color = localStorage.getItem("Colorblock3");
    }
  }
});

document.querySelectorAll(".block").forEach((block, index) => {
  block.addEventListener("dblclick", () => {
    block.innerHTML = "";

    const form = document.createElement("form");
    form.innerHTML = `
        <label>Введіть пункти списку (через кому):</label><br>
        <input type="text" id="listItems-${index}" placeholder="пункт 1, пункт 2, ..." /><br>
      `;

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.textContent = "Зберегти список";
    saveButton.addEventListener("click", () => saveList(index));

    form.appendChild(saveButton);
    block.appendChild(form);
  });
});

function saveList(blockIndex) {
  const input = document.getElementById(`listItems-${blockIndex}`).value;
  const items = input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item);

  if (items.length) {
    localStorage.setItem(`block${blockIndex}List`, JSON.stringify(items));

    const block = document.querySelectorAll(".block")[blockIndex];
    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    block.innerHTML = "";
    block.appendChild(ul);
  } else {
    alert("Будь ласка, введіть хоча б один пункт списку.");
  }
}

window.addEventListener("beforeunload", () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("block")) {
      localStorage.removeItem(key);
    }
  });
});
