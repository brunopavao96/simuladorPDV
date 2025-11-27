document.addEventListener('DOMContentLoaded', () => {
    atualizarTabelaVendas();
    atualizarTotalVendas();
});

function atualizarTabelaVendas() {
    let vendas = JSON.parse(localStorage.getItem('vendasDoDia')) || [];
    let tabelaVendas = document.querySelector('#tabela-vendas');
    tabelaVendas.innerHTML = ''; // Limpa a tabela antes de atualizá-la

    vendas.forEach((venda, index) => {
        tabelaVendas.innerHTML += `<tr>
            <td>Venda ${index + 1}</td>
            <td>R$ ${venda.total.toFixed(2)}</td>
            <td><button onclick="removerVenda(${index})">Remover</button></td>
        </tr>`;
    });
}

function atualizarTotalVendas() {
    let vendas = JSON.parse(localStorage.getItem('vendasDoDia')) || [];
    let totalVendas = vendas.reduce((soma, venda) => soma + venda.total, 0);
    document.querySelector('#total-vendas').innerText = totalVendas.toFixed(2);
}

function removerVenda(index) {
    let vendas = JSON.parse(localStorage.getItem('vendasDoDia')) || [];
    vendas.splice(index, 1); // Remove a venda do array
    localStorage.setItem('vendasDoDia', JSON.stringify(vendas)); // Atualiza o localStorage

    atualizarTabelaVendas();
    atualizarTotalVendas();
}
