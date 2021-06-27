/*
QUESTOES PARA FERNAS A.K.A Dom Nando A.K.A Ferdinando III

o id que esta a ser gerado quando o jogo e criado e assincrono <- ta-nos a lixar

*/

import React from "react"
import PaginaInicial from "./PaginaInicial"
import PaginaPerguntas from "./PaginaPerguntas"
import PaginaFinal from "./PaginaFinal"
import Carregando from "./Carregando"
import "../css/pPergunta.css"

class AppJoker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pagina: 0,
            questionNr: 0,
            asuhfde:"wesihd"
        }
        this.questionIncrement = this.questionIncrement.bind(this)
    }

    //a segunda parte do ternario nao funciona
    //incrementa 2 em vez de 1
    questionIncrement(id) {
        fetch(`/api/game/${id}/question/info`, { method: "GET" })
            .then(res => res.json())
            .then(res => this.setState((state) => ({
                aScore: res.aScore,
                bScore: res.bScore,
                questionNr: res.questionNr
            })))
    }

    //adiciona um novo jogo no historico
    start() {
        fetch("/api/game/", { method: "POST" })
            .then(res => res.json())
            .then(res => setTimeout(() => {
                (this.setState({
                    id: res.id
                }))
            }, 1200)
            )
            .then(this.setState({ pagina: 1 }))

    }
//////////////////FERNANDO, PQ?
    render() {
        
        return (
            <div>
                {
                    this.state.pagina === 0 ?
                        <PaginaInicial
                            onStart={() => this.start()}
                        /> : 
                    this.state.questionNr <= 25 && this.state.id?
                        <PaginaPerguntas
                            id={this.state.id}
                            apresentaNr={this.state.questionNr}
                            aScore={this.state.aScore}
                            bScore={this.state.bScore}
                            handler={() => this.questionIncrement(this.state.id)} 
                        /> :
                    this.state.questionNr > 25 && this.state.id?
                        <PaginaFinal /> : <Carregando />
                }
            </div>
        )
    }
}

export default AppJoker