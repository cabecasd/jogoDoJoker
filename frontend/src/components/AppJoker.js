/*
QUESTOES PARA FERNAS A.K.A Dom Nando A.K.A Ferdinando III

o id que esta a ser gerado quando o jogo e criado e assincrono <- ta-nos a lixar
o temporizador nao esta sincrono (possivelmente nem os scores)

TO DO

[ ] - websockets
[x] - tratar da assincronocidade
[ ] - 
[ ] - OPTIONAL - nomes dos jogadores ao iniciar
[ ] - OPTIONAL - botao menu que pode baixar a dificuldade
[ ] - OPTIONAL - 


<Carregando />
this.state.questionNr > 25 && this.state.id?
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
            questionNr: 1,
            asuhfde: "wesihd"
        }
        this.questionIncrement = this.questionIncrement.bind(this)
    }

    //a segunda parte do ternario nao funciona
    //incrementa 2 em vez de 1
    questionIncrement(id) {
        console.log(id)
        fetch(`/api/game/${id}/question/info`, { method: "GET" })
            .then(res => res.json())
            .then(res => this.setState((state) => ({
                questionNr: res.questionNr
            })))
    }

    //adiciona um novo jogo no historico
    start() {
        console.log("comecou")
        fetch("/api/game/", { method: "POST" })
            .then(res => res.json())
            .then(res => this.setState((state) => (
                {
                    pagina: 1,
                    id: res.id
                })))
    }

    render() {

        return (
            <div>
                {
                    this.state.questionNr === 25 ?
                        <PaginaFinal
                            id={this.state.id}
                        /> : this.state.pagina === 0 ?
                            <PaginaInicial
                                onStart={() => this.start()}
                            /> :
                            <PaginaPerguntas
                                id={this.state.id}
                                apresentaNr={this.state.questionNr}
                                aScore={this.state.aScore}
                                bScore={this.state.bScore}
                                handler={() => this.questionIncrement(this.state.id)}
                            />

                }
            </div>
        )
    }
}

export default AppJoker