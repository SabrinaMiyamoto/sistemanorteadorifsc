let agendamento = {
    servico: null,
    data: null,
    horario: null,
    preco: 0
};


const elementos = {
    calendario: document.getElementById('calendario'),
    mesAno: document.getElementById('mes-ano'),
    prevMonth: document.getElementById('prev-month'),
    nextMonth: document.getElementById('next-month'),
    horarios: document.getElementById('horarios'),
    btnConfirmar: document.getElementById('btn-confirmar'),
    modal: document.getElementById('modal-confirmacao'),
    btnFecharModal: document.getElementById('btn-fechar-modal')
};


const resumo = {
    servico: document.getElementById('resumo-servico'),
    data: document.getElementById('resumo-data'),
    horario: document.getElementById('resumo-horario'),
    total: document.getElementById('resumo-total')
};


const modal = {
    servico: document.getElementById('modal-servico'),
    data: document.getElementById('modal-data'),
    horario: document.getElementById('modal-horario'),
    total: document.getElementById('modal-total')
};


let dataAtual = new Date();
let dataSelecionada = null;


const horariosDisponiveis = [
    '08:00', '09:00', '10:00', '11:00', 
    '14:00', '15:00', '16:00', '17:00'
];


document.addEventListener('DOMContentLoaded', function() {
    inicializarCalendario();
    inicializarServicos();
    inicializarEventos();
});

function inicializarCalendario() {
    atualizarCalendario();
    atualizarHorarios();
}

function inicializarServicos() {
    const servicos = document.querySelectorAll('.servico-item');
    
    servicos.forEach(servico => {
        servico.addEventListener('click', function() {

            servicos.forEach(s => s.classList.remove('selected'));
            

            this.classList.add('selected');
            

            agendamento.servico = this.querySelector('.servico-nome').textContent;
            agendamento.preco = parseFloat(this.dataset.preco);
            
            atualizarResumo();
            verificarAgendamentoCompleto();
        });
    });
}

function inicializarEventos() {
    elementos.prevMonth.addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() - 1);
        atualizarCalendario();
    });
    
    elementos.nextMonth.addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() + 1);
        atualizarCalendario();
    });
    
    elementos.btnConfirmar.addEventListener('click', confirmarAgendamento);
    elementos.btnFecharModal.addEventListener('click', () => {
        elementos.modal.style.display = 'none';
    });
}

function atualizarCalendario() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    
    elementos.mesAno.textContent = dataAtual.toLocaleDateString('pt-BR', { 
        month: 'long', 
        year: 'numeric' 
    }).replace(/^\w/, c => c.toUpperCase());
    
  
    while (elementos.calendario.children.length > 7) {
        elementos.calendario.removeChild(elementos.calendario.lastChild);
    }
    

    const primeiroDia = new Date(ano, mes, 1);

    const ultimoDia = new Date(ano, mes + 1, 0);

    const primeiroDiaSemana = primeiroDia.getDay();
    
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const diaVazio = document.createElement('div');
        diaVazio.className = 'dia disabled';
        elementos.calendario.appendChild(diaVazio);
    }
    
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
        const diaElemento = document.createElement('div');
        diaElemento.className = 'dia';
        diaElemento.textContent = dia;
        
        const dataDia = new Date(ano, mes, dia);
        
        const hoje = new Date();
        if (dataDia.toDateString() === hoje.toDateString()) {
            diaElemento.classList.add('hoje');
        }

        if (dataDia < new Date(hoje.setHours(0, 0, 0, 0))) {
            diaElemento.classList.add('disabled');
        } else {
            diaElemento.addEventListener('click', () => selecionarData(dataDia, diaElemento));
        }
        
        elementos.calendario.appendChild(diaElemento);
    }
}

function selecionarData(data, elemento) {
    document.querySelectorAll('.dia.selected').forEach(dia => {
        dia.classList.remove('selected');
    });
    

    elemento.classList.add('selected');

    dataSelecionada = data;
    agendamento.data = data.toLocaleDateString('pt-BR');
    
    atualizarResumo();
    verificarAgendamentoCompleto();
    atualizarHorarios();
}

function atualizarHorarios() {
    elementos.horarios.innerHTML = '';
    
    if (!dataSelecionada) return;
    
    horariosDisponiveis.forEach(horario => {
        const horarioBtn = document.createElement('button');
        horarioBtn.className = 'horario-btn';
        horarioBtn.textContent = horario;
 
        const ocupado = Math.random() < 0.3;
        
        if (ocupado) {
            horarioBtn.classList.add('disabled');
            horarioBtn.title = 'Horário indisponível';
        } else {
            horarioBtn.addEventListener('click', () => selecionarHorario(horario, horarioBtn));
        }
        
        elementos.horarios.appendChild(horarioBtn);
    });
}

function selecionarHorario(horario, elemento) {
    document.querySelectorAll('.horario-btn.selected').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    elemento.classList.add('selected');
    
    agendamento.horario = horario;
    
    atualizarResumo();
    verificarAgendamentoCompleto();
}

function atualizarResumo() {
    resumo.servico.textContent = agendamento.servico || 'Nenhum serviço selecionado';
    resumo.data.textContent = agendamento.data || 'Não selecionada';
    resumo.horario.textContent = agendamento.horario || 'Não selecionado';
    resumo.total.textContent = `R$ ${agendamento.preco.toFixed(2)}`;
}

function verificarAgendamentoCompleto() {
    const completo = agendamento.servico && agendamento.data && agendamento.horario;
    elementos.btnConfirmar.disabled = !completo;
}

function confirmarAgendamento() {

    modal.servico.textContent = agendamento.servico;
    modal.data.textContent = agendamento.data;
    modal.horario.textContent = agendamento.horario;
    modal.total.textContent = `R$ ${agendamento.preco.toFixed(2)}`;
    

    elementos.modal.style.display = 'flex';
    
    console.log('Agendamento confirmado:', agendamento);
    

    setTimeout(() => {

    }, 5000);
}

function limparAgendamento() {
    agendamento = { servico: null, data: null, horario: null, preco: 0 };
    dataSelecionada = null;
    
    document.querySelectorAll('.servico-item.selected, .dia.selected, .horario-btn.selected')
        .forEach(el => el.classList.remove('selected'));
    
    atualizarResumo();
    verificarAgendamentoCompleto();
    atualizarHorarios();
}