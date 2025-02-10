document.addEventListener("DOMContentLoaded", () => {
    // Rolagem suave para os links de navegação
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
    // Timer para o próximo drop
    const proximoDrop = new Date("2025-02-27T00:00:00").getTime()
  
    const atualizarContagem = setInterval(() => {
      const agora = new Date().getTime()
      const diferenca = proximoDrop - agora
  
      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24))
      const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60))
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000)
  
      document.getElementById("countdown").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`
  
      if (diferenca < 0) {
        clearInterval(atualizarContagem)
        document.getElementById("countdown").innerHTML = "O drop já começou!"
      }
    }, 1000)
  })
  
  //navegacao entre paginas
  function IrHomepage() {
      window.location.href = "index.html";
  }

  //adicionar ao carrinho
  let quantidade = 1;
        let tamanhoSelecionado = ""; // Variável global para armazenar o tamanho selecionado
        const quantidadeElement = document.getElementById('quantidade');

        document.getElementById('diminuir').addEventListener('click', () => {
            if (quantidade > 1) {
                quantidade--;
                quantidadeElement.textContent = quantidade;
            }
        });

        document.getElementById('aumentar').addEventListener('click', () => {
            quantidade++;
            quantidadeElement.textContent = quantidade;
        });

        //ainda a implementar
        function calcularFrete() {
            const cep = document.getElementById('cep').value;
            const frete = Math.floor(Math.random() * 20) + 10;
            document.getElementById('freteInfo').textContent = `Frete para ${cep}: R$ ${frete},00`;
        }

        // Função para selecionar o tamanho da camisa
        function selecionarTamanhoDaCamisa(tamanho) {
            tamanhoSelecionado = tamanho; // Armazena o tamanho selecionado
            document.querySelectorAll(".tamanho").forEach(t => t.classList.remove("selecionado"));
            document.getElementById(`tamanho_${tamanho.toLowerCase()}`).classList.add("selecionado");
            alert("Tamanho " + tamanho + " selecionado!");
        }

        // Função para adicionar ao carrinho
        function adicionarAoCarrinho() {
            if (!tamanhoSelecionado) {
                alert("Por favor, selecione um tamanho antes de adicionar ao carrinho!");
                return;
            }

            const produto = {
                nome: "Camisa Modelo 1",
                preco: 99.90,
                tamanho: tamanhoSelecionado,
                quantidade: quantidade
            };

            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            carrinho.push(produto);
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            alert("Camisa " + tamanhoSelecionado + " adicionada ao carrinho!");
        }
  
  //carrinho
  function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    console.log(carrinho);
    const carrinhoLista = document.getElementById('carrinho-lista');
    let total = 0;

    carrinhoLista.innerHTML = '';
    carrinho.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('carrinho-item');
        itemElement.innerHTML = `
            <img src="../src/MXCHINES FOTO 6.png" alt="${item.nome}">
            <div>
                <h3>${item.nome}</h3>
                <p>Tamanho: ${item.tamanho}</p>
                <p>Quantidade: ${item.quantidade}</p>
                <p>Preço: R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
            </div>
            <button onclick="removerItem(${index}) class="btn-qualquer">Remover</button>
        `;
        carrinhoLista.appendChild(itemElement);
        total += item.preco * item.quantidade;
    });

    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

  //remover item do carrinho
  function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
  }

  //selecionar metodo de pagamento
  function selecionarPagamento(metodo) {
      alert(`Método de pagamento selecionado: ${metodo}`);
      // Aqui você implementaria a lógica para processar o pagamento
  }

  window.onload = carregarCarrinho;

  function carregarC(params) {
    window.onload = carregarCarrinho;
  }