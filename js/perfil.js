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
});

function loadRecentPurchases() {
  const recentPurchases = JSON.parse(localStorage.getItem('recentPurchases')) || [];

  const purchasesList = document.getElementById('recent-purchases-list');

  if (recentPurchases.length === 0) {
      purchasesList.innerHTML = '<p>Nenhuma compra recente.</p>';
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
