const textInput = document.getElementById("text-input");
const clearButton = document.getElementById("clear-button");
const trimSpacesButton = document.getElementById("trim-spaces-button");
const formatParagraphButton = document.getElementById("format-paragraph-button");

const charCountElem = document.getElementById("char-count");
const numberCountElem = document.getElementById("number-count");
const lineCountElem = document.getElementById("line-count");
const chineseCountElem = document.getElementById("chinese-count");
const chinesePunctuationCountElem = document.getElementById("chinese-punctuation-count");
const englishCountElem = document.getElementById("english-count");
const englishPunctuationCountElem = document.getElementById("english-punctuation-count");
const englishWordCountElem = document.getElementById("english-word-count");

function updateStatistics() {
    const text = textInput.value.trim(); // 去除多餘的空格

    // 計算字數
    charCountElem.innerText = text.length;
    
    // 計算數字數
    numberCountElem.innerText = (text.match(/\d/g) || []).length;

    // 如果文本框為空，將行數設為 0，否則根據換行符來計算行數
    if (text === "") {
        lineCountElem.innerText = 0;
    } else {
        lineCountElem.innerText = (text.match(/\n/g) || []).length + 1;
    }

    // 計算中文字數
    chineseCountElem.innerText = (text.match(/[\u4e00-\u9fa5]/g) || []).length;

    // 計算中文全形標點符號數
    chinesePunctuationCountElem.innerText = (text.match(/[\u3000-\u303F\uFF00-\uFFEF]/g) || []).length;

    // 計算英文字母數
    englishCountElem.innerText = (text.match(/[a-zA-Z]/g) || []).length;

    // 計算英文標點符號數
    englishPunctuationCountElem.innerText = (text.match(/[.,!?;:'"]/g) || []).length;

    // 計算英文單詞數
    englishWordCountElem.innerText = (text.match(/\b\w+\b/g) || []).length;
}

// 清除所有文字
clearButton.addEventListener("click", () => {
    textInput.value = "";
    updateStatistics();
});

// 清除行尾空格
trimSpacesButton.addEventListener("click", () => {
    textInput.value = textInput.value.replace(/[ \t]+$/gm, "");
    updateStatistics();
});

// 段落整理
formatParagraphButton.addEventListener("click", () => {
    textInput.value = textInput.value.replace(/^(?!\s)/gm, "    ");
    updateStatistics();
});

// 每次輸入時更新統計數據
textInput.addEventListener("input", updateStatistics);