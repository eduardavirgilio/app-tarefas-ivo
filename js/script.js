// Função para add tarefa
// Carregar tarefas no localStorage ao iniciar
const carregarTarefas = () => {

    const taskList = document.querySelector('#taskList');
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach(tarefa => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (tarefa.concluida) {
            taskItem.classList.add('concluida');
        }
        taskItem.innerHTML =tarefa.html;
        taskList.appendChild(taskItem);

        // Add event listener aos botões da tarefa
        taskItem.querySelector('.complete-btn').addEventListener('click', function() {
            marcarComoConcluida(this);
        });
        taskItem.querySelector('.edit-btn').addEventListener('click', function() {
            editarTarefa(this);
        });
        taskItem.querySelector('.delete-btn').addEventListener('click', function() {
            excluirTarefa(this);
        });  
    });
};

// Obter os valores os valores digitados pelo usuário no formulário
const adicionarTarefa = () => {
    const taskName = document.querySelector('#taskName').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskDate = document.querySelector('#taskDate').value;
    const taskTime = document.querySelector('#taskTime').value;
 
    // Verificar se todos os campos dos formulários foram preenchidos
    if (taskName && taskDate && taskTime) {
      const taskList = document.querySelector('#taskList');
 
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
 
      const dataInput = taskDate.split('-');
      console.log(dataInput);

      // Formatando a data no padrão dd/mm/aa
      const dataFormatada = `${dataInput[2]}/${dataInput[1]}/${dataInput[0]}`;
      console.log(dataFormatada);

      // Código HTML que será injetado na DIV
      const taskHTML = `
        <h3>${taskName}</h3>
        <p>${taskDescription}</p>
        <p><strong>Vencimento:</strong> ${dataFormatada} ás ${taskTime}</p>
        <div class="task-actions">
            <button class="complete-btn">Concluir</button>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
        </div>
      `;

      // Injeção do código HTML com as tarefas do usuário
      taskItem.innerHTML = taskHTML;
      taskList.appendChild(taskItem);

      // Adicionar event Listener aos botões da tarefa
      taskItem.querySelector('.complete-btn').addEventListener('click', function() {
        marcarComoConcluida(this);
      });
      taskItem.querySelector('.edit-btn').addEventListener('click', function() {
        editarTarefa(this);
      });
      taskItem.querySelector('.delete-btn').addEventListener('click', function() {
        excluirTarefa(this);
      });

      // Criar o objeto, converter em tring e Salvar no localStorage
      const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
      tarefas.push({
        nome: taskName,
        descricao: taskDescription,
        data: taskDate,
        hora: taskTime,
        html: taskHTML
        });

      // Conversão do objeto para string
      localStorage.setItem('tarefas', JSON.stringify(tarefas));

      alert('Tarefa adicionada com sucesso!');
      document.querySelector('#taskForm').reset();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.')
    }
};

window.onload = function() {
    carregarTarefas();

      // Adicionando event listeners para os botões
    document.querySelector('#adicionarTarefaBtn').addEventListener('click', function (e) {
      e.preventDefault();
      adicionarTarefa();
    });

    // Event listeners para os botões de filtro
    document.querySelector('#filtrarTodasBtn').addEventListener('click', function() {
      filtrarTarefas('todas');
    });
   
    document.querySelector('#filtrarPendentesBtn').addEventListener('click', function() {
      filtrarTarefas('pendentes');
    });
   
    document.querySelector('#filtrarConcluidasBtn').addEventListener('click', function() {
      filtrarTarefas('concluidas');
    });
   
    // Event listeners para os botões de ordenação
    document.querySelector('#ordenarRecentesBtn').addEventListener('click', function() {
      ordenarTarefas('recentes');
    });
   
    document.querySelector('#ordenarAntigasBtn').addEventListener('click', function() {
      ordenarTarefas('antigas');
    });
};

// Concluir tarefa
const marcarComoConcluida = (button) => {

  const taskItem = button.closest('.task-item');

  if (taskItem.classList.contains('concluida')) {
    alert('Esta tarefa já foi concluída!');
    return;
  }

  taskItem.classList.add('concluida');

  // Desabilitar botões de edição e exclusão
  const editBtn = taskItem.querySelector('.edit-btn');
  const deleteBtn = taskItem.querySelector('.delete-btn');
  editBtn.disabled = true;
  deleteBtn.disabled = true;

  const taskName = taskItem.querySelector('h3').textContent
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  const tarefaIndex = tarefas.findIndex(t => t.nome === taskName);

  if (tarefaIndex !== -1) {

    // Atualizar o valor das chaves do objeto tarefa
    tarefas[tarefaIndex].concluida = true;
    tarefas[tarefaIndex].html = taskItem.innerHTML;

    // Salvar as alterações no localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  setTimeout(() =>{
    alert('Tarefa marcada como concluida!');
  })

}

