const form = document.getElementById('form');
const inputNome = document.getElementById('nome');
const containerSaudacao = document.getElementById('saudacaoCliente');
const modalTitulo = document.getElementById('modalTitulo');
const modalMensagem = document.getElementById('modalMensagem');
const btnModal = document.getElementById('btnModal');

let acaoModal = 'saudacao'; 
let temporizadorModal = null; 

if (inputNome && containerSaudacao) {
    inputNome.addEventListener('blur', function() {
        const nomeCliente = inputNome.value.trim();

        if (nomeCliente !== '') {
            acaoModal = 'saudacao';
            containerSaudacao.textContent = `Olá, ${nomeCliente}!`;
            modalTitulo.textContent = 'Seja Bem-vindo(a)!';
            modalMensagem.innerHTML = 'É um prazer ter você no Lavação Web.<br>Por favor, continue preenchendo seus dados abaixo.';
            if (btnModal) btnModal.textContent = 'Fechar';
            
            mostrarModal();

            if (temporizador) {
                clearTimeout(temporizador);
            }
            
            temporizador = setTimeout(function() {
                fecharModal();
            }, 4000);
        }
    });
}

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('processa_cadastro.php', {
            method: 'POST',
            body: formData
        })
        .then(async response => {
            const text = await response.text(); 
            try {
                return JSON.parse(text);
            } catch (err) {
                throw new Error('Falha ao salvar os dados: ');
            }
        })
        .then(data => {
            if (data.status === 'success') {
                if (temporizadorModal) {
                    clearTimeout(temporizadorModal);
                }
                acaoModal = 'sucesso';
                if (containerSaudacao) containerSaudacao.textContent = '';
                modalTitulo.textContent = 'Cadastro realizado';
                modalMensagem.innerHTML = 'Cadastro realizado com sucesso!<br>Redirecionando para a página de agendamento';
                if (btnModal) btnModal.textContent = 'Continuar';
                mostrarModal();
            }
        })
        .catch(error => console.error('Erro na requisição:', error));
    });
}

function mostrarModal() {
    const modal = document.getElementById('modalConfirmacao');
    if(modal) modal.style.display = 'flex';
}

function fecharModal() {
    const modal = document.getElementById('modalConfirmacao');
    if (modal) modal.style.display = 'none';
    
    if (temporizadorModal) {
        clearTimeout(temporizadorModal);
        temporizadorModal = null;
    }

    if (acaoModal === 'sucesso') {
        window.location.href = 'agendamento.html';
    }
}