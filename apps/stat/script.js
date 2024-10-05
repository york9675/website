const textInput = document.getElementById("text-input");
const clearButton = document.getElementById("clear-button");

const charCountElem = document.getElementById("char-count");
const numberCountElem = document.getElementById("number-count");
const lineCountElem = document.getElementById("line-count");
const paragraphCountElem = document.getElementById("paragraph-count");
const chineseCountElem = document.getElementById("chinese-count");
const chinesePunctuationCountElem = document.getElementById("chinese-punctuation-count");
const englishCountElem = document.getElementById("english-count");
const englishPunctuationCountElem = document.getElementById("english-punctuation-count");
const wordCountElem = document.getElementById("word-count");
const byteWordCountElem = document.getElementById("byte-word-count");

function updateStatistics() {
    const text = textInput.value;
    
    charCountElem.innerText = text.length;
    numberCountElem.innerText = (text.match(/\d/g) || []).length;
    lineCountElem.innerText = (text.match(/\n/g) || []).length + 1;
    paragraphCountElem.innerText = (text.match(/\n\s*\n/g) || []).length + 1;
    chineseCountElem.innerText = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    chinesePunctuationCountElem.innerText = (text.match(/[\u3000-\u303F]/g) || []).length;
    englishCountElem.innerText = (text.match(/[a-zA-Z]/g) || []).length;
    englishPunctuationCountElem.innerText = (text.match(/[.,!?;:'"]/g) || []).length;
    wordCountElem.innerText = (text.match(/\b\w+\b/g) || []).length;
    byteWordCountElem.innerText = new Blob([text]).size;
}

textInput.addEventListener("input", updateStatistics);
clearButton.addEventListener("click", () => {
    textInput.value = "";
    updateStatistics();
});