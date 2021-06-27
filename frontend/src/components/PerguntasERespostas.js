import React from "react";

class PerguntaERespostas extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            pergunta: "",
            options: [],
            rightOption: "",
        }

    } // fim do constructor

    render() {
        return (
            <div>

                <section>
                    <p>{this.props.pergunta}</p>
                    {
                        this.props.opcoes.map(o => (
                            <button key={o.key} onClick={() => this.props.verifica(o.key)}>{o.text}</button>
                        ))
                    }
                    <p>{this.props.apresentaNr2} / 25</p>
                </section>

            </div>
        )
    }
}

export default PerguntaERespostas