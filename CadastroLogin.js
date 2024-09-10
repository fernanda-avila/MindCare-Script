const prompt = require('prompt-sync')();
const users = [];
let currentUser = null;

// Checando se dados são válidos
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => /^(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

// Função registrar
function register() {
    while (true) {
        const email = prompt('Digite seu email (ou "voltar" para retornar): ');
        if (email.toLowerCase() === 'voltar') return;

        // Verifica se email cadastrado
        if (users.some(u => u.email === email)) {
            console.log('Usuário já cadastrado.');
            continue;
        }

        const password = prompt('Digite sua senha (mínimo 8 caracteres e um número): ');
        // Verifica email e senha válidos
        if (!isValidEmail(email) || !isValidPassword(password)) {
            console.log('Dados inválidos.');
            continue;
        }

        const birthDate = prompt('Digite sua data de nascimento (DD/MM/AAAA): ');
        const phone = prompt('Digite seu telefone: ');
        const isAdult = prompt('Você é maior de idade? (sim/não): ').toLowerCase() === 'sim';

        // Cria usuário e adiciona ao array
        const newUser = { email, password, birthDate, phone, isAdult };
        users.push(newUser);
        console.log('Cadastro realizado com sucesso!');
        return;
    }
}

// Função logar
function login() {
    while (true) {
        const email = prompt('Digite seu email (ou "voltar" para retornar): ');
        if (email.toLowerCase() === 'voltar') return;

        const password = prompt('Digite sua senha: ');
        currentUser = users.find(u => u.email === email && u.password === password);
        if (currentUser) {
            console.log('Login realizado com sucesso!');
            userMenu();
            return;
        } else {
            console.log('Email ou senha incorretos.');
        }
    }
}

// Função ver perfil
function viewProfile() {
    if (currentUser) {
        console.log('Seu cadastro:', currentUser);
    } else {
        console.log('Nenhum usuário logado.');
    }
}

// Função editar perfil
function editAccount() {
    if (currentUser) {
        currentUser.email = prompt('Novo email: ');
        currentUser.password = prompt('Nova senha (mínimo 8 caracteres e um número): ');
        currentUser.birthDate = prompt('Nova data de nascimento (DD/MM/AAAA): ');
        currentUser.phone = prompt('Novo telefone: ');
        currentUser.isAdult = prompt('Maior de idade? (sim/não): ').toLowerCase() === 'sim';
        console.log('Dados atualizados com sucesso!');
    } else {
        console.log('Nenhum usuário logado.');
    }
}

// Função excluir conta
function deleteAccount() {
    if (currentUser) {
        const index = users.indexOf(currentUser);
        if (index > -1) {
            users.splice(index, 1);
            console.log('Conta excluída.');
        }
        currentUser = null;
    } else {
        console.log('Nenhum usuário logado.');
    }
}

// Função mostrar todos os usuários
function showAllUsers() {
    if (users.length === 0) {
        console.log('Nenhum usuário cadastrado.');
    } else {
        console.log('Usuários cadastrados:');
        users.forEach((user, index) => {
            console.log(`${index + 1}. Email: ${user.email}, Data de Nascimento: ${user.birthDate}, Telefone: ${user.phone}, Maior de idade: ${user.isAdult ? 'Sim' : 'Não'}`);
        });
    }
}

// Função menu do usuário logado
function userMenu() {
    while (currentUser) {
        console.log('\n1. Ver Cadastro\n2. Editar Perfil\n3. Excluir Conta\n4. Logout');
        const choice = prompt('Escolha uma opção (ou "voltar" para retornar): ');

        if (choice === '1') viewProfile();
        else if (choice === '2') editAccount();
        else if (choice === '3') {
            deleteAccount();
            console.log('Logout realizado.');
            currentUser = null;
            return; 
        } else if (choice === '4' || choice.toLowerCase() === 'voltar') {
            console.log('Logout realizado.');
            currentUser = null;
            return;  
        } else {
            console.log('Opção inválida.');
        }
    }
}

// Função menu principal
function mainMenu() {
    while (true) {
        console.log('\n1. Login\n2. Cadastrar\n3. Mostrar Todos os Usuários\n4. Sair');
        const choice = prompt('Escolha uma opção (ou "voltar" para retornar): ');

        if (choice === '1') login();
        else if (choice === '2') register();
        else if (choice === '3') showAllUsers();
        else if (choice === '4' || choice.toLowerCase() === 'voltar') {
            console.log('Saindo...');
            break;  
        } else {
            console.log('Opção inválida.');
        }
    }
}

// Iniciando programa
mainMenu();
