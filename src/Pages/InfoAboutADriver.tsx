import { useNavigate, useParams } from "react-router-dom";
import { IDriverInfo } from "../interfaces";
import { useEffect, useState } from "react";
import "../Components/css/InfoAboutDriver.css"

function InfoAboutDriver() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [activeDriver, setActiveDriver] = useState<IDriverInfo>({
    broadcastName: "",
    fullName: "",
    img: "",
    id: 0,
    country_code: "",
    nameAcro: "",
    teamColour: "",
    teamName: "",
  });

  useEffect(() => {
    const getDriverByID = async () => {
      try {
        const response = await fetch(
          `https://api.openf1.org/v1/drivers?driver_number=${id}&session_key=9158`
        );

        // Check if response is ok
        if (!response.ok) {
          console.error(`API error: ${response.status}`);
          navigate("/not-found");
          return;
        }

        const data = await response.json();

        // Check if we received any drivers in the response
        if (!data || data.length === 0) {
          console.error("No drivers found");
          navigate("/not-found");
          return;
        }

        // Access the driver directly from the array
        const driver = data[0];

        // Update the document title
        document.title = `Formula 1 - ${driver.full_name}`;

        // Update state with the driver info
        setActiveDriver({
          broadcastName: driver.broadcast_name,
          fullName: driver.full_name,
          img: driver.headshot_url,
          id: driver.driver_number,
          country_code: driver.country_code,
          nameAcro: driver.name_acronym,
          teamColour: driver.team_colour,
          teamName: driver.team_name,
        });

      }

      catch (error) {
        console.error("Error fetching driver data:", error);
        navigate("/not-found");
      }
    };

    getDriverByID();
  }, [id, navigate]);

  return (
    <section className="mainClass">
      <h1 className="spacing" >{activeDriver.fullName}</h1>
      <img className="spacing" src={activeDriver.img} alt={`${activeDriver.fullName} headshot`} />
      <h3 className="spacing">Broadcast name {activeDriver.broadcastName}</h3>
      <p className="spacing">Country Code: {activeDriver.country_code}</p>
      <p className="spacing">Driver number:{activeDriver.id}</p>
      <p className="spacing">Name acronym :{activeDriver.nameAcro}</p>
      <div className="colour">
        <p>Team colour:</p>
        <div
          style={{
            width: '100px',
            height: '25px',
            backgroundColor: `#${activeDriver.teamColour}`,
            border: '1px solid #000',
          }}
        >
        </div>
      </div>
      <h3>Team name:{activeDriver.teamName}</h3>
    </section >
  );
}

export default InfoAboutDriver;