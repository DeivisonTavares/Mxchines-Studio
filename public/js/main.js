document.addEventListener("DOMContentLoaded", () => {
  configurarRolagemSuave();
  iniciarContagemRegressiva("2025-02-27T00:00:00");
  configurarEventosQuantidade();
  carregarCarrinho();
});

function configurarRolagemSuave() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
      });
  });
}

function iniciarContagemRegressiva(dataAlvo) {
  const proximoDrop = new Date(dataAlvo).getTime();
  const countdownElement = document.getElementById("countdown");
  
  const atualizarContagem = setInterval(() => {
      const agora = new Date().getTime();
      const diferenca = proximoDrop - agora;

      if (diferenca < 0) {
          clearInterval(atualizarContagem);
          countdownElement.innerHTML = "O drop já começou!";
          return;
      }
      
      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }, 1000);
}

let quantidade = 1;
let tamanhoSelecionado = "";

function configurarEventosQuantidade() {
  const quantidadeElement = document.getElementById("quantidade");
  const botaoDiminuir = document.getElementById("diminuir");
  const botaoAumentar = document.getElementById("aumentar");

  if (quantidadeElement && botaoDiminuir && botaoAumentar) {
      botaoDiminuir.addEventListener("click", () => alterarQuantidade(-1));
      botaoAumentar.addEventListener("click", () => alterarQuantidade(1));
  }
}

function alterarQuantidade(delta) {
  const quantidadeElement = document.getElementById("quantidade");
  if (!quantidadeElement) return;
  
  quantidade = Math.max(1, quantidade + delta); // Impede valores negativos
  quantidadeElement.textContent = quantidade;
}

function calcularFrete() {
  const cep = document.getElementById("cep").value;
  const frete = Math.floor(Math.random() * 20) + 10;
  document.getElementById("freteInfo").textContent = `Frete para ${cep}: R$ ${frete},00`;
}

function selecionarTamanhoDaCamisa(tamanho) {
  tamanhoSelecionado = tamanho;
  document.querySelectorAll(".tamanho").forEach(t => t.classList.remove("selecionado"));
  document.getElementById(`tamanho_${tamanho.toLowerCase()}`).classList.add("selecionado");
  alert(`Tamanho ${tamanho} selecionado!`);
}

function adicionarAoCarrinho() {
  if (!tamanhoSelecionado) {
      alert("Por favor, selecione um tamanho antes de adicionar ao carrinho!");
      return;
  }

  const produto = { nome: "Camisa Modelo 1", preco: 99.90, tamanho: tamanhoSelecionado, quantidade };
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert(`Camisa ${tamanhoSelecionado} adicionada ao carrinho!`);
}

function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const carrinhoLista = document.getElementById("carrinho-lista");
  let total = 0;
  if (!carrinhoLista) return;
  
  carrinhoLista.innerHTML = "";
  
  carrinho.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("carrinho-item");
      itemElement.innerHTML = `
          <img src="../src/MXCHINES FOTO 6.png" alt="${item.nome}">
          <div>
              <h3>${item.nome}</h3>
              <p>Tamanho: ${item.tamanho}</p>
              <p>Quantidade: ${item.quantidade}</p>
              <p>Preço: R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
          </div>
          <button class="btn-qualquer" onclick="removerItem(${index})">Remover</button>
      `;
      carrinhoLista.appendChild(itemElement);
      total += item.preco * item.quantidade;
  });

  document.getElementById("total").textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  carregarCarrinho();
}

function selecionarPagamento(metodo) {
  alert(`Método de pagamento selecionado: ${metodo}`);
}
