import { Link } from "react-router-dom";
import { IAllDriversCards } from "../interfaces";
import "./css/DriversCompoment.css";

function DriversCompoment({ name, id, image, style }: IAllDriversCards) {
  return (
    <Link to={`/driver/${id}`} className={style}>
      <article>
        <figure>
          <figcaption>{name}</figcaption> {/* Render driver name */}
          <img src={image} alt={name} loading="lazy" /> {/* Render driver image */}
        </figure>
      </article>
    </Link>
  );
}

export default DriversCompoment;
