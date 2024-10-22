import { useEffect, useContext, useState } from "react";
import { IInputDrivers } from "../interfaces";
import DriversCompoment from "../Components/DriversCompoment";
import { DriversContext } from "../Driverscontext"; // Import the context

function AllTheDriversPage() {
  const { drivers: userDrivers, deleteDriver } = useContext(DriversContext); // Get user drivers and delete function from context
  const [apiDrivers, setApiDrivers] = useState<IInputDrivers[]>([]);
  const [allDrivers, setAllDrivers] = useState<IInputDrivers[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.openf1.org/v1/drivers");
        const data = await response.json();

        console.log(data); // Log the raw data to inspect it

        if (Array.isArray(data)) {
          // Filter out drivers without images and remove duplicates based on driver_number
          const uniqueDrivers = Array.from(
            new Set(
              data
                .filter(driver => driver.headshot_url) // Remove drivers without an image
                .map(driver => driver.driver_number)
            )
          ).map(id => data.find(driver => driver.driver_number === id));

          const driversData: IInputDrivers[] = uniqueDrivers.map(driver => ({
            name: driver.full_name || "Unknown Driver",
            id: driver.driver_number,
            image: driver.headshot_url || "fallback-image-url.jpg",
          }));

          console.log(driversData); // Log unique drivers to check
          setApiDrivers(driversData);
        } else {
          console.error("Fetched data is not an array");
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchData();
  }, []);

  // Combine API drivers with user-added drivers, update whenever userDrivers or apiDrivers change
  useEffect(() => {
    setAllDrivers([...userDrivers, ...apiDrivers]);
  }, [userDrivers, apiDrivers]);

  return (
    <section className="AllTheDrivers">
      <h1>All Drivers</h1>
      <section className="myMain">
        {allDrivers.length > 0 ? (
          allDrivers.map((driver, index) => (
            <div key={driver.id || index}>
              <DriversCompoment
                name={driver.name}
                id={driver.id}
                image={driver.image}
                style="DriversCompoment"
              />
              {/* Add the Delete button */}
            </div>
          ))
        ) : (
          <p>No drivers available.</p>
        )}
      </section>
    </section>
  );
}

export default AllTheDriversPage;