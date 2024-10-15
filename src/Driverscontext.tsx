import { createContext, ReactNode, useState } from "react";
import { IInputDrivers } from "./interfaces"

interface DriversContextData {
  drivers: IInputDrivers[]; // You can specify a more detailed type here based on your driver structure
  updateDrivers: (action: string, value: IInputDrivers[]) => void;
}

interface DriverProviderProps {
  children: ReactNode;
}

export const DriversContext = createContext<DriversContextData>({
  drivers: [],
  updateDrivers: () => {},
});

export const DriverProvider = ({ children }: DriverProviderProps) => {
  const [drivers, setDrivers] = useState<IInputDrivers[]>([]);

  const updateDrivers = (action: string, value: IInputDrivers[]) => {
    switch (action) {
      case 'add':
        setDrivers(prevDrivers => [...prevDrivers, ...value]); // Use spread operator to add new drivers
        break;
      case 'delete':
        // Functionality for deleting a driver (not implemented here)
        break;
      case 'update':
        // Functionality for updating a driver (not implemented here)
        break;
      case 'set':
        setDrivers(value); // Overwrite all drivers with the provided array
        break;
      default:
        break;
    }
  };

  return (
    <DriversContext.Provider value={{ drivers, updateDrivers }}>
      {children}
    </DriversContext.Provider>
  );
}
