// Função para add tarefa
// Carregar tarefas no localStorage ao iniciar
const carregarTarefas = () => {
    const taskList = document.querySelector('#taskList');
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    taskList.innerHTML = '<h2>Suas Tarefas</h2>'; // Limpa a lista antes de mostrar as tarefas

    tarefas.forEach(tarefa => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (tarefa.concluida) {
            taskItem.classList.add('concluida');
        }
        taskItem.innerHTML = tarefa.html;
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

// Obter os valores digitados pelo usuário no formulário
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
        const dataFormatada = `${dataInput[2]}/${dataInput[1]}/${dataInput[0]}`;

        // Código HTML que será injetado na DIV
        const taskHTML = `
            <h3>${taskName}</h3>
            <p class="task-description">${taskDescription}</p>
            <p><strong>Vencimento:</strong> <span class="task-data">${dataFormatada}</span> às <span class="task-hora">${taskTime}</span></p>
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

        // Criar o objeto, converter em string e salvar no localStorage
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

        // Exibe a mensagem para o usuário
        Swal.fire('Tarefa adicionada!', 'A tarefa foi adicionada com sucesso.', 'success');
        document.querySelector('#taskForm').reset();
    } else {
        Swal.fire('Erro ao adicionar tarefa!', 'Preencha todos os campos corretamente.', 'error');
    }
};

// Função para excluir tarefa
// const excluirTarefa = (button) => {
    
//     if (confirm('Deseja realmente excluir esta tarefa?')) {
      
//         const taskItem = button.closest('.task-item');
//         const taskName = taskItem.querySelector('h3').textContent;

//         // Pegando os dados diretamente da interface (HTML)
//         // Usa encadeamento opcional (?.) para acessar textContent só se o elemento existir, evitando dar erro caso seja null ou undefined
//         const descricao = taskItem.querySelector('.task-description')?.textContent || '';
//         const dataTexto = taskItem.querySelector('.task-data')?.textContent || '';
//         const horaTexto = taskItem.querySelector('.task-hora')?.textContent || '';

//         // Recupera e atualiza o localStorage de tarefas ativas
//         let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
//         tarefas = tarefas.filter(t => t.nome !== taskName);
//         localStorage.setItem('tarefas', JSON.stringify(tarefas));

//         // Recupera e atualiza o localStorage de tarefas excluídas
//         let tarefasExcluidas = JSON.parse(localStorage.getItem('tarefasExcluidas')) || [];
//         tarefasExcluidas.push({
//             nome: taskName,
//             descricao: descricao,
//             data: dataTexto.replace("Vencimento:", "").trim(),
//             hora: horaTexto.trim()
//         });

//         localStorage.setItem('tarefasExcluidas', JSON.stringify(tarefasExcluidas));

//         // Remove o elemento da interface
//         taskItem.remove();

            
//         Swal.fire('Tarefa excluida.', 'A tarefa foi movida para a lixeira. Você pode restaurá-la depois.', 'success');
       
//     }
// };

const excluirTarefa = (button) => {

    Swal.fire({
        title: "Você tem certeza que quer excluir essa tarefa?",
        text: "A tarefa ficará salva para ser restaurada mais tarde.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Excluir mesmo assim"
      }).then((result) => {
        if (result.isConfirmed) { //caso o usuario confirme a exclusao, executa o cod de excluir, se nao, cancela a ação
          Swal.fire({
            title: "Tarefa excluida com sucesso!",
            text: "Esta tarefa poderá ser restaurada depois.",
            icon: "success"
          });

        const taskItem = button.closest('.task-item');
        const taskName = taskItem.querySelector('h3').textContent;

        // Pegando os dados diretamente da interface (HTML)
        // Usa encadeamento opcional (?.) para acessar textContent só se o elemento existir, evitando dar erro caso seja null ou undefined
        const descricao = taskItem.querySelector('.task-description')?.textContent || '';
        const dataTexto = taskItem.querySelector('.task-data')?.textContent || '';
        const horaTexto = taskItem.querySelector('.task-hora')?.textContent || '';

        // Recupera e atualiza o localStorage de tarefas ativas
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas = tarefas.filter(t => t.nome !== taskName);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Recupera e atualiza o localStorage de tarefas excluídas
        let tarefasExcluidas = JSON.parse(localStorage.getItem('tarefasExcluidas')) || [];

        tarefasExcluidas.push({
            nome: taskName,
            descricao: descricao,
            data: dataTexto,
            hora: horaTexto
        });

        localStorage.setItem('tarefasExcluidas', JSON.stringify(tarefasExcluidas));

        // Remove o elemento da interface
        taskItem.remove();

            
        Swal.fire('Tarefa excluida.', 'A tarefa foi movida para a lixeira. Você pode restaurá-la depois.', 'success');
        }
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

    const taskName = taskItem.querySelector('h3').textContent;
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const tarefaIndex = tarefas.findIndex(t => t.nome === taskName);

    if (tarefaIndex !== -1) {

        // Atualizar o valor das chaves do objeto tarefa
        tarefas[tarefaIndex].concluida = true;
        tarefas[tarefaIndex].html = taskItem.innerHTML;

        // Salvar as alterações no localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    setTimeout(() => {
        Swal.fire('Tarefa concluida!', 'A tarefa foi marcada como concluida.', 'success');
    });

};

// Editar tarefa
// const editarTarefa = (button) => {

//     const taskItem = button.closest('.task-item');

//     taskItem.querySelector('h3').innerHTML = prompt('Novo título');
//     taskItem.querySelector('.task-description').innerHTML = prompt('Nova descrição');
// };

// editar tarefa com sweetalert
const editarTarefa = async (button) => {
    const taskItem = button.closest('.task-item');
    const currentTitle = taskItem.querySelector('h3').textContent;
    const currentDescription = taskItem.querySelector('.task-description').textContent;

    const { value: formValues } = await Swal.fire({
        title: "Edite a tarefa",
        html: `
          <label for="task-form" style="display:block; text-align:left; font-weight:bold; margin-bottom:4px;">Título</label>
          <input id="swal-input1" class="swal2-input" value="${currentTitle}">
          <label for="swal-input2" style="display:block; text-align:left; font-weight:bold; margin:12px 0 4px 0;">Descrição</label>
          <input id="swal-input2" class="swal2-input" value="${currentDescription}">
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ];
        }
    });

    // if (formValues) {
    //     const [newTitle, newDescription] = formValues;
    //     if (taskItem) {
    //         if (newTitle) taskItem.querySelector('h3').textContent = newTitle;
    //         if (newDescription) taskItem.querySelector('.task-description').textContent = newDescription;
    //         Swal.fire('Sucesso!', 'Tarefa atualizada com sucesso!', 'success');
    //     } else {
    //         Swal.fire('Erro', 'Elemento da tarefa não encontrado.', 'error');
    //     }
    // }
};

