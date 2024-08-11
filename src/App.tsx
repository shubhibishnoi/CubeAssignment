import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { customerDetails } from "./constant";

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(customerDetails[0]);
  const [photos, setPhotos] = useState([]);
  const [photoArr, setPhotoArr] = useState([]);
  useEffect(() => {
    async function fetchPhoto() {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setPhotos(response.data);
      setPhotoArr(response.data.splice(0, 9));
      console.log(response.data);
    }
    fetchPhoto();
  }, []);

  return (
    <div className="App">
      <div className="ListNames">
        {customerDetails.map((customer, index) => {
          return (
            <div
              className="HoverList"
              onClick={() => {
                if (selectedCustomer.name !== customer.name) {
                  setSelectedCustomer(customer);
                  let newPhoto = photos;
                  setPhotoArr(newPhoto.slice(index * 9, (index + 1) * 9));
                }
              }}
            >
              <div className="customerName"> {customer.name}</div>
              <div className="title">{customer.title}</div>
            </div>
          );
        })}
      </div>
      <div className="Info">
        <div className="InfoName">{selectedCustomer.name}Details Here</div>

        <div className="infoTitle">{selectedCustomer.title}</div>
        <div className="photoClass">
          {photoArr &&
            photoArr.map((photo: any) => {
              return (
                <div>
                  <img src={photo.url} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
