const btnCriarTarefa = document.querySelector('#adicionarTarefaBtn')

btnCriarTarefa.addEventListener('click', (e) => {
    e.preventDefault();

    const dataTarefa = document.querySelector('#taskDate').value;
    const horaTarefa = document.querySelector('#taskTime').value;
    const tituloTarefa = document.querySelector('#taskName').value;
    const descricaoTarefa = document.querySelector('#taskDescription').value;
    const containerTarefas = document.querySelector('#taskList');

    console.log(dataTarefa);
    console.log(horaTarefa);

    containerTarefas.innerHTML = `<div class="task-item">

            <h3>${tituloTarefa}</h3>
            <p>${descricaoTarefa}</p>
            <p><strong>Vencimento:</strong> às ${horaTarefa} do dia ${dataTarefa}</p>
            <div class="task-actions">
                <button class="complete-btn">Concluir</button>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir'</button>
            </div>

            </div>`

});