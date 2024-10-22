import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // To get the driver ID from URL
import { DriversContext } from "../Driverscontext"; // Import context
import { IInputDrivers } from "../interfaces"; // Import your interface

function EditDriverPage() {
  const { drivers, updateDrivers } = useContext(DriversContext);
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const navigate = useNavigate(); // To redirect after saving
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");

  // Find the driver by ID and populate the form
  useEffect(() => {
    const driver = drivers.find((driver) => driver.id === Number(id));
    if (driver) {
      setName(driver.name);
      setImage(driver.image);
    } else {
      console.error("Driver not found");
    }
  }, [drivers, id]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure name and image are filled
    if (!name || !image) {
      alert("Please fill in all fields.");
      return;
    }

    // Create updated driver object
    const updatedDriver: IInputDrivers = {
      id: Number(id),
      name,
      image,
    };

    // Call the updateDrivers function to update the driver
    const updated = updateDrivers('update', [updatedDriver]);

    if (updated) {
      // Navigate back to the drivers list or another page after update
      navigate("/AllTheDrivers");
    }
  };

  return (
    <div>
      <h1>Edit Driver {id}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditDriverPage;