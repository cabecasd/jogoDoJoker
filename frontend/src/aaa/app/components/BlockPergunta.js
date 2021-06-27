// import { useSelector } from "react-redux";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resposta } from "../actions/validarResposta"
import store from "../store"

function PerguntaERespostas() {

    const question = useSelector(state => state.handleQuestion.question)
    console.log(question)

    // const pergunta = useSelector(state => state.pergunta)
    // const respostaA = useSelector(state => state.respostaA)
    // const respostaB = useSelector(state => state.respostaB)
    // const respostaC = useSelector(state => state.respostaC)
    // const respostaD = useSelector(state => state.respostaD)
    const dispatch = useDispatch()

        return (
            <div>
                <div>
                    <p>{question}</p>
                </div>
                <div>
                    <button onClick={() => dispatch(resposta("a"))}>respostaA</button>
                    <button onClick={() => dispatch(resposta("b"))}>respostaB</button>
                    <button onClick={() => dispatch(resposta("c"))}>respostaC</button>
                    <button onClick={() => dispatch(resposta("d"))}>respostaD</button>
                </div>
            </div>
        )
    
}

export default PerguntaERespostas