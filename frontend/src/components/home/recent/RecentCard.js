import React, { useState, useEffect } from "react";
import axios from "axios";
const RecentCard = () => {
  const [values, setValues] = useState([]);
  //   /all-properties
  useEffect(() => {
    async function getProperties() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const results = await axios.post(
          "http://localhost:5000/api/property/all-properties",
          config
        );
        console.log(results.data.property);
        setValues(results.data.property);
      } catch (err) {
        console.log(err);
      }
    }
    getProperties();
  }, []);
  function capitalize(str) {
    let results = [];
    str.split("-").forEach((element) => {
      results.push(
        element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()
      );
    });
    return results.join(" ");
  }
  return (
    <>
      <div className="content grid3 mtop">
        {values.map((item, index) => (
          <div className="box shadow" key={item.id}>
            <div className="img">
              <img src={item.cover} alt="" />
            </div>
            <div className="text">
              <div className="category flex">
                {/* <span
                    style={{
                      background:
                        category === "For Rent" ? "#25b5791a" : "#ff98001a",
                      color: category === "For Rent" ? "#25b579" : "#ff9800",
                    }}
                  >
                    {category}
                  </span> */}
                <i className="fa fa-heart"></i>
              </div>
              <h4>{item.pName}</h4>
              <p>
                <i icon="fa-solid fa-location-dot" /> {item.location}
              </p>
            </div>
            <div className="button flex">
              <div>
                <button className="btn2">{item.price}</button>
              </div>
              <span>{capitalize(item.type)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentCard;
