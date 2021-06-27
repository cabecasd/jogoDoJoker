let inicialQuestionState



export const handleQuestion =
    (inicialQuestionState = {
        question: "pergunta",
        answer: [],
        questionNumber: 0
    }, action) => {

        if (action.type === "RESPOSTA") {
            return getNextAnswer(action.payload, inicialQuestionState.questionNumber)
        }
        return inicialQuestionState
    }

export function validateAnswer(value) {
    getNextAnswer(value)

}

export const getNextAnswer = async (value, indice) => {
    try {
        const res = await fetch("/api/resposta", {
            method: 'POST',
            body: JSON.stringify(value, indice),
        })
            .then(response => response.json())
            .then(response =>
                console.log(response))
                //inicialQuestionState.question = response.question
            // .then(response =>
            //     inicialQuestionState.questionNumber += 1)
            // .then(response =>
            //     inicialQuestionState.answer = response.options)
    } catch (err) {
        console.error(err)
    }
}


//isto nao presta

/*

o que e preciso é de quando se clica numa resposta

chama uma funcao(valor de cada botao)
    que envia o valor ao servidor

    e quando o servidor responder (#1)

    altera o estado da pergunta e das respostas


#1 o servidor deve ver se a resposta esta certa, adiciona ou tira os pontos ao ficheiro, e responde ao frontend a avisar se acertou ou nao { ESTETICA >:^) }
e tambem as proximas perguntas e respostas
*/