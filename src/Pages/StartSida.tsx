import "../Components/css/StartSida.css";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IDriver } from "../interfaces";
import Drivercard from "../Components/DriverCard";

function StartSida() {
  const [activeDriver, setActiveDriver] = useState<IDriver>();

  const handleOnGetRandomDriver = async () => {
    let url: string
    url = "https://api.openf1.org/v1/drivers"
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomDriver = data[randomIndex];
      setActiveDriver({
        name: randomDriver.full_name,
        id: randomDriver.driver_number,
        image: randomDriver.headshot_url,
      })
    }
  }
  useEffect(() => {
    handleOnGetRandomDriver();
  }, []);

  const navigate = useNavigate();
  const handleMoreInfoClick = () => {
    if (activeDriver) {
      navigate(`/driver/${activeDriver.id}`); // Use the active driver's ID
    }
  };


  return (
    <>
      <section className="myStartsida">
        <section className="myMain">
          {activeDriver ?
            <Drivercard
              name={activeDriver.name}
              id={activeDriver.id}
              image={activeDriver.image}
              style="driver-card"

            />
            : (
              <p>Loading driver information...</p>
            )}
        </section>
        <section className="myButtonSection" >

          <Button label={"More info"} onClick={handleMoreInfoClick} className="Button" />
          <Button label={"Show other driver"} onClick={handleOnGetRandomDriver} className="Button" />
        </section>
      </section>
    </>
  );
}

export default StartSida;