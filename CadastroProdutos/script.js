let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
console.log('Produtos cadastrados:', produtos);

function adicionarProduto(){
    let codigo = document.querySelector('#codigo').value;
    let nome = document.querySelector('#nome').value;
    let preco = document.querySelector('#preco').value;

    if (codigo && nome && preco) {
        let produto = {
            codigo, nome, preco: parseFloat(preco).toFixed(2)
        };
        produtos.push(produto);
        salvarProdutos();
        atualizarLista();
        limparCampos();
    } else {
        alert('Preencha todos os campos!')
    }
}
function atualizarLista(){
    let lista = document.querySelector('#lista-produtos');
    lista.innerHTML = '';
    produtos.forEach((produto, index) => {
        lista.innerHTML += `<tr><td>${produto.codigo}</td><td>${produto.nome}</td><td>${produto.preco}</td><td><button onclick='excluirProduto(${index})'>Excluir</button></td></tr>`;
    });    
}
function excluirProduto(index){
    produtos.splice(index, 1);
    salvarProdutos();
    atualizarLista();
}
function salvarProdutos(){
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function limparCampos(){
    document.querySelector('#codigo').value = '';
    document.querySelector('#nome').value = '';
    document.querySelector('#preco').value = '';
}

document.addEventListener('DOMContentLoaded', atualizarLista)