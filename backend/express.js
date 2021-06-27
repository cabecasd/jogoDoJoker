import express from 'express';
import * as fs from "fs"

const app = express()
app.use(express.json());
const port = 3001

const EASY_QUESTIONS = "./data_base/eQuestions.json"
const MEDIUM_QUESTIONS = "./data_base/mQuestions.json"
const HARD_QUESTIONS = "./data_base/hQuestions.json"
const MEMORIA = "localdata.json"

//cria jogo no ficheiro
app.post('/api/game/', async (req, res) => {
    try {

        const baseDadosES = fs.readFileSync(EASY_QUESTIONS)
        const baseDadosMS = fs.readFileSync(MEDIUM_QUESTIONS)
        const baseDadosHS = fs.readFileSync(HARD_QUESTIONS)

        const baseDadosE = JSON.parse(baseDadosES.toString())
        const baseDadosM = JSON.parse(baseDadosMS.toString())
        const baseDadosH = JSON.parse(baseDadosHS.toString())

        let tudo = readFile(MEMORIA)

        //molde inicial da info adicional quando um novo jogo e criado
        const inicial = {
            "scores": {
                "aScore": 0,
                "bScore": 0
            },
            "jokers": {
                "aJoker": [true, true, true, true, true, true, true],
                "bJoker": [true, true, true, true, true, true, true],
            },
            "questionIndex": 0,
        }

        const perguntas = geraPerguntas(baseDadosE, baseDadosM, baseDadosH)

        const objeto = { perguntas: perguntas, info: inicial }
        tudo.historico.push(objeto)

        const id = tudo.historico.length - 1

        writeFile(tudo)

        res.status(201).json({
            "id": id
        })
    } catch (error) {
        res.status(500).send("Erro ao criar instância de jogo")
    }
})

//obtem pergunta
app.get('/api/game/:id/question', async (req, res) => {
    try {

        let tudo = readFile(MEMORIA)

        const gameIndex = parseInt(req.params.id)
        const JogoAtual = tudo.historico[gameIndex]

        let questionIndex = JogoAtual.info.questionIndex
        const nextQuestionIndex = JogoAtual.info.questionIndex + 1

        const pergunta = JogoAtual.perguntas[JogoAtual.info.questionIndex].question
        const opcoes = JogoAtual.perguntas[JogoAtual.info.questionIndex].options

        const tempoLimite = criaTempoLimite(JogoAtual)
        const dataDeCriacao = new Date().valueOf()
        const tempoASerRetornado = (tempoLimite - dataDeCriacao) / 1000

        questionIndex = nextQuestionIndex

        tudo.historico[gameIndex].info.questionIndex = questionIndex

        tudo.historico[gameIndex].perguntas[questionIndex - 1].tempoLimite = tempoLimite

        writeFile(tudo)

        res.status(200).json({
            pergunta: pergunta,
            opcoes: opcoes,
            pontosA: JogoAtual.info.scores.aScore,
            pontosB: JogoAtual.info.scores.bScore,
            tempo: tempoASerRetornado,
            questionNr: JogoAtual.info.questionIndex,
        })
    } catch (error) {
        res.status(500).send("error")
    }
})

//obtem informacoes do jogo
app.get('/api/game/:id/question/info', async (req, res) => {
    try {

        let tudo = readFile(MEMORIA)

        const gameIndex = parseInt(req.params.id)
        const JogoAtual = tudo.historico[gameIndex]

        res.status(200).json({
            questionNr: JogoAtual.info.questionIndex,
            aScore: JogoAtual.info.scores.aScore,
            bScore: JogoAtual.info.scores.bScore,
        })
    } catch (error) {
        res.status(500).send("error")
    }
})

