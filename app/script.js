const users = [
    { username: "York", password: "york0524" },
    { username: "PublicTest", password: "PasswordForPublicTest" }
];

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        window.location.href = "./ruapp/index.html";
    } else {
        alert("錯誤的使用者名稱或密碼!");
    }
});