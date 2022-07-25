import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
function Detaill() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  const { title } = useParams();
  const [data, setValue] = useState([]);
  //   /all-properties
  useEffect(() => {
    async function getProperties() {
      try {
        let value = title.split("-").join(" ");
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const results = await axios.post(
          "http://localhost:5000/api/property/view-property",
          { value },
          config
        );
        console.log(results.data.property);
        setValue(results.data.property);
      } catch (err) {
        console.log(err);
      }
    }
    getProperties();
  }, [title]);

  return (
    <div className="container py-3">
      <h1>{data.pName}</h1>
      <p>{data.location}</p>
      <div className="detail__cardDetail py-2">
        <img src={data.cover} alt="" className="detail__image m-1" />
        <div className="detail__card m-1">
          <p>{data.price}</p>
          <p>{data.type}</p>
          <p>{data.city}</p>
          <p>lorem</p>
          {data.user === JSON.parse(localStorage.getItem("user")).id && (
            <>
              <button className="appButton">Delete</button>
              <button className="appButton">Update</button>
            </>
          )}
        </div>
      </div>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Detaill;
