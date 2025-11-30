document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form'); 


    form.addEventListener('submit', function(e) {
        e.preventDefault();
        mostrarModal();
    });

    const mobileMenu = document.getElementById('mobile-menu');
    const mainNav = document.getElementById('main-nav');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    const celularInput = document.getElementById('celular');
    if (celularInput) {
        celularInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
                e.target.value = value;
            }
        });
    }
});

function mostrarModal() {
    const modal = document.getElementById('modalConfirmacao');
    modal.style.display = 'flex';
    setTimeout(() => {
        window.location.href = 'agendamento.html';
    }, 5000);
}

function fecharModal() {
    const modal = document.getElementById('modalConfirmacao');
    modal.style.display = 'none';
    window.location.href = 'agendamento.html';
}

