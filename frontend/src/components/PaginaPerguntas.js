import React from "react";
import "../css/pPergunta.css"

class PaginaPerguntas extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            jaClicou: false,
            jaUsouJoker: false,
            quantosJokers: [true, true, true, true, true, true, true],
            options: [],
            paraApagar: "w",
            questionNr: 0
        }
    }

    //quando o componente monta, cria um jogo e 
    componentDidMount() {
        this.getQuestion(this.props.id)
        this.decrementaTempo()
    }


    //vai decrementar o tempo ao longo do tempo
    decrementaTempo() {
        setInterval(() => {
            if (this.state.cronometro === 1) this.getQuestion(this.props.id)
            this.setState((state) => ({
                cronometro: state.cronometro - 1
            }))
        }, 1000);
    }

    //obtem uma pergunta e as respostas e define o resultado no state
    getQuestion(id) {
        console.log("incrementa pPerguntas")
        fetch(`/api/game/${id}/question`, { method: 'GET' })
            .then(res => res.json())
            .then(res => this.setState({
                question: res.pergunta,
                options: res.opcoes,
                aScore: res.pontosA,
                bScore: res.pontosB,
                cronometro: res.tempo,
                jaUsouJoker: false,
                paraApagar: "w",
                questionNr: res.questionNr
            }))
            .then(this.props.handler())
    }

    //verifica se a resposta esta certa e obtem uma nova pergunta
    //e chamado quando se clica numa resposta
    check(resposta) {
        this.avoidMultiple()
        this.checkIfRight(resposta, this.props.id)
    }

    //nao deixa que o utilizador clique varias vezes
    avoidMultiple() {
        this.setState((state) => ({
            jaClicou: !state.jaClicou
        }))
        setTimeout(() => {
            this.setState((state) => ({
                jaClicou: !state.jaClicou
            }))
        }, 500);
    }

    //da fetch para verificar se esta certa ou nao e tratar dos pontos
    checkIfRight(resposta, id) {
        fetch(`/api/game/${id}/question`, {
            method: 'POST',
            body: JSON.stringify({ resposta }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(this.getQuestion(this.props.id))
    }

    useJoker(id) {
        if (!this.state.jaUsouJoker) {
            fetch(`/api/game/${id}/question/jokers`, { method: "PATCH" })
                .then(res => res.json())
                .then(res => this.setState((state) => ({
                    quantosJokers: res.jokers,
                    paraApagar: res.chave,
                    jaUsouJoker: !state.jaUsouJoker
                })))
        }
    }

    cronometro(id) {
        fetch(`/api/game/${id}/question/cronometro`, { method: "POST" })
    }

    render() {
        return (
            <div className="geral" style={{ backgroundImage: "url(background.jpg)" }}>
                <section className="jokers">
                    {
                        this.state.quantosJokers.map((e, i) => (

                            <button className="botaoJoker" key={i}>
                                <img className="mickey" src="mickey.png" alt=""
                                    onMouseOver={(e) => (e.currentTarget.src = "mickeypiscante.png")}
                                    onMouseOut={(e) => (e.currentTarget.src = "mickey.png")}
                                    onClick={() => this.useJoker(this.props.id)} />
                            </button>)
                        )

                    }
                </section>
                <section className="perguntas">
                    <p>{this.state.question}</p>
                    {
                        this.state.options.map(o => (
                            <button className="resposta" disabled={o.key === this.state.paraApagar || this.state.jaClicou} key={o.key} onClick={() => this.check(o.key)}>{o.text}</button>
                        ))
                    }
                    <p>{this.state.questionNr === 0 ? 1 : this.state.questionNr} / 25</p>
                </section>
                <section>
                    <section className="jogadores">
                        <h2>Jogadores:</h2>
                        <h3>Scar:</h3>
                        <p>{this.state.aScore}</p>
                        <h3>Mufasa:</h3>
                        <p>{this.state.bScore}</p>
                    </section>
                    <section className={
                        this.state.cronometro > 15 ? "tempo tempoverde" :
                        this.state.cronometro > 5 ? "tempo tempoamarelo" :
                        "tempo tempovermelho"
                    }>
                        <p>{Math.trunc(this.state.cronometro)}</p>
                    </section>
                </section>
            </div>
        )
    }
}

export default PaginaPerguntas