// Filtrar tarefas
function filtrarTarefas(filtro) {
    // Ajuste: Para garantir que o filtro sempre age sobre as tarefas ativas,
    // ao clicar em 'Todas' o carregarTarefas() será chamado no listener.
    // Aqui filtremos o que está visível.
    const tarefas = document.querySelectorAll('.task-item');

    tarefas.forEach(tarefa => {
        switch (filtro) {
            case 'todas':
                tarefa.style.display = 'block';
                break;
            case 'pendentes':
                tarefa.style.display = tarefa.classList.contains('concluida') ? 'none' : 'block';
                break;
            case 'concluidas':
                tarefa.style.display = tarefa.classList.contains('concluida') ? 'block' : 'none';
                break;
        }
    });
}

// Ordenar tarefas - versão Ivo
const ordenarTarefas = (ordem) => {
    const taskList = document.querySelector('#taskList');
    const tarefas = Array.from(document.querySelectorAll('.task-item'));

    console.log('Tarefas antes da ordenação:', tarefas);

    const dadosTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.sort((a, b) => {
        const nomeA = a.querySelector('h3').textContent;
        const nomeB = b.querySelector('h3').textContent;

        const tarefaA = dadosTarefas.find(t => t.nome === nomeA);
        const tarefaB = dadosTarefas.find(t => t.nome === nomeB);

        const dataA = new Date(`${tarefaA.data}T${tarefaA.hora}`);
        const dataB = new Date(`${tarefaB.data}T${tarefaB.hora}`);

        console.log('Data A:', dataA, 'Data B:', dataB);

        return ordem === 'antigas' ? dataB - dataA : dataA - dataB;
    });

    taskList.innerHTML = '<h2>Suas Tarefas</h2>';
    tarefas.forEach(tarefa => taskList.appendChild(tarefa));
};


