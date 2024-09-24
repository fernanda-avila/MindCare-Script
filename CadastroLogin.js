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
        console.log('\n1. Login\n2. Cadastrar\n3. Mostrar Todos os Usuários\n4. Editar Perfil\n5. Deletar Perfil\n6. Sair');
        const choice = prompt('Escolha uma opção (ou "voltar" para retornar): ');

        if (choice === '1') login();
        else if (choice === '2') register();
        else if (choice === '3') showAllUsers();
        else if (choice === '4') editProfile();
        else if (choice === '5') deleteProfile();
        else if (choice === '6' || choice.toLowerCase() === 'voltar') {
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

function login() {
    while (true) {
        const email = prompt('Digite seu email (ou "voltar" para retornar): ');
        if (email.toLowerCase() === 'voltar') return;

        const user = users.find(u => u.email === email);
        if (!user) {
            console.log('Usuário não encontrado.');
            continue;
        }

        const password = prompt('Digite sua senha: ');
        if (bcrypt.compareSync(password, user.password)) {
            console.log('Login realizado com sucesso!');
            return;
        } else {
            console.log('Senha incorreta.');
        }
    }
}

// Função para editar perfil
function editProfile() {
    const email = prompt('Digite seu email para editar seu perfil (ou "voltar" para retornar): ');
    const user = users.find(u => u.email === email);

    if (!user) {
        console.log('Usuário não encontrado.');
        return;
    }

    console.log('Usuário encontrado. Você pode editar os seguintes campos:');
    const newEmail = prompt(`Novo email (atual: ${user.email}): `);
    const newPassword = prompt('Nova senha (mínimo 8 caracteres e um número): ');
    const newBirthDate = prompt(`Nova data de nascimento (atual: ${user.birthDate}): `);
    const newPhone = prompt(`Novo telefone (atual: ${user.phone}): `);
    const newIsAdult = prompt(`Você é maior de idade? (atual: ${user.isAdult ? 'Sim' : 'Não'}) (sim/não): `).toLowerCase() === 'sim';

    // Atualiza os dados do usuário
    if (newEmail) user.email = newEmail;
    if (newPassword && isValidPassword(newPassword)) {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(newPassword, salt);
    }
    if (newBirthDate) user.birthDate = newBirthDate;
    if (newPhone) user.phone = newPhone;
    user.isAdult = newIsAdult;

    // Atualiza o arquivo com as novas informações
    updateUsersFile(users);
    console.log('Perfil atualizado com sucesso!');
}

// Função para deletar perfil
function deleteProfile() {
    const email = prompt('Digite seu email para deletar seu perfil (ou "voltar" para retornar): ');
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
        console.log('Usuário não encontrado.');
        return;
    }

    // Confirmação de exclusão
    const confirmation = prompt(`Tem certeza que deseja deletar o perfil associado ao email ${email}? (sim/não): `).toLowerCase();
    if (confirmation !== 'sim') {
        console.log('Operação cancelada.');
        return;
    }
    

    // Remove o usuário do array
    users.splice(userIndex, 1);

    // Atualiza o arquivo com a lista de usuários
    updateUsersFile(users);
    console.log('Perfil deletado com sucesso!');
}


// Iniciando o menu principal
mainMenu();
