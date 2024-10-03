import { Link } from "react-router-dom";
import { IDriver } from "../interfaces";
import "./css/DriverCard.css";
import "./css/Header.css";


// Destructure the props and use the IDriver interface
function Drivercard({ name, id, image,style }: IDriver) {
  return (
    <Link to={`/driver/${id}`} className={style}>
      <article>
        <figure>
          <img src={image} alt={name} loading="lazy"/> {/* Add alt text for accessibility */}
          <figcaption>{name}</figcaption>
        </figure>
      </article>
    </Link>
  );
}

export default Drivercard;