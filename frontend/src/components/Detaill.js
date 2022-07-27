import React, { useEffect, useState, useRef } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Detaill() {
  const navigate = useNavigate();

  const [viewPoint, setViewPoint] = useState({
    width: "100%",
    height: "100%",
    longitude: 73.016914,
    latitude: 33.565109,
    zoom: 10,
  });

  const { title } = useParams();
  const [data, setValue] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  useEffect(() => {}, []);
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

  const deleteNow = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure")) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": JSON.parse(localStorage.getItem("token")),
          },
        };
        await axios.delete(
          `http://localhost:5000/api/property/delete-property/${id}`,
          config
        );
        toast.success("Property Deleted Successfully, Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vdwv59a",
        "template_2yyvxvk",
        form.current,
        "3rjq6JRRKCMhHve2-"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Email Send");
        },
        (error) => {
          console.log(error.text);
          toast.error("Email Not Send");
        }
      );
  };
  return (
    <div className="container py-3">
      <ToastContainer />

      <h1>{data.pName}</h1>
      <p>{data.location}</p>
      <div className="detail__cardDetail py-2">
        <img src={data.cover} alt="" className="detail__image m-1" />
        <div className="detail__card m-1">
          <div className="detail__updatedelete__icon">
            <p>{data.price}</p>
            {data.user === JSON.parse(localStorage.getItem("user")).id && (
              <div className="detail__auth__icon">
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => deleteNow(data._id)}
                ></i>{" "}
                <i
                  className="fa-solid fa-pen-nib"
                  onClick={() => {
                    navigate(`/update-property/${data}`);
                  }}
                ></i>
              </div>
            )}
          </div>

          <form ref={form} onSubmit={sendEmail}>
            <div>
              <input
                className="inputBox"
                type="text"
                name="user_name"
                placeholder="Enter name"
              />
            </div>
            <div>
              <input
                className="inputBox"
                type="text"
                name="user_email"
                placeholder="Enter Email"
              />
            </div>
            <div>
              <input
                className="inputBox"
                type="text"
                name="user_number"
                placeholder="Enter Phone Number"
              />
            </div>
            <div>
              <textarea
                className="inputBox"
                id="w3review"
                rows="4"
                cols="50"
                name="message"
              ></textarea>
            </div>
            <button className="appButton" type="submit">
              Send Email
            </button>
          </form>
        </div>
      </div>
      <div className="detail__map py-3">
        <h2>Location & Nearby</h2>
        <div style={{ display: "block", minWidth: "600px", height: "600px" }}>
          <ReactMapGL
            {...viewPoint}
            mapStyle="mapbox://styles/mapbox/streets-v10"
            // mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
            mapboxAccessToken="pk.eyJ1IjoidGF1c2VlZmd1bHphciIsImEiOiJjbDYyang3aWEwYzk1M2RtdjF5YjNnb3F4In0.R7vbWRTi7yvujhcrJrFXGw"
            onViewportChange={(viewport) => {
              setViewPoint(viewport);
            }}
          >
            <Marker
              // key={park.properties.PARK_ID}
              latitude={data?.latitude}
              longitude={data?.longitude}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPark(data);
                }}
              >
                <img
                  src="../../public/images/marker.svg"
                  alt="Skate Park Icon"
                />
              </button>
            </Marker>
            {/* {selectedPark ? (
              <Popup
                latitude={data?.latitude}
                longitude={data?.longitude}
                onClose={() => {
                  setSelectedPark(null);
                }}
              >
                <div>
                  <h2>{data.pName}</h2>
                  <p>{data.type}</p>
                </div>
              </Popup>
            ) : null} */}
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
}

export default Detaill;
