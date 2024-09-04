// script.js

// Array de produtos
const produtos = [
    {
        nome: "Camiseta Street-Joker",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta1.jpeg",
        imgCostas: "./assets/Costas/Camiseta1C.jpeg"
    },
    {
        nome: "Camiseta Smile-Drill",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta2.jpeg",
        imgCostas: "./assets/Costas/Camiseta2C.jpeg"
    },
    {
        nome: "Camiseta Prospery-Drill",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta3.jpeg",
        imgCostas: "./assets/Costas/Camiseta3C.jpeg"
    },
    {
        nome: "Camiseta Street-Drill",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta4.jpeg",
        imgCostas: "./assets/Costas/Camiseta4C.jpeg"
    },
    {
        nome: "Camiseta Smile-Drill",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta5.jpeg",
        imgCostas: "./assets/Costas/Camiseta5C.jpeg"
    },
    {
        nome: "Camiseta Street-Drill",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta6.jpeg",
        imgCostas: "./assets/Costas/Camiseta6C.jpeg"
    }
];

// Função para renderizar os produtos
function renderizarProdutos() {
    const container = document.querySelector('#menu');
    container.innerHTML = ''; // Limpa o conteúdo atual do container

    produtos.forEach(produto => {
        // Criação do HTML para um produto
        const produtoHTML = `
            <div class="flex gap-2">
                <div class="relative w-52 h-52 md:w-80 md:h-80 rounded-2xl bg-cover hover:scale-110 duration-300 mt-9 md:ml-9 ml-4 overflow-hidden">
                    <img class="carousel-image absolute inset-0 w-full h-full object-cover" src="${produto.imgFrente}" alt="${produto.nome}">
                    <img class="carousel-image absolute inset-0 w-full h-full object-cover hidden" src="${produto.imgCostas}" alt="${produto.nome} (Costa)">
                </div>
                <div class="ml-3">
                    <p class="font-bold md:text-3xl text-xl mt-9">${produto.nome}</p>
                    <div class="flex items-center gap-2 justify-between">
                        <p class="font-bold text-lg mt-3">${produto.preco}</p>
                        <button class="bg-gray-950 text-white px-5 rounded-lg add-to-btn mt-3"
                        data-name="${produto.nome}"
                        data-price="${produto.preco.replace('R$ ', '')}">
                            <i class="bi bi-cart-plus text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Adiciona o HTML ao container
        container.innerHTML += produtoHTML;
    });
}

// Chama a função para renderizar os produtos ao carregar a página
document.addEventListener('DOMContentLoaded', renderizarProdutos);

document.getElementById('menu').addEventListener('click', function(event) {
    const parentButton = event.target.closest(".add-to-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addToCart(name, price);
    }
});

function addToCart(name, price) {
    // Recupera o carrinho do localStorage ou inicializa um novo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Adiciona o novo item ao carrinho
    cart.push({ name, price });

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Exibe uma mensagem e redireciona para a página do carrinho
    Swal.fire("Produto adicionado ao carrinho!");
    window.location.href = './Pages-Roupas/Mostruario.html'; // Mude o caminho conforme necessário
}
