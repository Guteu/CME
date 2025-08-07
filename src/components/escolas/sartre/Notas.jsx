import { useEffect, useState } from "react"

const Notas = (props) => {

    const [notasHTML, setNotasHTML] = useState([])
    const [pesoBimestre, setPesoBimestre] = useState(2)

    useEffect(() => {

        let arr = []
        let keys = Object.keys(props.notas)
        //console.log(props.notas)
        let pesoBimestre;

        //numeroBimestre - 1 = case (0 = bimestre 1 etc)
        switch (document.getElementById("semesterSelect").value) {
            case "0":
                pesoBimestre = 2;
                break;
            case "1":
                pesoBimestre = 3;
                break;
            case "2":
                pesoBimestre = 2;
                break;
            case "3":
                pesoBimestre = 3;
                break;
            default:
                pesoBimestre = 0;
        }


        for (let i = 0; i < keys.length; i++) {
            let nota = props.notas[keys[i]].nota.toFixed(2);
            if (nota == "NaN" || nota == "undefined") {
                nota = "0.00"
            }
            let cor = nota < 6 ? "red" : "green";
            arr.push(<tr key={i}>
                <th>{props.notas[keys[i]].nome}</th>
                <td style={{ color: `${cor}` }}>{(Math.ceil(Number(nota) * 10) / 10).toFixed(2)}</td>
                <td>{(Math.ceil((Number(nota) * pesoBimestre) * 10)/10).toFixed(2)}</td>
            </tr>)
        }
        //console.log(arr)

        setNotasHTML(arr)
    }, [props.notas])

    return (
        <div className="responsiveTable" style={{ marginBottom: "80px" }}>
            <table>
                <caption>Notas</caption>
                <thead>
                    <tr>
                        <th>Materia</th>
                        <th>Nota</th>
                        <th>pp</th>
                    </tr>
                </thead>
                <tbody>
                    {notasHTML}
                </tbody>
            </table>
        </div>
    );
}

export default Notas;