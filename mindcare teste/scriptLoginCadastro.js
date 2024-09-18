const users = [];
let currentUser = null;

// Validação de email e senha
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

// Referência aos elementos do DOM
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const formContainer = document.getElementById('form-container');
const authForm = document.getElementById('auth-form');
const submitBtn = document.getElementById('submit-btn');
const backBtn = document.getElementById('back-btn');

let formMode = 'login';

// Ação ao clicar em Login
loginBtn.addEventListener('click', () => {
    formMode = 'login';
    showForm('Login');
});

// Ação ao clicar em Cadastrar
registerBtn.addEventListener('click', () => {
    formMode = 'register';
    showForm('Cadastrar');
});

// Ação para voltar ao menu principal
backBtn.addEventListener('click', () => {
    formContainer.classList.add('hidden');
});

// Lógica de submissão do formulário
authForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (formMode === 'login') {
        login(email, password);
    } else if (formMode === 'register') {
        register(email, password);
    }
});

// Exibe o formulário com título adequado
function showForm(action) {
    formContainer.classList.remove('hidden');
    submitBtn.innerText = action;
}

// Função para registrar
function register(email, password) {
    if (users.some(u => u.email === email)) {
        alert('Usuário já cadastrado.');
        return;
    }

    if (!isValidEmail(email) || !isValidPassword(password)) {
        alert('Email ou senha inválidos.');
        return;
    }

    const birthDate = prompt('Digite sua data de nascimento (DD/MM/AAAA): ');
    const phone = prompt('Digite seu telefone: ');
    const isAdult = confirm('Você é maior de idade?');

    currentUser = { email, password, birthDate, phone, isAdult };
    users.push(currentUser);
    alert('Cadastro realizado com sucesso!');
    formContainer.classList.add('hidden');
}

// Função para login
function login(email, password) {
    currentUser = users.find(u => u.email === email && u.password === password);
    if (currentUser) {
        alert('Login realizado com sucesso!');
        formContainer.classList.add('hidden');
        // Aqui você pode exibir o menu do usuário ou outra funcionalidade
    } else {
        alert('Email ou senha incorretos.');
    }
}
