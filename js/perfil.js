// Inicializa o Parse SDK com suas credenciais
Parse.initialize("OEwZoFZ1YRhiEAKSM3o08SPWscNrLt6kTiWhjWWM", "fplCVBTYJw9iQrfUdB1b7vlkFPdG9OgZFCLhpvz7");
Parse.serverURL = 'https://parseapi.back4app.com/';

document.addEventListener('DOMContentLoaded', function() {
    // Obtém os dados do usuário armazenados no localStorage
    const user = JSON.parse(localStorage.getItem('currentUser'));

    // Verifica se o usuário está logado
    if (!user) {
        // Se não houver dados do usuário, redireciona para a página de login
        window.location.href = '../cadastro/login.html';
    } else {
        // Se o usuário estiver logado, preenche os dados na página
        document.getElementById('nome-usuario').textContent = `${user.nome} ${user.sobrenome}`;
        document.getElementById('email-usuario').textContent = user.email;
        document.getElementById('profile-picture-img').src = user.profilePicture || '../assets/default-profile.jpg'; // Define uma imagem padrão se não houver
    }

    // Função para carregar compras recentes
    loadRecentPurchases();

    // Adiciona o evento de logout
    document.getElementById('logout-button').addEventListener('click', logoutUser);
});

// Função para carregar compras recentes
function loadRecentPurchases() {
    const recentPurchases = JSON.parse(localStorage.getItem('recentPurchases')) || [];
    const purchasesList = document.getElementById('recent-purchases-list');

    if (recentPurchases.length === 0) {
        purchasesList.innerHTML = '<p class="font-bold">Nenhuma compra recente.</p>';
    } else {
        recentPurchases.forEach(purchase => {
            const purchaseItem = document.createElement('div');
            purchaseItem.classList.add('compras-item');
            purchaseItem.innerHTML = `
                <h3>${purchase.nomeProduto}</h3>
                <p>Preço: R$ ${purchase.preco.toFixed(2)}</p>
            `;
            purchasesList.appendChild(purchaseItem);
        });
    }
}

// Função para deslogar o usuário
function logoutUser() {
    Parse.User.logOut().then(() => {
        localStorage.removeItem('currentUser'); // Remove o usuário do localStorage
        window.location.href = '../cadastro/login.html'; // Redireciona para a página de login
    }).catch((error) => {
        console.error("Erro ao deslogar:", error);
    });
}
