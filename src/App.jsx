import './App.css'
import ChooseSchool from './components/ChooseSchool'
import Contacts from './components/Contacts'
import backgroundApp from "./assets/livro-com-fundo-placa-verde.jpg"

function App() {

    const background = {
        backgroundImage: `url(${backgroundApp})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh"
    }

    return (
        <div style={background}>
            <header>
                <h1>Calculador de médias escolares</h1>
                <h2>Versão 1.0.1    </h2>
            </header>
            <main>
                <ChooseSchool />
            </main>
            <Contacts />
        </div>
    )
}

export default App
