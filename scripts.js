const token = localStorage.getItem('token');

if (!token) {
  // Se não tiver token, redireciona pra login
  window.location.href = "login.html";
}
// Atualiza data e hora
function atualizarHora() {
  const agora = new Date();
  const formatado = agora.toLocaleString("pt-BR");
  document.getElementById("datetime").textContent = formatado;
}
setInterval(atualizarHora, 1000);
atualizarHora();

// Troca de seções
function trocarSecao(secaoId) {
  document.querySelectorAll("main > section").forEach(sec => {
    sec.style.display = "none";
    sec.classList.remove("fade");
  });
  const ativa = document.getElementById(secaoId);
  ativa.style.display = "block";
  void ativa.offsetWidth;
  ativa.classList.add("fade");
}

// Toggle menu lateral
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('expanded');
  lucide.createIcons();
}

// Modal
function abrirModal(id) {
  document.getElementById(id).style.display = "block";
}
function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}

// Logout
function sair() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

// Gráfico
const ctx1 = document.getElementById("rankingChart").getContext("2d");
new Chart(ctx1, {
  type: "line",
  data: {
    labels: ["26/05", "27/05", "28/05", "29/05", "30/05", "31/05", "01/06"],
    datasets: [
      {
        label: "Faturamento Diário",
        data: [9500, 8000, 5000, 6200, 7300, 4000, 3000],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#007bff",
        fill: true,
      },
      {
        label: "Vendas Diária",
        data: [1, 0, 2, 1, 2, 0, 1],
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#28a745",
        fill: true,
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#555', font: { size: 12 } } },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#999',
        borderWidth: 1
      }
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#666' }, grid: { color: '#eee' } },
      x: { ticks: { color: '#666' }, grid: { display: false } }
    }
  }
});

// Funções com token JWT

// Proposta
document.querySelector('#modalProposta button').onclick = async () => {
  const inputs = document.querySelectorAll('#modalProposta input');
  const data = {
    servico: inputs[0].value,
    valor: parseFloat(inputs[1].value),
    cliente: inputs[2].value
  };

  const res = await fetch('https://safelink-backend-89hm.onrender.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("Proposta salva com sucesso!");
    fecharModal('modalProposta');
  } else {
    alert("Erro ao salvar proposta.");
  }
};

// Venda
document.querySelector('#modalVenda button').onclick = async () => {
  const inputs = document.querySelectorAll('#modalVenda input');
  const data = {
    produto: inputs[0].value,
    valor: parseFloat(inputs[1].value),
    cliente: inputs[2].value,
    data: inputs[3].value
  };

  const res = await fetch('https://safelink-backend-89hm.onrender.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("Venda salva com sucesso!");
    fecharModal('modalVenda');
  } else {
    alert("Erro ao salvar venda.");
  }
};

// Cliente
document.querySelector('#modalCliente button').onclick = async () => {
  const inputs = document.querySelectorAll('#modalCliente input');
  const data = {
    nome: inputs[0].value,
    telefone: inputs[1].value,
    endereco: inputs[2].value,
    documento: inputs[3].value
  };

  const res = await fetch('https://safelink-backend-89hm.onrender.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("Cliente salvo com sucesso!");
    fecharModal('modalCliente');
  } else {
    alert("Erro ao salvar cliente.");
  }
};
