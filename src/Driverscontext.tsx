import { createContext, ReactNode, useState } from "react";
import { IInputDrivers } from "./interfaces";

// Interface for context data
interface DriversContextData {
  drivers: IInputDrivers[];
  updateDrivers: (action: string, value: IInputDrivers[], id?: number) => boolean;
  deleteDriver: (id: number) => void; // Add function to delete driver by ID
}

// Props for provider
interface DriverProviderProps {
  children: ReactNode;
}

// Create the context with default empty values
export const DriversContext = createContext<DriversContextData>({
  drivers: [],
  updateDrivers: () => false, // Default function returns false
  deleteDriver: () => {}, // Default function for deletion
});

export const DriverProvider = ({ children }: DriverProviderProps) => {
  const [drivers, setDrivers] = useState<IInputDrivers[]>([]);

  // Function to delete driver by ID
  const deleteDriver = (id: number) => {
    setDrivers((prevDrivers) => prevDrivers.filter(driver => driver.id !== id));
  };

  // Function to update drivers
  const updateDrivers = (action: string, value: IInputDrivers[], id?: number): boolean => {
    if (!Array.isArray(value)) {
      console.error("Value must be an array of IInputDrivers.");
      return false;
    }

    switch (action) {
      case 'add':
        setDrivers((prevDrivers) => {
          const existingIds = prevDrivers.map(driver => driver.id);
          const newDrivers = value.filter(driver => !existingIds.includes(driver.id));
          return [...prevDrivers, ...newDrivers]; // Add only new drivers
        });
        return true;

      case 'delete':
        if (id !== undefined) {
          setDrivers((prevDrivers) => prevDrivers.filter(driver => driver.id !== Number(id)));
          return true;
        } else {
          console.error("No driver ID provided for deletion.");
          return false;
        }

      case 'update':
        setDrivers((prevDrivers) => {
          // Return the updated list of drivers by replacing existing ones or adding new ones
          return prevDrivers.map(driver =>
            driver.id === value[0].id ? value[0] : driver // Replace the driver with matching ID
          );
        });
        return true;

      default:
        return false;
    }
  };

  return (
    <DriversContext.Provider value={{ drivers, updateDrivers, deleteDriver }}>
      {children}
    </DriversContext.Provider>
  );
};