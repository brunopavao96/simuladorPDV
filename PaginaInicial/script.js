let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let listaProdutos = [];
let total = 0;
let vendas = JSON.parse(localStorage.getItem('vendasDoDia')) || []; 
function atualizarAutoCompletar() {
    let dataList = document.querySelector('#lista-codigos');
    dataList.innerHTML = '';

    produtos.forEach(produto => {
        let option = document.createElement('option');
        option.value = produto.codigo; 
        option.textContent = `${produto.codigo} - ${produto.nome}`; 
        dataList.appendChild(option);
    });
}
document.querySelector("#codigo").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        adicionarProdutoLista(); 
    }
});


atualizarAutoCompletar();

function adicionarProdutoLista() {
    let codigo = document.querySelector('#codigo').value;

    if (codigo) {
        let produtoEncontrado = produtos.find(produto => produto.codigo === codigo);

        if (produtoEncontrado) {
            let produtoNaLista = listaProdutos.find(produto => produto.codigo === codigo);

            if (produtoNaLista) {
                produtoNaLista.quantidade++;
            } else {
                listaProdutos.push({ ...produtoEncontrado, quantidade: 1 });
            }

            atualizarLista();
            calcularPrecoTotal();
        } else {
            alert('Produto não encontrado!');
        }
    } else {
        alert('Insira um código válido!');
    }
}

function atualizarLista() {
    let lista = document.querySelector('#lista-produtos');
    lista.innerHTML = '';
    listaProdutos.forEach((produto, index) => {
        lista.innerHTML += `<tr>
            <td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>${produto.preco}</td>
            <td>${produto.quantidade}</td>
            <td><button onclick="excluirProduto(${index})">Excluir</button></td>
        </tr>`;
    });
}

function excluirProduto(index) {
    if (listaProdutos[index].quantidade > 1) {
        listaProdutos[index].quantidade--;
    } else {
        listaProdutos.splice(index, 1);
    }

    atualizarLista();
    calcularPrecoTotal();
}

function calcularPrecoTotal() {
    total = listaProdutos.reduce((soma, produto) => soma + parseFloat(produto.preco) * produto.quantidade, 0);
    document.querySelector('#preco-total').innerText = total.toFixed(2);
}

function calcularTroco() {
    
    let dinheiroRecebido = parseFloat(document.querySelector('#dinheiro').value);

    
    calcularPrecoTotal();

    if (isNaN(dinheiroRecebido) || dinheiroRecebido < total) {
        
        alert('Dinheiro insuficiente ou valor inválido!');
        document.querySelector('#troco').innerText = '0.00';
        return;
    }

    
    let troco = dinheiroRecebido - total;

    
    document.querySelector('#troco').innerText = troco.toFixed(2);
}


function concluirVenda() {
    if (listaProdutos.length === 0) {
        alert('Nenhum produto na lista para concluir a venda!');
        return;
    }

    let dinheiroRecebido = parseFloat(document.querySelector('#dinheiro').value);
    let troco = dinheiroRecebido - total;

    if (isNaN(dinheiroRecebido) || dinheiroRecebido < total) {
        alert('Dinheiro insuficiente! Não é possível concluir a venda.');
        return;
    }

    let novaVenda = {
        total: total,
        recebido: dinheiroRecebido,
        troco: troco
    };

    vendas.push(novaVenda);
    localStorage.setItem('vendasDoDia', JSON.stringify(vendas)); // Salvar no localStorage

    listaProdutos = [];
    total = 0;
    document.querySelector('#dinheiro').value = '';
    document.querySelector('#troco').innerText = '0.00';
    atualizarLista();
    calcularPrecoTotal();

    alert('Venda concluída e registrada com sucesso!');
}
if (!sessionStorage.getItem('usuarioLogado')) {
    window.location.href = "../login.html"; 
}


function logout() {
    sessionStorage.removeItem('usuarioLogado'); 
    window.location.href = "../login.html"; 
}
