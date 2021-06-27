import React, { useEffect } from "react";
import PerguntaERespostas from "./BlockPergunta"
import "../css/pPergunta.css"
import Jokers from "./Jokers";
import { getNextAnswer } from "../reducers/respostaReducer"

class PaginaPerguntas extends React.Component {

    componentDidMount() {
        getNextAnswer(null, 0)
    }

    render() {
        return (
            <div className="geral" style={{backgroundImage: "url(background.jpg)"}}>
                <session className="jokers">
                    <Jokers />
                </session>
                <session className="perguntas">
                    <PerguntaERespostas />
                </session>
                <session className="jogadores">
                    <h2>Jogadores:</h2>
                    <h3>Rafinha sempre Alegre</h3>
                    <h3>Ines e os Coelhos</h3>
                </session>
            </div>
        )
    }
}

// export function obtemPergunta() {
//     fetch()
// }

export default PaginaPerguntas

