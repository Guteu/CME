import { useEffect, useState } from "react"

const Notas = (props) => {

    const [notasHTML, setNotasHTML] = useState([])

    useEffect(() => {

        let arr = []
        let keys = Object.keys(props.notas)
        //console.log(props.notas)

        
        for (let i = 0; i < keys.length; i++) {
            let nota = props.notas[keys[i]].nota.toFixed(2)
            let cor = nota < 6 ? "red" : "green";
            arr.push(<tr key={i}>
                <th>{props.notas[keys[i]].nome}</th>
                <td style={{color: `${cor}`}}>{nota}</td>
            </tr>)
        }
        //console.log(arr)


        setNotasHTML(arr)
    }, [props.notas])

    return ( 
        <div className="responsiveTable" style={{marginBottom: "80px"}}>
            <table>
                <caption>Notas</caption>
                <thead>
                    <tr>
                        <th>Materia</th>
                        <th>Nota</th>
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