(function () {
    const btnEnviar = document.getElementById('btnEnviar');
    const form = document.querySelector('form');

    btnEnviar.addEventListener("click", function (event) {
        let questoes = document.getElementsByName("questao");
        let todasAsQuestoesRespondidas = true;
        let contador = 0;
        let totalOpcoes = questoes.length * 4;

        let respostas = {};

        for (let i = 0; i < questoes.length; i++) {
            let opcoes = questoes[i].getElementsByTagName("input");

            for (let j = 0; j < opcoes.length; j++) {
                if (opcoes[j].checked) {
                    let questao = questoes[i].querySelector(".enunciado").textContent;
                    let resposta = opcoes[j].nextSibling.textContent.trim();
                    respostas[questao] = resposta;
                    break;
                }
            }
        }

        console.log(respostas);

        for (let i = 0; i < questoes.length; i++) {
            let opcoes = questoes[i].getElementsByTagName("input");

            let algumaOpcaoSelecionada = false;
            for (let j = 0; j < opcoes.length; j++) {
                if (opcoes[j].checked) {
                    algumaOpcaoSelecionada = true;
                    contador++;
                    break;
                }
            }

            if (!algumaOpcaoSelecionada) {
                todasAsQuestoesRespondidas = false;
                break;
            }
        }

        let mensagemEnviar = document.getElementById("mensagemEnviar");

        if (todasAsQuestoesRespondidas && contador == totalOpcoes) {
            console.log("Todas as questões foram respondidas corretamente!");
            mensagemEnviar.innerHTML = "Todas as questões foram respondidas corretamente!";
            mensagemEnviar.classList.remove("alert-danger");
            mensagemEnviar.classList.add("alert-success");
            const removerMensagem = () => {
                mensagemEnviar.innerHTML = '';
                mensagemEnviar.classList.remove("alert", "alert-success", "mt-3");
            };            

            // Define o tempo em que a mensagem será removida (3 segundos = 3000 milissegundos)
            const tempoParaRemoverMensagem = 3000;

            // Define o tempo para remover a mensagem após 3 segundos
            setTimeout(removerMensagem, tempoParaRemoverMensagem);
        } else if (todasAsQuestoesRespondidas) {
            console.log("Por favor, responda todas as questões.");
            mensagemEnviar.innerHTML = "Por favor, responda todas as questões.";
            mensagemEnviar.classList.remove("alert-success");
            mensagemEnviar.classList.add("alert-danger");
        }

        console.log(mensagemEnviar.innerHTML);

    });
})();