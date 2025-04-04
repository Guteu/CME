import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const ChooseSchool = () => {

    const [serie, setSerie] = useState([])

    let escolas = { //a escola tem q ter o mesmo nome do ID
        sartre: [
            <NavLink to={'/CME/sartre/2ano'} key={"1ano"}>2º Ano</NavLink>,
        ],
        escolaTeste: [
        <NavLink to={'/CME/escola-teste/ano-teste'} key={"1ano"}>Ano Teste</NavLink>,
        ],
        sp: [],
        anchieta: [],

    }

    useEffect(() => {
        setSerie(escolas.sartre)
    }, [])

    function mudarSerie(event) {
        let serieId = event.target.id;
        setSerie(escolas[serieId])
    }

    return (
        <>
            <div className="chooseBox">
                <div>
                    <h1>Escolha a sua escola</h1>
                </div>
                <div className="chooseBox_options" onChange={(event) => mudarSerie(event)}>
                    <input type="radio" name="schoolButton" id="sartre" defaultChecked />
                    <label htmlFor="sartre">Sartre</label>

                    <input type="radio" name="schoolButton" id="escolaTeste" />
                    <label htmlFor="escolaTeste">Escola Teste</label>

                    <input type="radio" name="schoolButton" id="sp" />
                    <label htmlFor="sp">São paulo</label>

                    <input type="radio" name="schoolButton" id="anchieta" />
                    <label htmlFor="anchieta">Anchieta</label>
                </div>
            </div>

            <div className="chooseBox">
                <div>
                    <h1>Escolha a sua série</h1>
                </div>

                <div className="chooseBox_options">
                    {serie.length != 0 ? serie : <p>Ainda não foram adicionados nenhuma série para esta escola</p>}
                </div>
            </div>
        </>
    );
}

export default ChooseSchool;