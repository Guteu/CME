import { NavLink } from "react-router-dom";
import './homebutton.css'
import routes from "../../../../../routes";

const HomeButton = () => {

    return (
        <NavLink to={routes.home} key={"homebutton"}>
            <div className="homeButton">
            </div>
        </NavLink>
    );
}
 
export default HomeButton;