// Configuração inicial e listeners
window.onload = function() {
    carregarTarefas();

    // Adicionando event listeners para os botões
    document.querySelector('#adicionarTarefaBtn').addEventListener('click', function(e) {
        e.preventDefault();
        adicionarTarefa();
    });

    document.querySelector('#restaurarTarefasBtn').addEventListener('click', function() {
        mostrarTarefasExcluidas(); // chama a função que mostra a lixeira
    });

    // Ajuste importante para 'Todas': recarregar tarefas ativas antes de filtrar
    document.querySelector('#filtrarTodasBtn').addEventListener('click', function() {
        carregarTarefas(); // Recarrega as tarefas ativas para garantir que só elas estão visíveis
        filtrarTarefas('todas'); // Depois aplica filtro pra garantir visibilidade
    });

    document.querySelector('#filtrarPendentesBtn').addEventListener('click', function() {
        filtrarTarefas('pendentes');
    });

    document.querySelector('#filtrarConcluidasBtn').addEventListener('click', function() {
        filtrarTarefas('concluidas');
    });

    document.querySelector('#ordenarRecentesBtn').addEventListener('click', function() {
        ordenarTarefas('recentes');
    });

    document.querySelector('#ordenarAntigasBtn').addEventListener('click', function() {
        ordenarTarefas('antigas');
    });
};

// Função para mostrar tarefas excluídas
const mostrarTarefasExcluidas = () => {

  // Pega a lista de tarefas excluídas do localStorage ou um array vazio se não houver
  const tarefasExcluidas = JSON.parse(localStorage.getItem('tarefasExcluidas')) || [];
  const taskList = document.querySelector('#taskList');

  // Limpa a lista antes para mostrar apenas as excluídas
  taskList.innerHTML = '<h2>Tarefas Excluídas</h2>'; 

  // Caso nenhuma tarefa tenha sido excluída, aparece essa mensagem para o usuário
  if (tarefasExcluidas.length === 0) {
      Swal.fire('Lixeira vazia', 'Nenhuma tarefa excluída até o momento.'); // Título e mensagem do alerta
      return;
  }

  // Uso do forEach para percorrer a lista de tarefas excluídas e colocar no HTML, passando como parâmetro a tarefa e a posição dela na lista (index)
  tarefasExcluidas.forEach((tarefa, index) => {
      const taskItem = document.createElement('div'); // Cria uma div para representar a tarefa
      taskItem.classList.add('task-item'); // Adiciona a classe 'task-item' à div para estilização

      // Cria o HTML da tarefa
      const taskHTML = `
          <h3>${tarefa.nome}</h3>
          <p class="task-description">${tarefa.descricao}</p>
          <p class="task-data"><strong>Vencimento:</strong> ${tarefa.data} às <span class="task-hora">${tarefa.hora}</span></p>
          <div class="task-actions">
              <button class="restore-btn" onclick="restaurarTarefa(${index})">Restaurar</button>
              <button class="delete-btn" onclick="excluirTarefa(this)">Excluir</button>
          </div>
      `;

      // Adiciona o HTML da tarefa à div e insere a div na lista
      taskItem.innerHTML = taskHTML;
      taskList.appendChild(taskItem);
  });
};


