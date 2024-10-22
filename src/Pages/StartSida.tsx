import "../Components/css/StartSida.css";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IDriver } from "../interfaces";
import Drivercard from "../Components/DriverCard";

function StartSida() {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Function to fetch all drivers once
  const fetchDrivers = async () => {
    const url = "https://api.openf1.org/v1/drivers";
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data.length > 0) {
      // Map the data to the desired format
      const formattedDrivers = data.map((driver: any) => ({
        name: driver.full_name,
        id: driver.driver_number,
        image: driver.headshot_url,
      }));
      setDrivers(formattedDrivers);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Handle navigating to the next driver
  const handleNextClick = () => {
    if (currentIndex < drivers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handle navigating to the previous driver
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Function to handle more info click
  const handleMoreInfoClick = () => {
    if (drivers[currentIndex]) {
      navigate(`/driver/${drivers[currentIndex].id}`);
    }
  };

  return (
    <>
      <section className="myStartsida">
        <section className="myMain">
          {drivers.length > 0 ? (
            <Drivercard
              name={drivers[currentIndex].name}
              id={drivers[currentIndex].id}
              image={drivers[currentIndex].image}
              style="driver-card"
            />
          ) : (
            <p>Loading driver information...</p>
          )}
        </section>
        <section className="myButtonSection">
          <Button 
            label={"Previous"} 
            onClick={handlePrevClick} 
            className="Button" 
            disabled={currentIndex === 0} // Disable if at the first driver
          />
          <Button 
            label={"Next"} 
            onClick={handleNextClick} 
            className="Button" 
            disabled={currentIndex === drivers.length - 1} // Disable if at the last driver
          />
          <Button 
            label={"More info"} 
            onClick={handleMoreInfoClick} 
            className="Button" 
          />
        </section>
      </section>
    </>
  );
}

export default StartSida;