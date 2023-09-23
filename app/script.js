document.addEventListener("DOMContentLoaded", function () {
    const startNumberInput = document.getElementById("start-number");
    const endNumberInput = document.getElementById("end-number");
    const advancedToggle = document.getElementById("advanced-toggle");
    const advancedSettings = document.getElementById("advanced-settings");
    const excludedNumbersInput = document.getElementById("excluded-numbers");
    const generateButton = document.getElementById("generate-button");
    const resultElement = document.getElementById("result");

    advancedToggle.addEventListener("change", function () {
        advancedSettings.style.display = advancedToggle.value === "on" ? "block" : "none";
    });

    generateButton.addEventListener("click", function () {
        const start = parseInt(startNumberInput.value);
        const end = parseInt(endNumberInput.value);
        const excludedNumbers = excludedNumbersInput.value.split(",").map(num => parseInt(num.trim()));

        if (isNaN(start) || isNaN(end)) {
            alert("請輸入有效的起始號和末號!");
            return;
        }

        if (start > end) {
            alert("起始號不能大於末號!");
            return;
        }

        const availableNumbers = [];
        for (let i = start; i <= end; i++) {
            if (!excludedNumbers.includes(i)) {
                availableNumbers.push(i);
            }
        }

        if (availableNumbers.length === 0) {
            alert("所有座號都被排除了是要抽什麼XD");
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const selectedNumber = availableNumbers[randomIndex];
        resultElement.textContent = `選中的號碼是：${selectedNumber} 號 恭喜啦!`;
    });
});
