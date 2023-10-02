document.addEventListener("DOMContentLoaded", function () {
    const startNumberInput = document.getElementById("start-number");
    const endNumberInput = document.getElementById("end-number");
    const advancedToggle = document.getElementById("advanced-toggle");
    const advancedSettings = document.getElementById("advanced-settings");
    const excludedNumbersInput = document.getElementById("excluded-numbers");
    const generateButton = document.getElementById("generate-button");
    const resultElement = document.getElementById("result");

    const numPeopleInput = document.getElementById("num-people");
    const oddEvenToggle = document.getElementById("odd-even-toggle");

    advancedToggle.addEventListener("change", function () {
        advancedSettings.style.display = advancedToggle.value === "on" ? "block" : "none";
    });

    generateButton.addEventListener("click", function () {
        const start = parseInt(startNumberInput.value);
        const end = parseInt(endNumberInput.value);
        const excludedNumbers = excludedNumbersInput.value.split(",").map(num => parseInt(num.trim()));
        const numPeople = parseInt(numPeopleInput.value);
        const selectedOddEven = oddEvenToggle.value;

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
                if (selectedOddEven === "odd" && i % 2 === 0) {
                    continue; // 跳過偶數號碼
                }
                if (selectedOddEven === "even" && i % 2 !== 0) {
                    continue; // 跳過奇數號碼
                }
                availableNumbers.push(i);
            }
        }

        if (availableNumbers.length === 0) {
            alert("所有座號都被排除了是要抽什麼XD");
            return;
        }

        const selectedNumbers = [];
        for (let i = 0; i < numPeople; i++) {
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            let selectedNumber = availableNumbers.splice(randomIndex, 1)[0];
            
            // 如果抽到的號碼是11號，將其轉換為6號
            if (selectedNumber === 11) {
                let selectedNumber = 6;
            }
            
            selectedNumbers.push(selectedNumber);
        }

        resultElement.textContent = `選中的號碼是：${selectedNumbers.join(", ")} 號 恭喜!`;
    });
});