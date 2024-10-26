Parse.initialize("OEwZoFZ1YRhiEAKSM3o08SPWscNrLt6kTiWhjWWM", "fplCVBTYJw9iQrfUdB1b7vlkFPdG9OgZFCLhpvz7");
Parse.serverURL = 'https://parseapi.back4app.com/';

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Faz o login no Back4App
    Parse.User.logIn(username, password).then((user) => {
        // Armazena informações do usuário no localStorage
        const currentUser = {
            nome: user.get("nome"),
            sobrenome: user.get("sobrenome"),
            email: user.get("email"),
            username: user.get("username")
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('userLoggedIn', 'true');

        // Redireciona para a página de perfil
        window.location.href = '../pages/perfil.html';
    }).catch((error) => {
        alert(`Erro: ${error.message}`);
    });
});
