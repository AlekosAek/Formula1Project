import { useEffect, useState } from "react";
import "../Components/css/AllDriversSida.css";
import { IAllDriversCards } from "../interfaces";
import DriversCompoment from "../Components/DriversCompoment";

function AllTheDriversPage() {
  const [drivers, setDrivers] = useState<IAllDriversCards[]>([]);

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

          const driversData: IAllDriversCards[] = uniqueDrivers
            .map(driver => ({
              name: driver.full_name || "Unknown Driver",
              id: driver.driver_number,
              image: driver.headshot_url || "fallback-image-url.jpg", // You can use a fallback if needed
            }))
            .filter(Boolean); // Filter out any undefined drivers

          console.log(driversData); // Log unique drivers to check
          setDrivers(driversData);
        } else {
          console.error("Fetched data is not an array");
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="AllTheDrivers">
      <h1>All Drivers</h1>
      <section className="myMain">
        {drivers.length > 0 ? (
          drivers.map(driver => (
            <DriversCompoment
              key={driver.id}
              name={driver.name}
              id={driver.id}
              image={driver.image}
              style="DriversCompoment"
            />
          ))
        ) : (
          <p>No drivers available.</p>
        )}
      </section>
    </section>
  );
}

export default AllTheDriversPage;
