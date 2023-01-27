let uploadInput;
let uploadArea;
let filesList;
let btnUpload;

function main() {
    uploadInput = document.querySelector('.upload-area input');
    uploadArea = document.querySelector('.upload-area');
    uploadArea.onclick = () => uploadInput.click();

    filesList = document.querySelector('.files');
    btnUpload = document.getElementById('upload');

    uploadInput.onchange = function() {
        filesList.innerHTML = "";
        const files = uploadInput.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            createFileCard(file.name, file.size);
        }
    }
    btnUpload.onclick = upload;
}

function createFileCard(fileName, fileSize) {
    const cardElement = document.createElement('div');
    const fileNameElement = document.createElement('span');
    const fileSizeElement = document.createElement('span');

    cardElement.classList.add('file-card');
    fileNameElement.classList.add('file-name');
    fileSizeElement.classList.add('file-size');

    fileNameElement.textContent = fileName;
    fileSizeElement.textContent = "檔案大小: " + Math.round((fileSize / 1000) * 100) / 100 + " KB";

    cardElement.appendChild(fileNameElement);
    cardElement.appendChild(fileSizeElement);
    filesList.appendChild(cardElement);
}

function upload() {
    if (uploadInput.files.length !== 0) {
        btnUpload.textContent = "上傳中...";
        btnUpload.toggleAttribute('disabled');

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('user-file', uploadInput.files[0]);

        xhr.open('POST', 'upload.php', true);
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
                btnUpload.textContent = "已上傳";
                btnUpload.toggleAttribute('disabled');
                if (this.responseText == 0) {
                    alert("已上傳檔案!");
                } else {
                    alert(
                        "上傳失敗!\n" +
                        this.responseText
                    );
                }
            }
        }
        xhr.upload.onprogress = function(e) {
            const percentages = e.loaded * 100 / e.total;
            btnUpload.textContent = "正在上傳 (" + Math.round(percentages * 100) / 100 + "%)";
        };
        xhr.send(formData);
    }
}

window.onload = main;