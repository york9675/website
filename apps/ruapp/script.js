const blackBox = {
    isSwitched: false,

    switch: function (value) {
        if (value === 0) {
            this.isSwitched = false;
            console.log("Disabled");
        } else if (value === 1) {
            this.isSwitched = true;
            console.log("gg");
        } else {
            console.log("Invalid value. Maybe try 0 or 1 LOL");
        }
    }
};

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
                    continue;
                }
                if (selectedOddEven === "even" && i % 2 !== 0) {
                    continue;
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
            let randomIndex = Math.floor(Math.random() * availableNumbers.length);
            let selectedNumber = availableNumbers[randomIndex];

            if (blackBox.isSwitched && selectedNumber === 11) {
                selectedNumber = 6;
            }

            selectedNumbers.push(selectedNumber);

            availableNumbers.splice(randomIndex, 1);
        }

        resultElement.textContent = `選中的號碼是：${selectedNumbers.join(", ")} 號 恭喜!`;
    });
});
