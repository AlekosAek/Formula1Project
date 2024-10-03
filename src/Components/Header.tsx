import { Link } from "react-router-dom";
import "./css/Header.css"

function Header() {
  return (
    <header>
      <div className="myHeader" >
        <h1>Formula 1 Stats</h1>
      </div>
      <div className="myLinks">
        <Link className="firstLink" to="/AllTheDrivers">All the drivers</Link>
        <Link className="secondLink" to="/AddDriverSida">Add a driver</Link>
      </div>
    </header>
  );
}

export default Header;