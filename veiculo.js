const mobileMenu = document.getElementById('mobile-menu');
const mainNav = document.getElementById('main-nav');

if (mobileMenu && mainNav) {
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
}

const placaInput = document.getElementById('placa');

if (placaInput) {
    placaInput.addEventListener('input', function(e) {
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        
        if (value.length > 7) {
            value = value.substring(0, 7);
        }
        
        e.target.value = value;
    });
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
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

const form = document.getElementById('form');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        mostrarModal();
    });
}
