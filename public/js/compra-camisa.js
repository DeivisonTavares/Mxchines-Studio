let quantity = 1;
let selectedSize = null;

function selectSize(button) {
    document.querySelectorAll('.size-selector button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedSize = button.textContent;
}

function updateQuantityDisplay() {
    document.querySelector('.quantity-display').textContent = quantity;
}

function increaseQuantity() {
    quantity++;
    updateQuantityDisplay();
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        updateQuantityDisplay();
    }
}

function calculateShipping() {
    const cep = document.getElementById('cep').value;
    if (cep.length !== 8) {
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        return;
    }

    fetch('/api/calcular-frete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cep }),
    })
    .then(response => response.json())
    .then(data => {
        const resultElement = document.getElementById('shipping-result');
        resultElement.innerHTML = `
            <p>Frete para o CEP ${cep}:</p>
            <p>Valor: R$ ${data.frete.toFixed(2)}</p>
            <p>Prazo de entrega: ${data.prazo} dias úteis</p>
        `;
    })
    .catch(error => {
        console.error('Erro ao calcular frete:', error);
        alert('Erro ao calcular frete. Por favor, tente novamente.');
    });
}

function addToCart() {
    if (!selectedSize) {
        alert('Por favor, selecione um tamanho.');
        return;
    }

    const produto = {
        nome: 'Camisa Elegante Preta',
        tamanho: selectedSize,
        quantidade: quantity,
        preco: 129.99
    };

    fetch('/api/adicionar-ao-carrinho', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
    })
    .then(response => response.json())
    .then(data => {
        alert(`Adicionado ao carrinho: ${produto.nome}\nTamanho: ${produto.tamanho}\nQuantidade: ${produto.quantidade}`);
    })
    .catch(error => {
        console.error('Erro ao adicionar ao carrinho:', error);
        alert('Erro ao adicionar ao carrinho. Por favor, tente novamente.');
    });
}

function continueShopping() {
    window.location.href = '/';
}
