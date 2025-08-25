import "./refreshInputsButton.css"

const RefresInputsButton = (props) => {
    return (
        <button className="refreshInputsButton" onClick={props.onClick}>{props.buttonText || "Reiniciar Inputs"}</button>
    );
}
 
export default RefresInputsButton;