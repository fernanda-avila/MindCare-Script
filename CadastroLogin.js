const bcrypt = require('bcryptjs');
const prompt = require('prompt-sync')();
const fs = require('fs'); 
const path = require('path');
const users = require('./users'); 

// Função para registrar um novo usuário e salvar no arquivo users.js
function register() {
    while (true) {
        const email = prompt('Digite seu email (ou "voltar" para retornar): ');
        if (email.toLowerCase() === 'voltar') return;

        if (users.some(u => u.email === email)) {
            console.log('Usuário já cadastrado.');
            continue;
        }

        const password = prompt('Digite sua senha (mínimo 8 caracteres e um número): ');
        if (!isValidEmail(email) || !isValidPassword(password)) {
            console.log('Dados inválidos.');
            continue;
        }

        // Criptografa a senha
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const birthDate = prompt('Digite sua data de nascimento (DD/MM/AAAA): ');
        const phone = prompt('Digite seu telefone: ');
        const isAdult = prompt('Você é maior de idade? (sim/não): ').toLowerCase() === 'sim';

        // Cria o novo usuário
        const newUser = { email, password: hashedPassword, birthDate, phone, isAdult };
        
        // Adiciona o novo usuário ao array
        users.push(newUser);

        // Escreve o array atualizado no arquivo users.js
        updateUsersFile(users);

        console.log('Cadastro realizado com sucesso!');
        return;
    }
}

// Função para atualizar o arquivo users.js
function updateUsersFile(updatedUsers) {
    const filePath = path.join(__dirname, 'users.js'); 
    const content = `const users = ${JSON.stringify(updatedUsers, null, 4)};\n\nmodule.exports = users;`; // Conteúdo a ser salvo no arquivo

    // Escreve no arquivo users.js
    fs.writeFileSync(filePath, content, 'utf-8');
}

// Funções de validação
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) => /^(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

// Função principal
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

// Mostra todos os usuários cadastrados
function showAllUsers() {
    console.log("Usuários cadastrados:");
    users.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}, Data de Nascimento: ${user.birthDate}, Telefone: ${user.phone}, Maior de idade: ${user.isAdult ? 'Sim' : 'Não'}`);
    });
}

// Iniciando o menu principal
mainMenu();