//verificar se a resposta esta certa e atribuir pontos
app.post(`/api/game/:id/question`, async (req, res) => {
    try {
        const dataResposta = new Date()

        let tudo = readFile(MEMORIA)

        const gameIndex = parseInt(req.params.id)
        let jogoAtual = tudo.historico[gameIndex]
        const questionIndex = jogoAtual.info.questionIndex - 1

        if (dataResposta < jogoAtual.perguntas[questionIndex].tempoLimite) {
            const respostaObtida = req.body.resposta
            const respostaCerta = jogoAtual.perguntas[questionIndex].answer
            let pontos = tudo.historico[gameIndex].info.scores.aScore

            let novaPontuacao = await handleScore(respostaObtida, respostaCerta, pontos)

            tudo.historico[gameIndex].info.scores.aScore = novaPontuacao

            writeFile(tudo)
        }

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
})

//nao faz nada
app.post(`/api/game/:id/question/cronometro`, async (req, res) => {
    try {



        res.status(201)
    } catch (error) {
        res.sendStatus(500)
    }
})


//trata dos jokers
app.patch(`/api/game/:id/question/jokers`, async (req, res) => {
    try {
        let tudo = readFile(MEMORIA)
        const gameIndex = parseInt(req.params.id)
        let jogoAtual = tudo.historico[gameIndex]
        const questionIndex = jogoAtual.info.questionIndex - 1

        //faz uma copia dos jokers
        let jokers = apagaJoker(jogoAtual, questionIndex)
        jogoAtual.info.jokers.aJoker = jokers

        //retorna qual e o que vai ficar disabled
        let apagada = escolheChave(jogoAtual, questionIndex)

        writeFile(tudo)

        res.status(200).json({
            "chave": apagada.key,
            "jokers": jokers
        })
    } catch (error) {
        res.sendStatus(500)
    }
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


/////////////////
// funcoes auxiliares
/////////////////

//escolhe a chave que vai ficar disabled quando se usa um joker
function escolheChave(jogo, indicePergunta) {
    const respostaCerta = jogo.perguntas[indicePergunta].answer
    let respostas = jogo.perguntas[indicePergunta].options

    let respostasFiltradas = respostas.filter(p => p.key !== respostaCerta)

    const indiceAleatorio = Math.floor(Math.random() * 3)

    const respostaGerada = respostasFiltradas[indiceAleatorio]

    return respostaGerada
}

//remove um joker da copia de jokers
function apagaJoker(jogo, indicePergunta) {
    let jokers = jogo.info.jokers.aJoker

    jokers.pop()

    return jokers
}

//define ate quando podemos responder a uma pergunta quando a pergunta e gerada
function criaTempoLimite(jogo) {
    const indicePergunta = jogo.info.questionIndex
    let dataLimite = 0
    if (jogo.perguntas[indicePergunta].tempoLimite === undefined) {
        if (indicePergunta < 10) {
            dataLimite = new Date().valueOf() + 30 * 1000
        }
        else if (indicePergunta < 20) {
            dataLimite = new Date().valueOf() + 40 * 1000
        } else {
            dataLimite = new Date().valueOf() + 50 * 1000
        }
    }
    return dataLimite
}

// adiciona ou remove pontos dependendo de se a resposta esta certa ou nao
function handleScore(obtida, certa, pontos) {
    let pontuacao = pontos

    if (obtida === certa) {
        pontuacao += 100
    } else {
        if (pontuacao >= 300) {
            pontuacao -= 300
        } else {
            pontuacao = 0
        }
    }

    return pontuacao
}

//escreve no ficheiro json
function writeFile(tudo) {
    fs.writeFileSync(MEMORIA, JSON.stringify(tudo, null, 2))
}

//le do ficheiro json
function readFile(MEMORIA) {
    const gameMemoryD = fs.readFileSync(MEMORIA)
    const gameMemory = JSON.parse(gameMemoryD.toString())
    return gameMemory
}

//gera as 25 perguntas, 10 faceis 10 medias e 5 dificeis
function geraPerguntas(faceis, medias, dificeis) {
    let todasAsPerguntas = []
    let perguntasGeradas = []

    //gera as faceis
    while (todasAsPerguntas.length < 10) {
        //indice da pergunta que vamos buscar a base de dados
        let indicePergunta = Math.floor(Math.random() * faceis.questions.length)

        if (!perguntasGeradas.includes(indicePergunta)) {
            //guarda numa variavel o objeto que vamos buscar com o indice,
            //a base de dados das perguntas faceis
            let pergunta = faceis.questions[indicePergunta]

            //guardamos esta pergunta, no array que vai ter as 25 perguntas
            todasAsPerguntas.push(pergunta)
            perguntasGeradas.push(indicePergunta)
        }
    }
    perguntasGeradas.length = 0
    //gera as medias
    while (todasAsPerguntas.length < 20) {
        let indicePergunta = Math.floor(Math.random() * medias.questions.length)

        if (!perguntasGeradas.includes(indicePergunta)) {
            let pergunta = medias.questions[indicePergunta]

            todasAsPerguntas.push(pergunta)
            perguntasGeradas.push(indicePergunta)
        }
    }
    perguntasGeradas.length = 0
    //gera as dificeis
    while (todasAsPerguntas.length < 25) {
        let indicePergunta = Math.floor(Math.random() * dificeis.questions.length)

        if (!perguntasGeradas.includes(indicePergunta)) {
            let pergunta = dificeis.questions[indicePergunta]

            todasAsPerguntas.push(pergunta)
            perguntasGeradas.push(indicePergunta)
        }
    }

    return todasAsPerguntas
}