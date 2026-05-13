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
        if (value.length > 7) value = value.substring(0, 7);
        e.target.value = value;
    });
}

const form = document.getElementById('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('processa_automoveis.php', {
            method: 'POST',
            body: formData
        })
        .then(async response => {
            const text = await response.text();
            try {
                return JSON.parse(text);
            } catch (err) {
                throw new Error('Resposta inválida');
            }
        })
        .then(data => {
            if (data.status === 'success') {
                mostrarModal();
            } else {
                alert('Erro: ' + data.message);
            }
        })
        .catch(error => console.error(error));
    });
}

function mostrarModal() {
    const modal = document.getElementById('modalConfirmacao');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            window.location.href = 'agendamento.html';
        }, 5000);
    }
}

function fecharModal() {
    window.location.href = 'agendamento.html';
}