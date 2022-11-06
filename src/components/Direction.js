import React, { useState } from "react";
import {
  DirectionsService,
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";

const Direction = ({origin, destination}) => {
  const [response, setResponse] = useState(null);
  
  
  const directionsCallback = (res) => {
    console.log(res);

    if (res !== null) {
      if (res.status === "OK") {
       setResponse(res);
      } else {
        console.log("response: ", res);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        // required
        id="direction-example"
        // required
        mapContainerStyle={{
          height: "70vh",
          width: "70vw",
        }}
        // required
        zoom={14}
        // required
        center={{
          lat: 0,
          lng: -180,
        }}
      >
        {destination !== "" && origin !== "" && (
          <DirectionsService
            // required
            options={{
              destination: destination,
              origin: origin,
              travelMode: "DRIVING",
            }}
            // required
            callback={directionsCallback}
          />
        )}

        {response !== null && (
          <DirectionsRenderer
            // required
            options={{
              directions: response,
            }}
            // optional
            onLoad={(directionsRenderer) => {
              console.log(
                "DirectionsRenderer onLoad directionsRenderer: ",
                directionsRenderer
              );
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Direction;
