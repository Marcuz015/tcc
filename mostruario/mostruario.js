
    // Array de produtos
    const produtos = [
        {
            nome: "Camiseta Street-Joker",
            preco: "R$ 79,99",
        }
    ];

    // Função para exibir o nome do produto
    function displayProductName() {
        const productNameElement = document.getElementById('productName');
        productNameElement.textContent = produtos[0].nome; // Pega o nome do primeiro produto
    }

    // Chama a função quando a página carregar
    window.onload = displayProductName;

