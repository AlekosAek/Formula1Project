import { Link } from "react-router-dom";
import { IInputDrivers } from "../interfaces";
import { useContext } from "react";
import { DriversContext } from "../Driverscontext"; // Import context



function DriversCompoment({ name, id, image, style }: IInputDrivers) {
  const { deleteDriver } = useContext(DriversContext); // Get delete function from context

  return (
    <div className={style}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {/* Add a link to navigate to the edit page for each driver using the id */}
      <Link to={`/edit-driver/${id}`}>Edit</Link>
      {/* Add the Delete button */}
      <button onClick={() => deleteDriver(id)}>Delete</button>
    </div>
  );
}

export default DriversCompoment;