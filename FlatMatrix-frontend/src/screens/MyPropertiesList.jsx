import React, { useEffect, useState } from "react";
import "../styles/Wishlist.css";
import { Link, useNavigate } from "react-router-dom";
import { getMyProperties, removeMyProperty } from "../services/property";

function MyPropertyList() {
  // const properties = [
  //   {
  //     id: 1,
  //     name: "Sunset Villa",
  //     rate: "$500,000",
  //     address: "123 Sunset Blvd, Pune",
  //     image: "property_image.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Urban Heights",
  //     rate: "$350,000",
  //     address: "456 Urban Rd, Mumbai",
  //     image: "property_image.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Urban Heights",
  //     rate: "$350,000",
  //     address: "456 Urban Rd, Mumbai",
  //     image: "property_image.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Urban Heights",
  //     rate: "$350,000",
  //     address: "456 Urban Rd, Mumbai",
  //     image: "property_image.jpg",
  //   },
  // ];

  const nav = useNavigate();
  const [properties, setProperties] = useState([]);
  const getData = async () => {
    try {
      const response = await getMyProperties();
      if (response.status === 200) {
        console.log(response.data);
        setProperties(response.data);
        console.log(properties);
      } else {
        alert("Error while fetching data");
      }
    } catch (error) {
      alert("Error while fetching data");
    }
  };

  const getdetails = (property) => {
    nav("/my-properties-details", { state: property });
  };

  const onUpdate = (property)=>{
      nav("/property-update", {state:property})
  }
  const onRemove = async(id) =>{
    const response = await removeMyProperty(id);
    if(response.status === 200){
      alert("Property deleted successfully");
      
    nav("/my-properties");
    }
    else{
      alert("Error in deleting");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="">
      <div className="wishlist-container">
        <h2 className="m-2">Properties</h2>
        <ul className="wishlist-list m-2">
          {properties.map((property, index) => (
            <li key={property.id} className="wishlist-item">
              <span className="wishlist-item-number">{index + 1}</span>
              <div className="wishlist-item-content">
                <img
                  src={property.photos[0].imageUrl}
                  alt={property.name}
                  className="wishlist-item-image"
                />
                <div className="wishlist-item-details">
                  <p>
                    {/* Address: {property.address.street}, {property.address.city},{" "}
                    {property.address.state}, {property.address.country},{" "}
                    {property.address.pinCode} */}
                  </p>
                  <p>Price: {property.price}</p>
                  <p>Address: {property.address.city}</p>
                  <div className="button-container row">
                    <div className="col d-flex gap-3">
                      <div className="">
                        {/* <Link
                          to="/propertyDetails"
                          className="btn btn-info m-2 silent-btn"
                        >
                          Get Details
                        </Link> */}
                        <button
                          onClick={() => getdetails(property)}
                          className="btn btn-info m-2 silent-btn"
                        >
                          Get Details
                        </button>
                      </div>
                      <div className="">
                        {/* <Link
                          to="/property-update"
                          className="btn btn-info m-2 silent-btn"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        > Update</Link>*/}
                        <button
                          className="btn btn-info m-2 silent-btn"
                          onClick={() => onUpdate(property)}
                        >
                          Update
                        </button>
                      </div>
                      <div className="">
                        {/* <Link
                          to=""
                          className="btn btn-info m-2 silent-btn"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Remove
                        </Link> */}
                        <button
                          className="btn btn-info m-2 silent-btn"
                          onClick={() => onRemove(property.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyPropertyList;
