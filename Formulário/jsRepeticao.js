// Obtém o elemento HTML do botão "Filtrar"
const btnFiltrar = document.getElementById('btnFiltrar');

const btnEnviar = document.getElementById('btnEnviar');


// Adiciona um "listener" (ouvidor) de evento de clique no botão "Filtrar"
btnFiltrar.addEventListener('click', function (event) {

    event.preventDefault(); // Previne o comportamento padrão do botão "submit"

    // Obtém os valores selecionados dos campos de seleção
    const escolaSelecionada = document.getElementById('escola').value;
    const anoSelecionado = document.getElementById('ano').value;
    const turmaSelecionada = document.getElementById('turma').value;
    const disciplinaSelecionada = document.getElementById('disciplina').value;

    // Verifica se o usuário selecionou os campos
    if (!escolaSelecionada || !anoSelecionado || !turmaSelecionada || !disciplinaSelecionada) {
        const mensagem = document.getElementById('mensagem');
        mensagem.innerHTML = 'Selecione todos os campos';
        mensagem.classList.remove("alert-success"); // Remova a classe alert-success
        mensagem.classList.add("alert", "alert-danger", "mt-3");
        return;
    } else {
        const mensagem = document.getElementById('mensagem');
        mensagem.innerHTML = 'Filtro aplicado com sucesso!';
        mensagem.classList.remove("alert-danger"); // Remova a classe alert-danger
        mensagem.classList.add("alert", "alert-success", "mt-3");

        const removerMensagem = () => {
            mensagem.innerHTML = '';
            mensagem.classList.remove("alert", "alert-success", "mt-3");
        };

        // Define o tempo em que a mensagem será removida (3 segundos = 3000 milissegundos)
        const tempoParaRemoverMensagem = 3000;

        // Define o tempo para remover a mensagem após 3 segundos
        setTimeout(removerMensagem, tempoParaRemoverMensagem);
    }

    // Executa a lógica de filtro aqui, utilizando os valores selecionados
    const questoes = [];

    // Define o número de questões com base no ano selecionado
    let numeroQuestoes = 0;
    if (parseInt(document.getElementById("ano").value) < 6) {
        numeroQuestoes = 20;
    } else {
        numeroQuestoes = 25;
    }

    // Loop para criar um objeto "questão" com número e opções de resposta
    for (let i = 1; i <= numeroQuestoes; i++) {
        const questao = {
            'numero': i,
            'opcoes': ['A', 'B', 'C', 'D']
        };
        questoes.push(questao);
    }

    // Obtém o elemento HTML do formulário
    let formulario = document.getElementById("formulario");

    // Remove todas as questões antigas
    while (formulario.firstChild) {
        formulario.removeChild(formulario.firstChild);
    }

    // Loop para criar o HTML das questões
    for (let i = 0; i < questoes.length; i++) {
        let questao = questoes[i];

        // Cria um elemento HTML "div" para cada questão
        let questaoContainer = document.createElement("div");
        questaoContainer.classList.add("form-group", "questao-container");

        // Cria um elemento HTML "label" para exibir o número da questão
        let label = document.createElement("label");
        label.htmlFor = "questao" + questao.numero;
        label.classList.add("mr-2");
        label.innerHTML = "Questão " + questao.numero + ":";
        questaoContainer.appendChild(label);

        // Cria um elemento HTML "div" para as opções de resposta da questão
        let opcaoContainer = document.createElement("div");
        opcaoContainer.classList.add("opcao-container");
        questaoContainer.appendChild(opcaoContainer);

        // Loop para criar as opções de resposta da questão
        for (let j = 0; j < questao.opcoes.length; j++) {
            let letra = questao.opcoes[j];

            // Cria um elemento HTML "div" para cada opção de resposta
            let formCheck = document.createElement("div");
            formCheck.classList.add("form-check");

            // Cria um elemento "input" do tipo "radio" para cada opção e configura seus atributos
            let input = document.createElement("input");
            input.type = "radio";
            input.name = "questao" + questao.numero;
            input.id = "questao" + questao.numero + letra;
            input.value = letra;
            input.classList.add("form-check-input");
            formCheck.appendChild(input);

            // Cria um elemento "label" para exibir a letra da opção e configura seus atributos
            let labelOpcao = document.createElement("label");
            labelOpcao.htmlFor = "questao" + questao.numero + letra;
            labelOpcao.classList.add("form-check-label", "ml-2");
            labelOpcao.innerHTML = letra;
            formCheck.appendChild(labelOpcao);

            // Adiciona o elemento "input" e o elemento "label" no container de opções
            opcaoContainer.appendChild(formCheck);
        }

        // Adiciona o container de questão no formulário
        formulario.appendChild(questaoContainer);

    }

});