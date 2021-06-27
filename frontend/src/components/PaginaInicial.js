import React from "react";
import "../css/pInicial.css"

function PaginaInicial(props) {

    return (
        <div>
            <div className="fundo" style={{ backgroundImage: "url(background.jpg)" }}>
                <button className="botaoIniciar" onClick={props.onStart} >Iniciar Jogo</button>
            </div>
        </div>
    )

}

export default PaginaInicial

