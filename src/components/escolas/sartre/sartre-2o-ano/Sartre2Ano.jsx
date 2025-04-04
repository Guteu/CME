import Bimestre1 from './Bimestre1.jsx';
import Notas from '../Notas.jsx'
import Contacts from '../../../Contacts.jsx';

import { useState } from "react";

import '../../escolas.css'
import backgroundImg from '../../../../assets/materiais-escolares-fundo-branco-quadriculado.jpg'

const Sartre2Ano = () => {
    
    const background = {
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll",
            minHeight: "100vh"
        }

    const [notas, setNotas] = useState({});

    const [semester, setSemester] = useState(<Bimestre1 setNotas={setNotas} />);
    const semestersArray = [
        <Bimestre1 setNotas={setNotas} key={0} />,
    ];

    function changeSemester(e) {
        setSemester(semestersArray[Number(e.target.value)])
    }

    return (
        <div style={background}>
            <main>
                <section className="semesterBox">
                    <h1>Escolha a Unidade</h1>
                    <select name="" id="" onChange={changeSemester}>
                        <option value="0">semestre 1</option>
                    </select>
                </section>
                

                {semester}

                { Object.keys(notas).length != 0 ? <Notas notas={notas} /> : null}
            </main>
            
            

            <Contacts />
        </div>
    );
}

export default Sartre2Ano;