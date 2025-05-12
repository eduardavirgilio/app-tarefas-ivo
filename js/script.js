

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