// Editar tarefa
const editarTarefa = (button) => {

  const taskItem = button.closest('.task-item');

  taskItem.querySelector('h3').innerHTML = prompt('Novo título')
  taskItem.querySelector('p').innerHTML = prompt('Nova descrição')
}

// Excluir tarefa
// const excluirTarefa = (button) => {

//   if (confirm('Deseja realmente excluir esta tarefa?')) {
//     const taskItem = button.closest('.task-item');
//     const taskName = taskItem.querySelector('h3').textContent;

//     let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

//     tarefas = tarefas.filter(t => t.nome !== taskName);
//     localStorage.setItem('tarefas', JSON.stringify(tarefas));

//     taskItem.remove();

//     alert('Tarefa excluida.');
//   }

  
// }

const excluirTarefa = (button) => {
  if (confirm('Deseja realmente excluir esta tarefa?')) {
    const taskItem = button.closest('.task-item');
    const taskName = taskItem.querySelector('h3').textContent;
    const taskDescription = taskItem.querySelector('p').textContent;
    const taskDate = taskItem.querySelector('p').nextElementSibling.textContent.split(' às ')[0];
    const taskTime = taskItem.querySelector('p').nextElementSibling.textContent.split(' às ')[1];

    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    let tarefasExcluidas = JSON.parse(localStorage.getItem('tarefasExcluidas')) || [];

    // Remover tarefa das tarefas existentes
    tarefas = tarefas.filter(t => t.nome !== taskName);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    // Adicionar tarefa à lista de tarefas excluídas
    tarefasExcluidas.push({
      nome: taskName,
      descricao: taskDescription,
      data: taskDate,
      hora: taskTime,
      html: taskItem.innerHTML
    });

    // Atualizar o localStorage com as tarefas excluídas
    localStorage.setItem('tarefasExcluidas', JSON.stringify(tarefasExcluidas));

    // Remover a tarefa da interface
    taskItem.remove();

    alert('Tarefa excluída.');
  }
}



// Filtrar tarefas
const filtrarTarefas = (filtro) =>{
  const tarefas = document.querySelectorAll('.task-item');

  tarefas.forEach(tarefa =>{
      switch(filtro) {
          case 'todas':
              tarefa.style.display = 'block';
              break
          case 'pendentes':
              tarefa.style.display = tarefa.classList.contains('concluida') ? 'none' : 'block';
              break
          case 'concluidas':
              tarefa.style.display = tarefa.classList.contains('concluida') ? 'block' : 'none';
              break
      }
  })
}

// Ordenar tarefas - Alicia e chatgpt versão
// const ordenarTarefas = (ordem) => {
//   let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

//   // Ordenar por data
//   if (ordem === 'recentes') {
//     tarefas.sort((a, b) => new Date(b.data + 'T' + b.hora) - new Date(a.data + 'T' + a.hora));
//   } else if (ordem === 'antigas') {
//     tarefas.sort((a, b) => new Date(a.data + 'T' + a.hora) - new Date(b.data + 'T' + b.hora));
//   }

//   // Limpar lista atual na tela
//   const taskList = document.querySelector('#taskList');
//   taskList.innerHTML = "";

//   // Recriar os elementos HTML das tarefas ordenadas
//   tarefas.forEach(tarefa => {
//     const taskItem = document.createElement('div');
//     taskItem.classList.add('task-item');
//     if (tarefa.concluida) {
//       taskItem.classList.add('concluida');
//     }

//     taskItem.innerHTML = tarefa.html;
//     taskList.appendChild(taskItem);

//     // Reatribuir eventos
//     taskItem.querySelector('.complete-btn').addEventListener('click', function() {
//       marcarComoConcluida(this);
//     });
//     taskItem.querySelector('.edit-btn').addEventListener('click', function() {
//       editarTarefa(this);
//     });
//     taskItem.querySelector('.delete-btn').addEventListener('click', function() {
//       excluirTarefa(this);
//     });
//   });
// };

// Odenar tarefas - Ivo version's
const ordenarTarefas = (ordem) => {
  const taskList = document.querySelector('#taskList');

  const tarefas = Array.from(document.querySelectorAll('.task-item'));

  const dadosTarefas = JSON.parse(localStorage.getItem('tarefas'))  || [];

  tarefas.sort((a, b) => {
 
    const nomeA = a.querySelector('h3').textContent;
    const nomeB = b.querySelector('h3').textContent;

    const tarefaA = dadosTarefas.find(t => t.nome === nomeA);
    const tarefaB = dadosTarefas.find(t => t.nome === nomeB);

    const dataA = new Date(`${tarefaA.data}T${tarefaA.hora}`);
    const dataB = new Date(`${tarefaB.data}T${tarefaB.hora}`);

    return ordem === 'antigas' ? dataB - dataA : dataA - dataB;
  });

  taskList.innerHTML = '<h2>Suas Tarefas</h2>';
  tarefas.forEach(tarefa => taskList.appendChild(tarefa));
}

