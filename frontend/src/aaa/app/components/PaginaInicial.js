import React from "react";
import { useDispatch } from "react-redux";
import { comecar } from "../actions/comecarJogo"
import "../css/pInicial.css"


function PaginaInicial() {

    const dispatch = useDispatch()

    return (
        <div>
            <div className="fundo" style={{ backgroundImage: "url(background.jpg)" }}>
                <button className="botaoIniciar" onClick={() => dispatch(comecar())} >Iniciar Jogo</button>
            </div>
        </div>
    )

}

export default PaginaInicial

