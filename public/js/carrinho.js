function carregarCarrinho() {
    fetch('/api/carrinho')
        .then(response => response.json())
        .then(carrinho => {
            const cartItemsElement = document.getElementById('cart-items');
            const cartSummaryElement = document.getElementById('cart-summary');
            
            let cartHTML = '';
            let subtotal = 0;

            carrinho.forEach(item => {
                cartHTML += `
                    <div class="cart-item">
                        <img src="/img/camisa-placeholder.png" alt="${item.nome}">
                        <div class="item-details">
                            <h3>${item.nome}</h3>
                            <p>Tamanho: ${item.tamanho}</p>
                            <p>Quantidade: ${item.quantidade}</p>
                        </div>
                        <div class="item-price">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
                    </div>
                `;
                subtotal += item.preco * item.quantidade;
            });

            cartItemsElement.innerHTML = cartHTML;

            const frete = 15.00; // Valor fixo de frete para este exemplo
            const total = subtotal + frete;

            cartSummaryElement.innerHTML = `
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>R$ ${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Frete:</span>
                    <span>R$ ${frete.toFixed(2)}</span>
                </div>
                <div class="summary-row summary-total">
                    <span>Total:</span>
                    <span>R$ ${total.toFixed(2)}</span>
                </div>
            `;
        })
        .catch(error => {
            console.error('Erro ao carregar o carrinho:', error);
            alert('Erro ao carregar o carrinho. Por favor, recarregue a página.');
        });
}

function finalizarCompra() {
    const formaPagamento = document.querySelector('input[name="payment"]:checked');
    if (!formaPagamento) {
        alert('Por favor, selecione uma forma de pagamento.');
        return;
    }

    alert(`Compra finalizada! Forma de pagamento: ${formaPagamento.value}`);
    // Aqui você implementaria a lógica real de finalização da compra
}

// Carregar o carrinho quando a página for carregada
window.addEventListener('load', carregarCarrinho);