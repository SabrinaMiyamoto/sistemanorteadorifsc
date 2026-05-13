document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formAgendamento');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);

            fetch('processa_agendamento.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    mostrarModal();
                } else {
                    alert("Erro ao salvar: " + data.message);
                }
            })
            .catch(error => {
                console.error("Erro técnico:", error);
                alert("O servidor não respondeu. Verifique se o Apache está ligado no XAMPP.");
            });
        });
    }
});

function mostrarModal() {
    const modal = document.getElementById('modalConfirmacao');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 5000);
    }
}

function fecharModal() {
    window.location.href = 'index.html';
}