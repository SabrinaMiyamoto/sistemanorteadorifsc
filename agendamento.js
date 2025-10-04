document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.agendamento-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        mostrarModal();
    });
});

function mostrarModal() {
    const modal = document.getElementById('modalConfirmacao');
    modal.style.display = 'flex';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 5000);
}

function fecharModal() {
    const modal = document.getElementById('modalConfirmacao');
    modal.style.display = 'none';
    window.location.href = 'index.html';
}