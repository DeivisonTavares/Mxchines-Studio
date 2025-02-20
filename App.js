const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Simulação de um banco de dados
let carrinho = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'Produto1OFC.html'));
});

app.get('/carrinho', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'carrinhoOFC.html'));
});

app.post('/api/adicionar-ao-carrinho', (req, res) => {
    const { nome, tamanho, quantidade, preco } = req.body;
    carrinho.push({ nome, tamanho, quantidade, preco });
    res.json({ message: 'Produto adicionado ao carrinho', carrinho });
});

app.get('/api/carrinho', (req, res) => {
    res.json(carrinho);
});

app.post('/api/calcular-frete', (req, res) => {
    const { cep } = req.body;
    // Simulação de cálculo de frete
    const frete = Math.floor(Math.random() * 20) + 10;
    const prazo = Math.floor(Math.random() * 5) + 3;
    res.json({ frete, prazo });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});