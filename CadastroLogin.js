const prompt = require('prompt-sync')();
const users = [];
let currentUser = null;

//checando se os dados são validos
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

//função para registrar
function register() {
    while (true) {
        const email = prompt('Digite seu email (ou "voltar" para retornar): ');
        if (email.toLowerCase() === 'voltar') return;

        if (users.some(u => u.email === email)) {
            console.log('Usuário já cadastrado.');
            continue;
        }

        const password = prompt('Digite sua senha: ');
        if (!isValidEmail(email) || !isValidPassword(password)) {
            console.log('Dados inválidos.');
            continue;
        }

        const birthDate = prompt('Digite sua data de nascimento (DD/MM/AAAA): ');
        const phone = prompt('Digite seu telefone: ');
        const isAdult = prompt('Você é maior de idade? (sim/não): ').toLowerCase() === 'sim';

        currentUser = { email, password, birthDate, phone, isAdult };
        users.push(currentUser);
        console.log('Cadastro realizado com sucesso!');
        return;
    }
}

//função para logar
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

//função para ver o perfil
function viewProfile() {
    console.log('Seu cadastro:', currentUser);
}

//função para editar o perfil
function editAccount() {
    currentUser.email = prompt('Novo email: ');
    currentUser.password = prompt('Nova senha: ');
    currentUser.birthDate = prompt('Nova data de nascimento (DD/MM/AAAA): ');
    currentUser.phone = prompt('Novo telefone: ');
    currentUser.isAdult = prompt('Maior de idade? (sim/não): ').toLowerCase() === 'sim';
    console.log('Dados atualizados com sucesso!');
}

//função para excluir a conta
function deleteAccount() {
    const index = users.indexOf(currentUser);
    if (index > -1) {
        users.splice(index, 1);
        console.log('Conta excluída.');
    }
    currentUser = null;
}

//função para o menu do usuário
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
            console.log('Opção inválida.');
        }
    }
}

//função para o menu principal
function mainMenu() {
    while (true) {
        console.log('\n1. Login\n2. Cadastrar\n3. Sair');
        const choice = prompt('Escolha uma opção (ou "voltar" para retornar): ');

        if (choice === '1') login();
        else if (choice === '2') register();
        else if (choice === '3' || choice.toLowerCase() === 'voltar') {
            console.log('Saindo...');
            break;  
        } else {
            console.log('Opção inválida.');
        }
    }
}

//iniciando o programa
mainMenu();
