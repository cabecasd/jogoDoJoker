import React from "react";
import './jogodamas.css'


// TODO:
//[x] - criar tabuleiro
//[x] - apresentar tabuleiro
//[x] - colocar as pecas no tabuleiro
//[x] - jogadas possiveis
//[ ] - jogadas possiveis damas
//[ ] - condicoes de vitoria
//[x] - botao reset

class JogoDasDamas extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            tabuleiro: [
                ["c", "", "c", "", "", "", "c", ""],
                ["", "c", "", "x", "", "", "", "c"],
                ["c", "", "c", "", "c", "", "c", ""],
                ["", "x", "", "", "", "", "", ""],
                ["", "", "", "", "c", "", "c", ""],
                ["", "x", "", "x", "", "x", "", "x"],
                ["x", "", "x", "", "c", "", "x", ""],
                ["", "x", "", "", "", "x", "", "x"],
            ],
            jogadorAtual: "x",
            jogadasPossiveis: [[], []],
            oponente: "c",
            posicaoDaPecaX: undefined,
            posicaoDaPecaY: undefined,
            comeu: false,
            xMorto: 0,
            cMorto: 0,
            jogoTerminado: undefined
        } //fim do state
        this.verificaPossiveisMovimento = this.verificaPossiveisMovimento.bind(this)
        this.verificaPossiveisComer = this.verificaPossiveisComer.bind(this)
    }//fim do constructor

    selecionaPeca(x, y) {

        if (!this.state.jogoTerminado) {
            let tabuleiro = [...this.state.tabuleiro];
            let lado = this.state.jogadorAtual === "x" ? - 1 : + 1

            let posX = this.state.posicaoDaPecaX
            let posY = this.state.posicaoDaPecaY

            if (this.state.jogadorAtual === tabuleiro[x][y]) {

                    
                posX = x
                posY = y

                this.setState({
                    posicaoDaPecaX: x,
                    posicaoDaPecaY: y
                })

                this.verificaPossiveis(posX, posY, lado, tabuleiro)
            }

            if ((x === this.state.jogadasPossiveis[0][0] && y === this.state.jogadasPossiveis[0][1])
                || (x === this.state.jogadasPossiveis[1][0] && y === this.state.jogadasPossiveis[1][1])) {
                    console.log("xx")
                    console.log(posX)
                this.movimento(x, y, tabuleiro, lado, posX, posY)
            }
        }
    }
    verificaPossiveis(posX, posY, lado, tabuleiro) {
        let possiveis = [[], []]

        if (this.state.jogadorAtual === "x" && posX > 1) {
            possiveis = this.verificaPossiveisComer(posX, posY, lado, possiveis, tabuleiro)
        }
        if (this.state.jogadorAtual === "c" && posX < 5) {
            possiveis = this.verificaPossiveisComer(posX, posY, lado, possiveis, tabuleiro)
        }

        possiveis = this.verificaPossiveisMovimento(posX, posY, lado, possiveis, tabuleiro)

        this.setState((state) => { state.jogadasPossiveis = possiveis }
        )
    }

    verificaPossiveisComer(x, y, lado, possiveis, tabuleiro) {

        let possiveis2 = possiveis
        //caso tenha uma peca a frente e a seguinte esteja vazia, pode-se comer, para a esquerda
        if (tabuleiro[x + lado][y - 1] === this.state.oponente && tabuleiro[x + lado * 2][y - 2] === "") {
            possiveis2[0] = [x + lado * 2, y - 2]
        }

        //o mesmo para a direita
        if (tabuleiro[x + lado][y + 1] === this.state.oponente && tabuleiro[x + lado * 2][y + 2] === "") {
            possiveis2[1] = [x + lado * 2, y + 2]
        }


        return possiveis2
    }

    verificaPossiveisMovimento(x, y, lado, possiveis, tabuleiro) {
        let possiveis2 = possiveis

        //verificar se pode mover para a casa da esquerda
        if (tabuleiro[x + lado][y - 1] === "") {
            possiveis2[0] = [x + lado, y - 1]
        }
        //o mesmo para a direita
        if (tabuleiro[x + lado][y + 1] === "") {
            possiveis2[1] = [x + lado, y + 1]
        }
        return possiveis2
    }

    movimento(x, y, tabuleiro, posX, posY) {

        //jogadaspossiveis[0] <--- jogada possivel a esquerda
        //jogadaspossiveis[1] <--- jogada possivel a direita
        //jogadaspossiveis[n][0] <---- a linha da jogada possivel que estamos a ver
        //jogadaspossiveis[n][1] <---- a coluna da jogada possivel que estamos a ver

        let comeuPeca = false
        let possiveis = [[], []]

        //faz uma copia do tabuleiro
        // let tabuleiro = [...this.state.tabuleiro];
        
        console.log(posX)
        //guarda na variavel o que vai estar na posicao final
        let posicaoFinal = tabuleiro[x][y];
        posicaoFinal = `${this.state.jogadorAtual}`;

        //guarda na variavel o que vai estar na posicao da peca
        console.log([posX],[posY])
        let posicaoInicial = tabuleiro[posX][posY]
        posicaoInicial = ""

        //substitui os valores das duas posicoes
        tabuleiro[x][y] = posicaoFinal;
        tabuleiro[posX][posY] = posicaoInicial

        comeuPeca = this.movimentoCome(x, y, tabuleiro, posX)

        //substitui por dama
        if (tabuleiro[0].includes("x")) {
            let pos = tabuleiro[0].findIndex(e => e === "x")
            tabuleiro[0][pos] = "xx"
        }
        if (tabuleiro[7].includes("c")) {
            let pos = tabuleiro[7].findIndex(e => e === "c")
            tabuleiro[7][pos] = "cc"
        }

        // possiveis = this.verificaPossiveisComer(x, y, direcao, possiveis, tabuleiro)
        // comeuPeca = this.movimentoCome(x, y, tabuleiro, lado)

        this.setState({ tabuleiro })
        this.setState(state => {
            state.jogadasPossiveis = possiveis
        })

        //final da jogada, troca o jogador se nao comeu ninguem
        if (!comeuPeca) {

            this.state.jogadorAtual === "x" ? this.setState({ jogadorAtual: "c" }) : this.setState({ jogadorAtual: "x" })
            this.state.oponente === "c" ? this.setState({ oponente: "x" }) : this.setState({ oponente: "c" })

        }

        this.verificaVencedor()
        //final da jogada, tira as jogadas possiveis
        this.setState({
            jogadasPossiveis: [[], []],
        })
    }


    movimentoCome(x, y, tabuleiro, posX) {

        if (this.state.jogadorAtual === "x") {
            if (Math.abs(x - posX) > 1 && (x === this.state.jogadasPossiveis[0][0] && y === this.state.jogadasPossiveis[0][1])) {
                tabuleiro[x + 1][y + 1] = ""

                this.setState((state) => {
                    state.cMorto += 1
                })
                this.playBartAudio()

                return true
            }
            else if (Math.abs(x - posX) > 1 && (x === this.state.jogadasPossiveis[1][0] && y === this.state.jogadasPossiveis[1][1])) {
                tabuleiro[x + 1][y - 1] = ""

                this.setState((state) => {
                    state.cMorto++
                })
                this.playBartAudio()

                return true
            }
        }

        if (this.state.jogadorAtual === "c") {
            if (Math.abs(x - posX) > 1 && (x === this.state.jogadasPossiveis[0][0] && y === this.state.jogadasPossiveis[0][1])) {
                tabuleiro[x - 1][y + 1] = ""

                this.setState((state) => {
                    state.xMorto++
                })

                this.playBobAudio()

                return true
            }
            else if (Math.abs(x - posX) > 1 && (x === this.state.jogadasPossiveis[1][0] && y === this.state.jogadasPossiveis[1][1])) {
                tabuleiro[x - 1][y - 1] = ""

                this.setState((state) => {
                    state.xMorto += 1
                })

                this.playBobAudio()

                return true
            }
        }

        return false
    }

    playBartAudio() {
        const audioElement = document.getElementsByClassName("audioBart")[0]
        audioElement.play()
    }
    playBobAudio() {
        const audioElement = document.getElementsByClassName("audioBob")[0]
        audioElement.play()
    }

    recomecar() {

        this.setState({
            tabuleiro: [
                ["c", "", "c", "", "c", "", "c", ""],
                ["", "c", "", "c", "", "c", "", "c"],
                ["c", "", "c", "", "c", "", "c", ""],
                ["", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", ""],
                ["", "x", "", "x", "", "x", "", "x"],
                ["x", "", "x", "", "x", "", "x", ""],
                ["", "x", "", "x", "", "x", "", "x"],
            ],
            jogadorAtual: "x",
            jogadasPossiveis: [[], []],
            oponente: "c",
            posicaoDaPecaX: undefined,
            posicaoDaPecaY: undefined,
            comeu: false,
            xMorto: 0,
            cMorto: 0,
            jogoTerminado: false
        }
        )
    }

    verificaVencedor() {
        if (this.state.cMorto > 11 ) {
            alert("Bart é o vencedor")

            this.setState(state =>{
                state.jogoTerminado = true
            })
        }
        if (this.state.xMorto > 11) {
            alert("Sideshow Bob é o vencedor")

            this.setState(state =>{
                state.jogoTerminado = true
            })
        }         
    }
    


    render() {
        return (
            <section className="pagina">
                <section className="tabuleiro">
                    <table>
                        <tbody>
                            {
                                this.state.tabuleiro.map((linha, i) => (
                                    <tr key={i}>
                                        {
                                            linha.map((coluna, j) => (


                                                coluna === "x" ? <td key={j}
                                                    onClick={
                                                        () => this.selecionaPeca(i, j)}
                                                    className={i === this.state.posicaoDaPecaX && j === this.state.posicaoDaPecaY ? "branco2" :
                                                        this.state.jogadorAtual === "x" ? "branco" : " "}>
                                                    <img src="Bartt.png" alt="Bart"></img></td>

                                                    : coluna === "c" ? <td key={j}
                                                        onClick={
                                                            () => this.selecionaPeca(i, j)}
                                                        className={this.state.jogadorAtual === "c" ? "preto" : ""}>
                                                        <img src="SideshowBobb.png" alt="SideshowBob"></img></td>

                                                    : coluna === "xx" ? <td key={j}
                                                    onClick={
                                                        () => this.selecionaPeca(i, j)}
                                                    className={i === this.state.posicaoDaPecaX && j === this.state.posicaoDaPecaY ? "branco2" :
                                                        this.state.jogadorAtual === "x" ? "branco" : " "}>XX</td>

                                                    : coluna === "cc" ? <td key={j}
                                                    onClick={
                                                        () => this.selecionaPeca(i, j)}
                                                    className={i === this.state.posicaoDaPecaX && j === this.state.posicaoDaPecaY ? "branco2" :
                                                        this.state.jogadorAtual === "c" ? "branco" : " "}>CC</td>
                                                   :<td key={j} className={
                                                        this.state.jogadorAtual === "x" ?
                                                            i === this.state.jogadasPossiveis[0][0] && j === this.state.jogadasPossiveis[0][1] ? "possivelBart"
                                                                : i === this.state.jogadasPossiveis[1][0] && j === this.state.jogadasPossiveis[1][1] ? "possivelBart"
                                                                    : "" :
                                                            i === this.state.jogadasPossiveis[0][0] && j === this.state.jogadasPossiveis[0][1] ? "possivelBob"
                                                                : i === this.state.jogadasPossiveis[1][0] && j === this.state.jogadasPossiveis[1][1] ? "possivelBob"
                                                                    : ""
                                                    } onClick={() => this.selecionaPeca(i, j)}></td>

                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <p className="turn">Turn: {this.state.jogadorAtual === "x" ? <img src="Bartt.png" alt="Bart"></img> : <img src="SideshowBobb.png" alt="SideshowBob"></img>}</p>
                </section>
                <section className="sidebar">
                    <button onClick={() => this.recomecar()}>Recomeçar</button>
                    <img src="./HomerBush.png" alt="Homer a entrar num arbusto" ></img>
                    <audio className="audioBart">
                        <source src="./BartShorts.mp3"></source>
                    </audio>
                    <audio className="audioBob">
                        <source src="./SBobLaugh.mp3"></source>
                    </audio>
                </section>
            </section>
        )
    }
}

export default JogoDasDamas;
/*

    this.comeu = this.comeu.bind(this)
    comeu(x, y, eOD) {

        let direcaoVertical = this.state.tabuleiro[x][y] === "x" ? +1 : - 1
        let direcaoHorizontal = eOD === "esquerda" ? + 1 : - 1

        if (this.state.tabuleiro[x + direcaoVertical][y + direcaoHorizontal] === "") {
            console.log("comeu")
            return true
        } else if (this.state.tabuleiro[x + direcaoVertical][y + direcaoHorizontal] === "") {
            console.log("comeu")
            return true
        }

        return false

    }




    if(Math.abs(x - this.state.posicaoDaPecaX) > 1 && Math.abs(y - this.state.posicaoDaPecaY) > 1) {
             // console.log("entrou if 1")

            if (this.state.tabuleiro[x][y] === "c") {
                // console.log("entrou if 2")
                this.verificaPossiveisComer(x, y, +1)
                if(this.state.podeComerEsquerda || this.state.podeComerDireita) {

                    // console.log("entrou if 3")
                    return true
                }
            }
            if (this.state.tabuleiro[x][y] === "x") {
                // console.log("entrou if 2")
                this.verificaPossiveisComer(x, y, -1)
                if(this.state.podeComerEsquerda || this.state.podeComerDireita) {
                    // console.log("entrou if 3")
                    return true
                }
            }

        } return false









        com a ideia de rodar o tabuleiro
        as jogadas possiveis são sempre a x+1 y-1 e x+1 y-1

        ["      ","Peça","      "],
        ["pssvel","    ","pssvel"],
        ["      ","    ","      "],

        exclui-se depois as possiveis dependendo se ha uma peca nessa posicao ou nao



        if()
                console.log("wahoo")
                return true
            this.state.jogadasPossiveis[0] !== undefined || this.state.jogadasPossiveis[1] !== undefined



                this.setState({
            comeu: true
        })










        this.rodaTabuleiro = this.rodaTabuleiro.bind(this)
    rodaTabuleiro(tabuleiro) {

        let novoTabuleiro = []
        for(let i = tabuleiro.length - 1; i >= 0; i--) {
            let linhaTemp = []
            novoTabuleiro.push(linhaTemp)

            for(let j = tabuleiro.length - 1; j >= 0; j--) {
                linhaTemp.push(tabuleiro[i][j])

            }
        }

        this.setState(state => {
            state.tabuleiro = novoTabuleiro
        })

    }






        // else {

        //     if (this.state.jogadorAtual === "x") {

        //         if (tabuleiro[x - 1][y - 1] === this.state.oponente && tabuleiro[x - 2][y - 2] === "") {

        //             possiveis2[0] = [x - 2, y - 2]
        //         }


        //         if (tabuleiro[x - 1][y + 1] === this.state.oponente && tabuleiro[x - 2][y + 2] === "") {

        //             possiveis2[1] = [x - 2, y + 2]

        //         }
        //     } else if ( this.state.jogadorAtual === "c") {

        //         if (tabuleiro[x + 1][y - 1] === this.state.oponente && tabuleiro[x + 2][y - 2] === "") {

        //             possiveis2[0] = [x + 2, y - 2]
        //         }


        //         if (tabuleiro[x + 1][y + 1] === this.state.oponente && tabuleiro[x + 2][y + 2] === "") {

        //             possiveis2[1] = [x + 2, y + 2]

        //         }
        //     }

        // }
*/
