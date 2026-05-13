const form = document.getElementById('form');

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
                console.error('O PHP retornou texto puro em vez de JSON:', text);
                alert('Erro no Servidor: Verifique o console (F12)');
                throw new Error('Falha no JSON');
            }
        })
        .then(data => {
            if (data.status === 'success') {
                mostrarModal();
            } else {
                alert('Erro no Banco: ' + data.message);
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
    modal.style.display = 'none';
    window.location.href = 'agendamento.html';
}