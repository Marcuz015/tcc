// Inicializa o Parse SDK com suas credenciais
Parse.initialize("OEwZoFZ1YRhiEAKSM3o08SPWscNrLt6kTiWhjWWM", "fplCVBTYJw9iQrfUdB1b7vlkFPdG9OgZFCLhpvz7");
Parse.serverURL = 'https://parseapi.back4app.com/';

let cart = JSON.parse(localStorage.getItem('cart')) || []; // Mantém os itens do carrinho persistentes
const inactivityTimeLimit = 15 * 60 * 1000; // 15 minutos de inatividade para logout automático
let inactivityTimer;

// Função para deslogar o usuário
function logoutUser() {
    Parse.User.logOut().then(() => {
        localStorage.removeItem('currentUser'); // Remove o usuário do localStorage
        window.location.href = "/login"; // Redireciona para a página de login
    }).catch((error) => {
        console.error("Erro ao deslogar:", error);
    });
}

// Reinicia o temporizador de inatividade
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logoutUser, inactivityTimeLimit);
}

// Adiciona eventos para detectar atividades do usuário
window.onload = resetInactivityTimer;
document.onmousemove = resetInactivityTimer;
document.onkeypress = resetInactivityTimer;
document.onclick = resetInactivityTimer;
document.onscroll = resetInactivityTimer;

// Logout ao fechar ou atualizar a página
window.addEventListener("beforeunload", (event) => {
    logoutUser();
});

// Função para adicionar produto ao carrinho
function addToCart(name, price, fotoFrenteUrl, tamanho, tamanhoInput) {
    if (!tamanho) {
        Swal.fire({
            icon: 'warning',
            title: 'Ops!',
            text: 'Por favor, selecione um tamanho.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#FF0000',
            background: '#f4f4f4',
            color: '#333'
        });
        return;
    }

    // Alerta de sucesso ao adicionar ao carrinho
    Swal.fire({
        icon: 'success',
        title: 'Produto adicionado!',
        text: `${name} foi adicionado ao carrinho.`,
        showConfirmButton: false,
        timer: 1500,
        background: '#4CAF50',
        color: 'white'
    });

    const item = { name, price, fotoFrente: fotoFrenteUrl, tamanho };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho no localStorage
    
    // Limpa o campo de tamanho para nova seleção
    tamanhoInput.value = '';
}

// Evento de clique para adicionar produtos ao carrinho
document.addEventListener('click', function(event) {
    if (event.target.closest('.add-to-cart')) {
        const productCard = event.target.closest('.product-card');
        const name = productCard.getAttribute('data-name');
        const price = parseFloat(productCard.getAttribute('data-price'));
        const fotoFrenteUrl = productCard.getAttribute('data-foto');

        // Captura o tamanho selecionado
        const tamanhoInput = productCard.querySelector('input[list="Lista_Tamanhos"]');
        const tamanho = tamanhoInput.value;

        // Adiciona ao carrinho e limpa o campo de tamanho
        addToCart(name, price, fotoFrenteUrl, tamanho, tamanhoInput);
    }
});

// Função para buscar e renderizar os produtos
async function fetchAndRenderProducts() {
    const Camisetas = Parse.Object.extend("Camisetas");
    const query = new Parse.Query(Camisetas);

    try {
        document.getElementById('loading').style.display = 'flex';
        const results = await query.find();
        const productContainer = document.querySelector('#menu main');
        productContainer.innerHTML = '';

        if (results.length === 0) {
            productContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
        } else {
            results.forEach((produto, index) => {
                const nome = produto.get("nome");
                const preco = produto.get("preco");
                const fotoFrenteFile = produto.get("fotoFrente");
                const fotoCostaFile = produto.get("fotoCosta");

                if (!nome || !preco || !fotoFrenteFile || !fotoCostaFile) {
                    console.error('Produto incompleto:', produto);
                    return;
                }

                const fotoFrenteUrl = fotoFrenteFile instanceof Parse.File ? fotoFrenteFile.url() : fotoFrenteFile;
                const fotoCostaUrl = fotoCostaFile instanceof Parse.File ? fotoCostaFile.url() : fotoCostaFile;

                const carouselId = `carousel-${index}`;

                const productHtml = `
                <div class="flex gap-2 p-4 rounded-lg ml-4 product-card" data-name="${nome}" data-price="${preco}" data-foto="${fotoFrenteUrl}">
                    <div class="image-container" id="${carouselId}">
                        <img class="product-image front" src="${fotoFrenteUrl}" alt="${nome}">
                        <img class="product-image back" src="${fotoCostaUrl}" alt="${nome}" style="display: none;">
                    </div>
                    <div class="ml-3">
                        <p class="font-bold md:text-3xl text-xl">${nome}</p>

                        <label for="tamanhos-${index}">Selecione o tamanho:</label>
                        <input class="rounded-2xl border-2 border-black shadow-md" list="Lista_Tamanhos" id="tamanhos-${index}" name="tamanhos"/>
                        <datalist class="text-center justify-center items-center ml-2" id="Lista_Tamanhos">
                            <option value="PP"></option>
                            <option value="P"></option>
                            <option value="M"></option> 
                            <option value="G"></option>
                            <option value="GG"></option>
                        </datalist>

                        <p class="text-lg">Coleção Exclusiva</p>
                        <p class="font-bold text-lg">R$ ${preco.toFixed(2)}</p>
                        <button class="bg-gray-950 text-white px-5 rounded-lg mt-3 add-to-cart">
                            <i class="bi bi-cart-plus text-lg"></i>
                        </button>
                    </div>
                </div>
                `;
                productContainer.innerHTML += productHtml;

                // Lógica do carrossel individual para cada produto
                setInterval(() => {
                    const container = document.getElementById(carouselId);
                    const front = container.querySelector('.front');
                    const back = container.querySelector('.back');

                    if (front.style.display === 'none') {
                        front.style.display = 'block';
                        back.style.display = 'none';
                    } else {
                        front.style.display = 'none';
                        back.style.display = 'block';
                    }
                }, 3000);
            });
        }

        document.getElementById('loading').style.display = 'none';
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        document.getElementById('loading').style.display = 'none';
    }
}

// Chama a função quando a página carregar
document.addEventListener('DOMContentLoaded', fetchAndRenderProducts);
