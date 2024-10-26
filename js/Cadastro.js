Parse.initialize("OEwZoFZ1YRhiEAKSM3o08SPWscNrLt6kTiWhjWWM", "fplCVBTYJw9iQrfUdB1b7vlkFPdG9OgZFCLhpvz7");
Parse.serverURL = 'https://parseapi.back4app.com/';

document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Cria um novo usuário no Back4App
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("nome", nome);
    user.set("sobrenome", sobrenome);
    user.set("email", email);

    // Salva o usuário
    user.signUp().then((user) => {
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html'; // Redireciona para a página de login
    }).catch((error) => {
        alert(`Erro: ${error.message}`);
    });
});
