function verificarLogin() {
    let usuario = document.querySelector('#usuario').value;
    let senha = document.querySelector('#senha').value;
    let mensagem = document.querySelector('#mensagem');

    // Usuário e senha fictícios
    const usuarioCorreto = "admin";
    const senhaCorreta = "1234";

    if (usuario === usuarioCorreto && senha === senhaCorreta) {
        // Armazena o login na sessão
        sessionStorage.setItem('usuarioLogado', usuario);
        
        // Redireciona para a página inicial
        window.location.href = "PaginaInicial/index.html";
    } else {
        mensagem.textContent = "Usuário ou senha incorretos!";
    }
}
