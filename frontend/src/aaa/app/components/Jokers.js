import React, { useEffect } from "react";

//ter a quantidade de jokers guardados num array que se vai buscar ao ficheiro, e no return
// for (let i = 0; i < numeroDeJokers; i++) {
//      adiciona-se um botao à div
//}


// ou


// tem-se um array e mapeia-se


function Jokers() {


    return (
        <div>
            <button><img className="mickey" src="mickey.png"
                onMouseOver={(e) => (e.currentTarget.src = "mickeypiscante.png")}
                onMouseOut ={(e) => (e.currentTarget.src = "mickey.png")}/>
            </button>
            <button><img className="mickey" src="mickey.png"
                onMouseOver={(e) => (e.currentTarget.src = "mickeypiscante.png")}
                onMouseOut ={(e) => (e.currentTarget.src = "mickey.png")}/>
            </button>
            <button><img className="mickey" src="mickey.png"
                onMouseOver={(e) => (e.currentTarget.src = "mickeypiscante.png")}
                onMouseOut ={(e) => (e.currentTarget.src = "mickey.png")}/>
            </button>
            <button><img className="mickey" src="mickey.png"
                onMouseOver={(e) => (e.currentTarget.src = "mickeypiscante.png")}
                onMouseOut ={(e) => (e.currentTarget.src = "mickey.png")}/>
            </button>
            <button><img className="mickey" src="mickey.png"
                onMouseOver={(e) => (e.currentTarget.src = "mickeypiscante.png")}
                onMouseOut ={(e) => (e.currentTarget.src = "mickey.png")}/>
            </button>
            <button><img className="mickey" src="mickey.png"
                onMouseOver={(e) => (e.currentTarget.src = "mickeypiscante.png")}
                onMouseOut ={(e) => (e.currentTarget.src = "mickey.png")}/>
            </button>
            <button><img className="mickey" src="mickey.png"
                onMouseOver={(e) => (e.currentTarget.src = "mickeypiscante.png")}
                onMouseOut ={(e) => (e.currentTarget.src = "mickey.png")}/>
            </button>
        </div>
    )
}

// const handleMouseOver = ((e) => (e.currentTarget.src = "mickeypiscante.png"))

export default Jokers