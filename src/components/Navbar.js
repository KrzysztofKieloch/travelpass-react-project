import { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import { Link } from "react-router-dom"


class Navbar extends Component {
    render() {
        return(
            <div className="container fixed-top">
                <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
                    <a className="navbar-brand" href="/"><i className="fa-sharp fa-solid fa-plane"></i>TravelPass</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuItems" data-target="#menuItems" aria-controls="menuItems" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="menuItems">
                        <ul className="navbar-nav ml-auto">
                            {MenuItems.map((item, index) => {
                                return(
                                    <li className="nav-link active" key={index}>
                                        <Link className={item.cName} to={item.url}>
                                            {item.title} <span className="sr-only"></span>
                                        </Link>
                                    </li>
                                )
                            })}
                            <Link className="nav-link active" to="/login"><i className="fa-solid fa-right-to-bracket"></i>Login</Link>
                        </ul> 
                        
                    </div>
                </nav>   
            </div>
            
        )
    }
}
export default Navbar;