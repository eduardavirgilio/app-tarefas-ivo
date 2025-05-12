

const carregarTarefas = () => {
    //verifica se tem algo no local storage
    const taskList = document.querySelector('#taskList');
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    
    // se tiver vai pro if
    tarefas.forEach(tarefa =>{
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (tarefa.concluida){
            taskItem.classList.add('concluida');

        }

        taskItem.innerHTML = tarefa.html;
        taskList.appendChild(taskItem);

        taskItem.querySelector('.complete-btn').addEventListener('click', function() {
            marcarComoConcluida(this);
        });

        taskItem.querySelector('.edit-btn').addEventListener('click', function() {
            excluirTarefa(this);
        });

        taskItem.querySelector('.delete-btn').addEventListener('click', function() {
            excluirTarefa(this);
        });
    })
}

const adicionarTarefa = () =>{
    const dataTarefa = document.querySelector('#taskDate').value;
    const horaTarefa = document.querySelector('#taskTime').value;
    const tituloTarefa = document.querySelector('#taskName').value;
    const descricaoTarefa = document.querySelector('#taskDescription').value;

    console.log(dataTarefa);

    if (tituloTarefa && dataTarefa && horaTarefa){
        //formatar a data
        const taskList = document.querySelector('#taskList');
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
         const dataFormatada = new Date (dataTarefa).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit', //se remover isso, fica sem o ano
         });

         const taskHTML = `
            <h3>${tituloTarefa}</h3>
            <p>${descricaoTarefa}</p>
            <p><strong>Vencimento:</strong> às ${horaTarefa} do dia ${dataFormatada}</p>
            <div class="task-actions">
                <button class="complete-btn">Concluir</button>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </div>`


            taskItem.innerHTML = taskHTML;
            taskList.appendChild(taskItem);

            taskItem.querySelector('.complete-btn').addEventListener('click', function() {
                marcarComoConcluida(this);
            });
    
            taskItem.querySelector('.edit-btn').addEventListener('click', function() {
                excluirTarefa(this);
            });
    
            taskItem.querySelector('.delete-btn').addEventListener('click', function() {
                excluirTarefa(this);
            });

            const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

            tarefas.push({
                nome: tituloTarefa,
                descricao: descricaoTarefa,
                data: dataFormatada,
                hora: horaTarefa,
                html: taskHTML
            });

            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            alert('Tarefa adiciona com sucesso!');
            document.querySelector('#taskForm').reset();
    }
    else{
        alert('Por favor, preencha todos os campos obrigatórios.')
    }
}

window.onload = function(){
    carregarTarefas();

    document.querySelector('#adicionarTarefaBtn').addEventListener('click', function(e){
        e.preventDefault();
        adicionarTarefa();
    });
}