// Função para restaurar uma tarefa da lixeira
const restaurarTarefa = (index) => {

    // Recupera as tarefas ativas e as tarefas excluídas do localStorage
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    let tarefasExcluidas = JSON.parse(localStorage.getItem('tarefasExcluidas')) || [];

    // O método splice() é usado para adicionar ou remover elementos de um array.
    // Neste caso, splice() será usado para remover uma tarefa da lista de tarefas excluídas.
    // Sintaxe: array.splice(início, quantidade, item1, item2, ...)
    // - 'início' é o índice a partir do qual vamos começar a remover elementos.
    // - 'quantidade' é o número de elementos que queremos remover a partir desse índice.
    // Se quisermos adicionar elementos, podemos passar os novos elementos após a quantidade.
    // 
    // Aqui, usamos splice(index, 1) para remover 1 tarefa do array 'tarefasExcluidas' 
    // a partir do índice 'index'. O método retorna um array com os elementos removidos, 
    // e usamos [0] para pegar a primeira (e única) tarefa que foi removida.
    const tarefa = tarefasExcluidas.splice(index, 1)[0];

    // Gera novamente o HTML da tarefa restaurada
    const taskHTML = `
        <h3>${tarefa.nome}</h3>
        <p class="task-description">${tarefa.descricao}</p>
        <p class="task-data"><strong>Vencimento:</strong> ${tarefa.data} às <span class="task-hora">${tarefa.hora}</span></p>
        <div class="task-actions">
            <button class="complete-btn">Concluir</button>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
        </div>
    `;

    // O método push() é usado para adicionar um ou mais elementos ao final de um array.
    // Neste caso, estamos usando push() para adicionar a tarefa restaurada ao array 'tarefas'.
    // Sintaxe: array.push(elemento1, elemento2, ...)
    tarefas.push({
      nome: tarefa.nome,
      descricao: tarefa.descricao,
      data: tarefa.data,
      hora: tarefa.hora,
      html: taskHTML
    });

    // Atualiza o localStorage com as novas listas de tarefas
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    localStorage.setItem('tarefasExcluidas', JSON.stringify(tarefasExcluidas));

    carregarTarefas(); // Atualiza a lista de tarefas ativas
    mostrarTarefasExcluidas(); // Atualiza a lista de tarefas excluídas

    // Exibe a mensagem para o usuário
    Swal.fire('Restaurada!', 'A tarefa foi restaurada com sucesso.', 'success');
};

// função de mostrar tarefas excluidas do ivo
// const mostrarTarefasExcluidas = () => {
//     const tarefasExcluidas = JSON.parse(localStorage.getItem('tarefasExcluidas')) || [];

//     const tarefasValidas = tarefasExcluidas.filter(tarefa => tarefa && tarefa.nome);

//     if (tarefasValidas.length === 0){
//         alert('Não há tarefas na lixeira.');
//         return;
//     }

//     let mensagem = 'Tarefas na lixeira:\n\n';

//     tarefasValidas.forEach((tarefa, index) => {
//         mensagem += `${index + 1}. ${tarefa.nome}\n`;
//     });

//     const resposta = prompt(mensagem + '\nDigite o número da tarefa que deseja restaurar ou (cancele para sair):');

//     if (resposta && isNaN(resposta)){
//         const index = parseInt(resposta) - 1;
//         if (index >= 0 && index < tarefasValidas.length){
//             restaurarTarefa(tarefasValidas[index]);
//         }else{
//             alert('número inválido!');
//         }
//     }
// };

// const restaurarTarefa = (tarefaExcluida) => {
//     const tarefas = JSON.parse (localStorage.getItem('tarefas')) || [];
//     tarefas.push(tarefaExcluida);
//     localStorage.setItem('tarefas', JSON.stringify(tarefas));

//     let tarefasExcluidas = JSON.parse(localStorage.getItem('tarefasExcluidas')) || [];
//     tarefasExcluidas = tarefasExcluidas.filter(t => t.nome !== tarefaExcluida.nome);
//     localStorage.setItem('tarefasExcluidas', JSON.stringify(tarefasExcluidas));

//     location.reload();
// }