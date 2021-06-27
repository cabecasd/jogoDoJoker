import React from "react";

class PaginaFinal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {


        }
    }

    componentDidMount() {
        this.getScore(this.props.id)
    }

    getScore(id) {
        fetch(`/api/game/${id}/question/info`, { method: "GET" })
            .then(res => res.json())
            .then(res => this.setState((state) => ({
                aScore: res.aScore
            })))
    }

    render() { return (
        <div>
            <h1>Conseguiste derrotar o Scar</h1>


            <p>Ganhaste com {this.state.aScore ? this.state.aScore : 0} pontos</p>
        </div>
    )}
}

export default PaginaFinal