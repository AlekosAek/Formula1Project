import { useContext, useState } from "react";
import { DriversContext } from "../Driverscontext"; // Adjust the import path as needed
import { IInputDrivers } from "../interfaces"; // Ensure this interface matches your driver structure

function AddDriverSida() {
  const { updateDrivers } = useContext(DriversContext);
  const [name, setName] = useState("");
  const [id, setId] = useState<number>(0); // Use appropriate type
  const [image, setImage] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure name and image are filled
    if (!name || !image) {
      alert("Please fill in all fields.");
      return;
    }

    // Create new driver object
    const newDriver: IInputDrivers = {
      name,
      id,
      image,
    };

    // Call the updateDrivers function to add the new driver
    updateDrivers('add', [newDriver]); // Pass the new driver in an array

    // Clear form inputs after submission
    setName("");
    setId(0);
    setImage("");
  };

  return (
    <section className="AddDriverSida">
      <h1>Add a New Driver</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Driver Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="id">Driver ID </label>
        <input
          type="number"
          id="id"
          value={id}
          onChange={(e) => setId(parseInt(e.target.value))}
        />

        <label htmlFor="image">Driver Image URL:</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <button type="submit">Add Driver</button>
      </form>

      {/* Preview of the input */}
      <h2>Preview:</h2>
      <div className="preview">
        <p><strong>Name:</strong> {name || "No name entered"}</p>
        <p><strong>ID:</strong> {id || "No ID entered"}</p>
        <p><strong>Image URL:</strong> {image || "No image URL entered"}</p>
        {image && <img src={image} alt="Driver Preview" style={{ width: "100px", height: "auto" }} />}
      </div>
    </section>
  );
}

export default AddDriverSida;