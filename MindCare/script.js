function validateLogin(email, password) {
    if (email === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (email === "usuario@example.com" && password === "senha123") {
        alert("Login bem-sucedido!");
       
    } else {
        alert("Email ou senha inválidos.");
    }
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    validateLogin(email, password);
});
