/* import { useState } from "react";
import { IDriverInfo } from "../interfaces"; // Ensure this path matches your project

interface EditFormProps {
  driver: IDriverInfo;
  onSave: (updatedDriver: IDriverInfo) => void;
  onCancel: () => void;
}

function EditForm({ driver, onSave, onCancel }: EditFormProps) {
  const [updatedDriver, setUpdatedDriver] = useState<IDriverInfo>(driver);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedDriver({ ...updatedDriver, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedDriver);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Broadcast Name:</label>
        <input
          type="text"
          name="broadcastName"
          value={updatedDriver.broadcastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={updatedDriver.fullName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="img"
          value={updatedDriver.img}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Country Code:</label>
        <input
          type="text"
          name="country_code"
          value={updatedDriver.country_code}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Name Acronym:</label>
        <input
          type="text"
          name="nameAcro"
          value={updatedDriver.nameAcro}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Team Colour:</label>
        <input
          type="text"
          name="teamColour"
          value={updatedDriver.teamColour}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Team Name:</label>
        <input
          type="text"
          name="teamName"
          value={updatedDriver.teamName}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditForm;
 */